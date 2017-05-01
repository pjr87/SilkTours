from flask import Flask, g
from flask import jsonify
from flask import request, url_for
import urllib.parse
import json
import time
import math
import datetime
from dateutil.parser import parse
from collections import defaultdict
from app.models.user_mapped import User
from app.models.ratings_mapped import Rating
from app.models.tour_mapped import Tour
from app.models.stop_mapped import Stop
from app.models.tour_hours import TourHours
from app.models.tour_hours_special import TourHoursSpecial

from flask_cors import CORS
from app.models.tour_event_mapped import TourEvent
from sqlalchemy import func, or_, and_
import boto3
import urllib
from io import StringIO
from PIL import Image
from io import BytesIO
from db_session import get_session, commitSession, safe_call, limiting_query
from app.models.media_mapped import Media
import sys

#outputFile = open('out.log', 'w')
#sys.stdout = sys.stderr = outputFile

application = Flask(__name__)
app = application
app.config['DEBUG'] = True
CORS(app)

client = boto3.client('cognito-identity', region_name='us-east-1')


def checkLogin():
    if request.args.get("bypass") == 'true':
        return True

    print(request.headers)
    print(request.data)
    data = None
    try:
        data = request.get_json(force=True)
    except:
        print("No JSON data")
        if (request.headers.get('Silk-Bypass') != 'true'
                and "Silk-Identity-Id" not in request.headers):
            return False
    print(data)
    logins = None
    identityId = None
    if request.headers is None:
        request.headers = {}
    if data is None:
        data = {}
    if request.headers.get('Silk-Bypass') == 'true' or data.get("bypass") is True:
        return True

    if (data is None
            or data.get("IdentityId") is None
            or data.get("Logins") is None):
        if (request.headers.get('Silk-Logins') is None
                or request.headers.get('Silk-Identity-Id') is None):
            return False
        identityId = request.headers.get('Silk-Identity-Id')
        logins = json.loads(request.headers.get('Silk-Logins'))
    else:
        logins = data["Logins"]
        identityId = data["IdentityId"]

    if logins is None or identityId is None:
        return False
    return checkLoginWithArgs(logins, identityId)


def checkLoginWithArgs(logins, identityId):
    print("Logins:")
    print(logins)
    try:
        result = client.get_credentials_for_identity(
            IdentityId=identityId,
            Logins=logins
        )
        print ("Success")
        print(result)
        return True
    except Exception as e:
        print(e)
        print("Fail")
        return False


def notAuthorizedResponse():
    return """<h1>403: Not Authorized. Click <a
    href='http://localhost:5000/login'>here</a> to login.</h1>""", 403



# engine = create_engine('mysql+mysqldb://silktours:32193330@silktoursapp.ctrqouiw79qc.us-east-1.rds.amazonaws.com:3306/silktours', pool_recycle=3600)
#engine = create_engine(
#    'mysql+mysqlconnector://silktours:32193330@silktoursapp.ctrqouiw79qc.us-east-1.rds.amazonaws.com:3306/silktours')

#engine = create_engine('mysql+mysqlconnector://silktours:32193330@silktoursapp.ctrqouiw79qc.us-east-1.rds.amazonaws.com:3306/silktours')

#Session = scoped_session(sessionmaker(bind=engine))
#session = None

'''
@app.before_request
def before_request():
    createSession()


@app.after_request
def after_request(response):
    for funct in getattr(g, 'call_after_request', ()):
        response = funct(response)
    get_session().close()
    return response
'''

@app.errorhandler(500)
def internal_server_error(e):
    get_session().rollback()
    return "Internal Server Error. Rolling back session. Try again.", 500


@app.route("/")
def hello():
    """
    Returns a simple message. Used to test if server is running.
    """
    return "Testing..."


@app.route("/search", methods=['GET'])
def search():
    """
    Searches tours.
    <u>URL Args:</u> interests, keywords, rating, priceMin/Max, city, page, page_size
    """
    interests = request.args.get("interests", None)
    keyWordsStr = request.args.get("keywords", None)
    rating = request.args.get("rating", None)
    priceMin = request.args.get("priceMin", None)
    priceMax = request.args.get("priceMax", None)
    city = request.args.get("city", None)
    page = int(request.args.get("page", 0))
    page_size = int(request.args.get("page_size", 10))
    if page_size == 0:
        page_size = 1

    query = get_session().query(Tour)
    if interests is not None:
        query = query.filter(
            or_(
                Tour.interests.any(name=x) for x in interests.split(',')
            )
        )
    if keyWordsStr is not None:
        query = query.filter(
            or_(
                (
                    func.lower(Tour.name).contains(word.lower()) |
                    func.lower(Tour.description).contains(word.lower())
                ) for word in keyWordsStr.split(',')
            )
        )
    if rating is not None:
        query = query.filter("Tour.average_rating>=" + rating)
    if priceMin is not None:
        query = query.filter("Tour.price>=" + priceMin)
    if priceMax is not None:
        query = query.filter("Tour.price<=" + priceMax)
    if city is not None:
        query = query.filter(Tour.address.has(city=city))
    count = query.count()
    query = limiting_query(query, page, page_size)
    print(count)
    tours = safe_call(query, "all", None)

    result = []
    if tours is None:
        tours = []
    for tour in tours:
        result.append(tour.serialize(True))

    return jsonify({
        "page_count": math.ceil(count/page_size),
        "page_size": page_size,
        "page": page,
        "data": result})


@app.route('/users/<id>', methods=['GET'])
def get_user(id):
    """
    Gets a user by id.
    """
    print("Get User")
    deep = request.args.get("deep", False) == "true"
    print("deep: " + str(deep))
    #if not checkLogin():
    #    return notAuthorizedResponse()

    user = safe_call(get_session().query(User), "get", id)
    return jsonify(user.serialize(deep))


@app.route('/users/email/<email>', methods=['GET'])
def get_user_by_email(email):
    """
    Gets a user by thier email
    """
    #if not checkLogin():
    #    return notAuthorizedResponse()
    query = get_session().query(User).filter(User.email == email)
    user = safe_call(query, "first", None)
    return jsonify(user.serialize())


'''
@app.route('/users/<id>/login/<accessKeyID>', methods=['PUT'])
def login(id, accessKeyID):
    user = session.query(User).get(id)
    session.add(user)
    session.commit()
    commitSession()
    return jsonify(user.serialize())
'''


# Creates a new user
@app.route('/check_auth', methods=['POST'])
def check_auth():
    """
    Checks if the given token and username are value
    <u>Form Args:</u> token=AWS logins object, username=AWS login token
    """
    try:
        if not checkLoginWithArgs(json.loads(request.form.get('token')), request.form.get('username').replace(' ', ':')):
            return "false"
    except:
        return "false"
    return "true"


# Creates a new user
@app.route('/users', methods=['POST'])
def set_user():
    """
    Creates a user using the usual user JSON object
    """
    if not checkLogin():
        return notAuthorizedResponse()
    user = User()
    user.create_or_edit(request.get_json())
    return jsonify(user.serialize())


# Edits a user
@app.route('/users/<id>', methods=['PUT'])
def edit_user(id):
    """
    Edits a users object using the usual user JSON
    """
    if not checkLogin():
        return notAuthorizedResponse()
    data = request.get_json()
    user = safe_call(get_session().query(User), "get", id)
    user.create_or_edit(data)
    return jsonify(user.serialize())


@app.route('/users/<userid>/profile', methods=['PUT'])
def edit_user_profile(userid):
    """
    Uploads and sets a user's profile image
    <u>JSON fields:</u> file=base 64 string, name=the filename
    """
    if not checkLogin():
        return notAuthorizedResponse()
    data = request.get_json()
    file_data = data['file']
    filename = data['name']
    media = Media()
    result = media.upload(file_data, filename, userid=userid)
    user = safe_call(get_session().query(User), "get", userid)
    user.profile_picture = result["url"]
    # TODO set profile image size in db
    commitSession(user)
    return jsonify(result)


# Adds a new rating
@app.route('/ratings', methods=['POST'])
def add_rating():
    """
    Adds a new raing to the tour.
    <u>JSON fields:</u> id_user_rated=the raters id, id_tour_rated=the tour to rate, rating=rating from 1-5, comment=string comment
    """
    if not checkLogin():
        return notAuthorizedResponse()
    data = request.get_json()

    rating = Rating()
    id_user_rated = data["id_user_rated"]
    id_tour_rated = data["id_tour_rated"]
    rating_value = float(data["rating"])
    comment = data["comment"]
    rating.set_props(rating_value, comment, id_tour_rated, id_user_rated)
    tour = get_session().query(Tour).get(int(id_tour_rated))
    tour.average_rating = ((tour.average_rating
                            * tour.rating_count + rating_value)
                           / (tour.rating_count + 1))
    tour.rating_count += 1
    get_session().add(tour)
    get_session().add(rating)
    commitSession()
    return "Success"


# Adds a new rating
@app.route('/stops', methods=['POST'])
def add_stop():
    """
    Adds a new stop to a tour. Stops can also be set with POST /tour.
    <u>JSON fields:</u> id_tour, lat, lon
    """
    if not checkLogin():
        return notAuthorizedResponse()
    data = request.get_json()

    stop = Stop()
    id_tour = data["id_tour"]
    lat = float(data["lat"])
    lon = float(data["lon"])

    stop.set_props(id_tour, lat, lon)

    commitSession(stop)
    return "Success"


@app.route('/tours/<tourid>', methods=['GET'])
def get_tour(tourid):
    """
    Gets a tour by id.
    """
    tour = safe_call(get_session().query(Tour), "get", tourid)
    return jsonify(tour.serialize(True))


@app.route('/tours', methods=['POST'])
def set_tour():
    """
    Creates a new tour using the usual tour JSON.
    """
    if not checkLogin():
        return notAuthorizedResponse()
    data = request.get_json()
    tour = Tour()
    tour.createOrEdit(data)
    return jsonify(tour.serialize(False))


@app.route('/tours/<tourid>/profile', methods=['PUT'])
def edit_tour_profile(tourid):
    """
    Uploads and sets a tour's profile image.
    <u>JSON fields:</u>file=base64 encoded file, name=filename
    """
    if not checkLogin():
        return notAuthorizedResponse()
    data = request.get_json()
    file_data = data['file']
    filename = data['name']
    media = Media()
    result = media.upload(file_data, filename, tourid=tourid)
    tour = safe_call(get_session().query(Tour), "get", tourid)
    tour.profile_image = result["url"]
    # TODO set profile image size in db
    commitSession(tour)
    return jsonify(result)


@app.route('/tours/<tourid>', methods=['PUT'])
def edit_tour(tourid):
    """
    Edits a tour. Takes the usual tour JSON.
    """
    if not checkLogin():
        return notAuthorizedResponse()
    data = request.get_json()
    tour = safe_call(get_session().query(Tour), "get", tourid)
    tour.createOrEdit(data)
    return jsonify(tour.serialize(False))


@app.route('/tourevents/<eventid>', methods=['GET'])
def get_tourevent(eventid):
    """
    Gets a tour event by id.
    """
    event = safe_call(get_session().query(TourEvent), "get", eventid)
    return jsonify(event.serialize(True))


@app.route('/tour/<tourid>/events', methods=['GET'])
def get_tourevents(tourid):
    """
    Gets a list of tour events for a tour.
    """
    query = get_session().query(TourEvent).filter(TourEvent.id_tour == tourid)
    events = safe_call(query, "all", None)
    return jsonify([event.serialize() for event in events])


# TODO: Need to check if the user making the request is who they say they are
# TODO: When a tour is completed, the payment should be processed
@app.route('/complete_tour_event/<eventId>', methods=['PUT'])
def compute_tour_event(eventId):
    """
    Marks the given tour event as completed. Also creates a pending review.
    """
    if not checkLogin():
        return notAuthorizedResponse()
    event = safe_call(get_session().query(TourEvent), "get", eventId)
    event.state = "C"
    event.pending_review = True
    commitSession(event)


@app.route('/clear_pending_review/<eventId>', methods=['PUT'])
def clear_pending_review(eventId):
    """
    Clears the pending review for the tour event.
    """
    if not checkLogin():
        return notAuthorizedResponse()
    event = safe_call(get_session().query(TourEvent), "get", eventId)
    event.pending_review = False
    commitSession(event)
    return "Success"


# TODO: Decide to use PR table or PR field
@app.route('/pending_reviews/<id_user>', methods=['GET'])
def get_prs(id_user):
    """
    Get a list of pending reviews for the user.
    """
    if not checkLogin():
        return notAuthorizedResponse()
    query = get_session().query(TourEvent).filter(
            and_(
                TourEvent.id_user == id_user,
                TourEvent.pending_review
            )
        )
    events = safe_call(query, "all", None)
    result = []
    for event in events:
        result.append(event.serialize())
    return jsonify(result)


@app.route('/tourevents', methods=['POST'])
def set_tourevent():
    """
    Create a new tour event. Takes the usual tour event JSON.
    """
    if not checkLogin():
        return notAuthorizedResponse()
    data = request.get_json()
    event = TourEvent()
    event.set_props(data)
    commitSession(event)
    return jsonify(event.serialize())


@app.route('/tourevents/<eventid>', methods=['PUT'])
def edit_tourevent(eventid):
    """
    Edits a tour event. Takes the usual tour event JSON.
    """
    if not checkLogin():
        return notAuthorizedResponse()
    data = request.get_json()
    event = safe_call(get_session().query(TourEvent), "get", eventid)
    event.set_props(data)
    commitSession(event)
    return jsonify(event.serialize())


@app.route('/media/<tourid>', methods=['POST'])
def upload(tourid):
    """
    Uploads a new image.
    <u>JSON fields:</u> file=base64 encoded file, name=filename
    """
    if not checkLogin():
        return notAuthorizedResponse()
    data = request.get_json()
    print("Data: " + str(data))
    file_data = data['file']
    filename = data['name']
    media = Media()
    result = media.upload(file_data, filename, tourid=tourid)
    return jsonify(result)


@app.route('/media/<tourid>', methods=['GET'])
def get_image(tourid):
    """
    Gets all media for a given tour.
    """
    if not checkLogin():
        return notAuthorizedResponse()
    query = get_session().query(Media).filter(Media.id_tour == tourid)
    medias = safe_call(query, "all", None)
    return jsonify([media.serialize() for media in medias])


def add_hour_entries(l, start, end, length):
    sh = start.hour + start.minute/60.0
    eh = end.hour + end.minute/60.0
    while sh <= eh:
        l.append({
            "start": sh,
            "end": sh+length
        })
        sh += length


def get_date_string(d):
    return "%d/%d" % (d.month, d.day)


# Check if there are any events scheduled between dt_start and dt_end
# dt_* can be either epoch timestamps or dates or datetimes
def check_for_event(events, dt_start, dt_end):
    tStart = dt_start if type(dt_start) is int else dt_start.timestamp()
    tEnd = dt_end if type(dt_end) is int else dt_end.timestamp()
    for event in events:
        eStart = event.start_date_time.timestamp()
        eEnd = event.end_date_time.timestamp()

        # Check if the times overlap
        if (tStart <= eEnd) and (tEnd >= eStart):
            return True


@app.route('/tours/<tourid>/hours', methods=['POST', 'PUT'])
def create_hours(tourid):
    '''
    Sets the hours for a tourid, overriding any existing hours. See schema section for JSON format.
    <u>JSON Fields:</u> See Tour Hours Input Schema
    '''
    if not checkLogin():
        return notAuthorizedResponse()
    data = request.get_json()
    if request.method == 'POST':
        get_session().query(TourHours).filter(TourHours.tour_id == tourid).delete()
        get_session().query(TourHoursSpecial).filter(TourHoursSpecial.tour_id == tourid).delete()
    base_hours = data.get("base_hours", [])
    special_hours = data.get("special_hours", [])
    result = {"base_hours": [], "special_hours": []}
    for hour in base_hours:
        result["base_hours"].append(TourHours.create(hour, tourid).serialize())
    for hour in special_hours:
        result["special_hours"].append(TourHoursSpecial.create(hour, tourid).serialize())
    return jsonify(result)


@app.route('/tours/available_hours', methods=['GET'])
def get_hours():
    """
    Gets a list of available times for a tour based on base hours, special hours, and booked tours. The end_date parameter will default to one week after start_date if not specified.
    <u>URL Args:</u> tour_id, start_date=ISO standard date string, end_date
    """
    tour_id = request.args.get("tour_id", None)
    start_date = parse(request.args.get("start_date", time.time())).date()
    end_date = start_date + datetime.timedelta(days=7)
    end_date = parse(request.args.get("end_date", str(end_date))).date()

    if tour_id is None:
        return 422, "No tour specified"
    tour = safe_call(get_session().query(Tour), "get", tour_id)
    length = tour.length
    query = get_session().query(TourHours).filter(TourHours.tour_id == tour_id)
    baseHours = safe_call(query, "all", None)
    query = get_session().query(TourHoursSpecial).filter(
        TourHoursSpecial.tour_id == tour_id
        # TODO filter by date
    )
    specialHours = safe_call(query, "all", None)

    query = get_session().query(TourEvent).filter(
        TourEvent.id_tour == tour_id
    )
    query = query.filter(
        TourEvent.start_date_time > start_date
    )
    query = query.filter(
        TourEvent.end_date_time < end_date
    )
    query = query.filter(
        TourEvent.state == 'B'
    )

    events = safe_call(query, "all", None)
    hours = defaultdict(list)
    overridden = set()
    for sHour in specialHours:
        if sHour.date < start_date or sHour.date > end_date:
            continue
        ds = str(sHour.date)
        print("ds special: " + ds)
        if sHour.overrides:
            overridden.add(ds)
        add_hour_entries(hours[ds], sHour.open_time, sHour.close_time, length)

    for hour in baseHours:
        start = hour.open_time
        end = hour.close_time
        sh = start.hour
        eh = end.hour
        dow = hour.day_of_week
        offset = dow - start_date.weekday()
        curr_date = datetime.date(start_date.year, start_date.month, start_date.day+offset)
        while curr_date <= end_date:
            curr_date += datetime.timedelta(days=7)
            ds = str(curr_date)
            print("ds base: " + ds)
            if ds in overridden:
                continue
            add_hour_entries(hours[ds], start, end, length)

    for event in events:
        start = event.start_date_time
        ds = str(start.date())
        print("ds event: " + ds)
        sh = start.hour
        eh = event.end_date_time.hour
        if dow not in hours:
            continue
        i = 0
        while i < len(hours[ds]):
            # Check for overlapping hours
            if (sh <= hours[dow][i]["end"]) and (eh >= hours[dow][i]["start"]):
                del hours[dow][i]
            else:
                i += 1

    return jsonify(hours)


def has_no_empty_params(rule):
    defaults = rule.defaults if rule.defaults is not None else ()
    arguments = rule.arguments if rule.arguments is not None else ()
    return len(defaults) >= len(arguments)


@app.route("/resize_images", methods=['GET'])
def resize_images():
    query = get_session().query(Tour)
    tours = safe_call(query, "all", None)
    i = 0
    for tour in tours:
        print("Tour %d of %d" % (i, len(tours)))
        i += 1
        URL = tour.profile_image
        print(URL)
        if URL is None or URL == "":
            continue

        file = None
        try:
            with urllib.request.urlopen(URL) as url:
                file = url.read()
        except:
            continue
        im = None
        try:
            im = Image.open(BytesIO(file))
        except Exception as e:
            print(e)
            print("fail")
            continue
        width, height = im.size
        tour.profile_image_width = width
        tour.profile_image_height = height
        print("success: w: %d, h: %d" % (width, height))
        get_session().add(tour)
    commitSession()
    return "done"


@app.route("/docs")
def site_map():
    """
    Returns this documentation.
    """
    html = """
    <style>
        .info {
            margin-left: 30px
        }
    </style>
    <h2>Endpoints</h2>
    """
    for rule in app.url_map.iter_rules():
        print(rule)
        options = {}
        for arg in rule.arguments:
            options[arg] = "[{0}]".format(arg)

        desc = "None<br>"
        if rule.endpoint in globals():
            desc = globals()[rule.endpoint].__doc__
            if desc is not None:
                if desc[0] is "\n":
                    desc = desc[1:]
                if desc[-1] is "\n":
                    desc = desc[:-1]
                desc = desc.replace("\n", "<br>")

        methods = ', '.join(
            [i for i in rule.methods if i not in ["HEAD", "OPTIONS"]]
        )
        url = url_for(rule.endpoint, **options)
        line = urllib.parse.unquote(
            """
                <b>{}</b>
                <div class="info"
                    <br>
                    <u>URL:</u> {}
                    <br>
                    <u>Description:</u> {}
                    <u>Methods:</u> {}
                </div>
                <br><br>
            """.format(rule.endpoint, url, desc, methods)
        )
        html += line
    user = safe_call(get_session().query(User), "get", 1).serialize(True)
    clean_object(user)

    tour = safe_call(get_session().query(Tour), "get", 1).serialize(True)
    clean_object(tour)

    tour_event = safe_call(get_session().query(TourEvent), "get", 1).serialize(include_tour=False)
    clean_object(tour_event)

    hours = safe_call(get_session().query(TourHours), "get", 0).serialize()
    hours_special = safe_call(get_session().query(TourHoursSpecial), "get", 0).serialize()
    hours_input = {"base_hours": [hours], "hours_special": [hours_special]}
    clean_object(hours_special)
    clean_object(hours)
    clean_object(hours_input)

    html += """
    <br>
    <h2>Schema</h2>
    <b>User:</b><br>
    """ + clean_json(user) + """
    <br><br>
    <b>Tour:</b><br>
    """ + clean_json(tour) + """
    <br><br>
    <b>Tour Event:</b><br>
    """ + clean_json(tour_event) + """
    <br><br>
    <b>Tour Base Hours:</b><br>
    """ + clean_json(hours) + """
    <br><br>
    <b>Tour Special Hours:</b><br>
    """ + clean_json(hours_special) + """
    <br><br>
    <b>Tour Hours Input Format:</b><br>
    """ + clean_json(hours_input)

    return html


def clean_object(obj):
    if obj is None:
        return
    for key in obj:
        if type(obj[key]) is dict:
            clean_object(obj[key])
        elif type(obj[key]) is list:
            if len(obj[key]) > 0:
                if key is "tours_taking" or key is "tours_teaching":
                    obj[key][0] = "#Tour Event Schema + Tour Schema"
                elif type(obj[key][0]) is dict or type(obj[key][0]) is list:
                    clean_object(obj[key][0])
                obj[key] = [obj[key][0]]
        else:
            if obj[key] is None:
                obj[key] = ""
            obj[key] = type(obj[key]).__name__


def clean_json(obj):
    return json.dumps(obj, indent=4, sort_keys=True).replace("\"", "").replace("\n", "<br>").replace(" ", "	&nbsp;")


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, threaded=True)
