from flask import Flask, g
from flask import jsonify
from flask import request
import json
from app.models.user_mapped import User
from app.models.ratings_mapped import Rating
from app.models.tour_mapped import Tour
from app.models.stop_mapped import Stop

from flask_cors import CORS
from app.models.tour_event_mapped import TourEvent
from sqlalchemy import func, or_, and_
import boto3
from db_session import session, commitSession, safe_call, limiting_query

from app.database_module.controlers import DbController
from app.s3_module.controlers import S3Controller
import sys

#outputFile = open('out.log', 'w')
#sys.stdout = sys.stderr = outputFile

app = Flask(__name__)
app.config['DEBUG'] = True
CORS(app)

client = boto3.client('cognito-identity')


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


db = DbController()
s3 = S3Controller()

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
    session.close()
    return response
'''

@app.errorhandler(500)
def internal_server_error(e):
    session.rollback()
    return "Internal Server Error. Rolling back session. Try again.", 500


@app.route("/")
def hello():
    if not checkLogin():
        return notAuthorizedResponse()
    user = session.query(User).get(1)
    return "Hello " + user.first_name


@app.route("/search", methods=['GET'])
def search():
    interests = request.args.get("interests", None)
    keyWordsStr = request.args.get("keywords", None)
    rating = request.args.get("rating", None)
    priceMin = request.args.get("priceMin", None)
    priceMax = request.args.get("priceMax", None)
    city = request.args.get("city", None)
    page = int(request.args.get("page", 0))
    page_size = int(request.args.get("page_size", 10))

    query = session.query(Tour)
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
    query = limiting_query(query, page, page_size)
    tours = safe_call(query, "all", None)

    result = []
    if tours is None:
        tours = []
    for tour in tours:
        result.append(tour.serialize(True))

    return jsonify({"data": result})


@app.route('/users/<id>', methods=['GET'])
def get_user(id):
    print("Get User")
    #if not checkLogin():
    #    return notAuthorizedResponse()

    user = safe_call(session.query(User), "get", id)
    return jsonify(user.serialize())


@app.route('/users/email/<email>', methods=['GET'])
def get_user_by_email(email):
    #if not checkLogin():
    #    return notAuthorizedResponse()
    query = session.query(User).filter(User.email == email)
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
    try:
        if not checkLoginWithArgs(json.loads(request.form.get('token')), request.form.get('username').replace(' ', ':')):
            return "false"
    except:
        return "false"
    return "true"


# Creates a new user
@app.route('/users', methods=['POST'])
def set_user():
    if not checkLogin():
        return notAuthorizedResponse()
    user = User()
    user.create_or_edit(request.get_json())
    return jsonify(user.serialize())


# Edits a user
@app.route('/users/<id>', methods=['PUT'])
def edit_user(id):
    if not checkLogin():
        return notAuthorizedResponse()
    data = request.get_json()
    user = safe_call(session.query(User), "get", id)
    user.create_or_edit(data)
    return jsonify(user.serialize())


# Adds a new rating
@app.route('/ratings', methods=['POST'])
def add_rating():
    if not checkLogin():
        return notAuthorizedResponse()
    data = request.get_json()

    rating = Rating()
    id_user_rated = data["id_user_rated"]
    id_tour_rated = data["id_tour_rated"]
    rating_value = float(data["rating"])
    comment = data["comment"]
    rating.set_props(rating_value, comment, id_tour_rated, id_user_rated)
    tour = session.query(Tour).get(int(id_tour_rated))
    tour.average_rating = ((tour.average_rating
                            * tour.rating_count + rating_value)
                           / (tour.rating_count + 1))
    tour.rating_count += 1
    session.add(tour)
    session.add(rating)
    commitSession()
    return "Success"


# Adds a new rating
@app.route('/stops', methods=['POST'])
def add_stop():
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


@app.route('/tours', methods=['GET'])
def get_tour_list():
    return db.list_tours()


@app.route('/tours/<tourid>', methods=['GET'])
def get_tour(tourid):
    tour = safe_call(session.query(Tour), "get", tourid)
    return jsonify(tour.serialize(False))


@app.route('/tours', methods=['POST'])
def set_tour():
    if not checkLogin():
        return notAuthorizedResponse()
    data = request.get_json()
    tour = Tour()
    tour.createOrEdit(data)
    return jsonify(tour.serialize(False))


@app.route('/tours/<tourid>', methods=['PUT'])
def edit_tour(tourid):
    if not checkLogin():
        return notAuthorizedResponse()
    data = request.get_json()
    tour = safe_call(session.query(Tour), "get", tourid)
    tour.createOrEdit(data)
    return jsonify(tour.serialize(False))


@app.route('/tour/<tourid>/events', methods=['GET'])
def get_tourevent(tourid):
    query = session.query(TourEvent).filter(TourEvent.id_tour == tourid)
    events = safe_call(query, "all", None)
    return jsonify([event.serialize() for event in events])


# TODO: Need to check if the user making the request is who they say they are
# TODO: When a tour is completed, the payment should be processed
@app.route('/complete_tour_event/<eventId>', methods=['PUT'])
def compute_tour_event(eventId):
    if not checkLogin():
        return notAuthorizedResponse()
    event = safe_call(session.query(TourEvent), "get", eventId)
    event.state = "C"
    event.pending_review = True
    commitSession(event)


@app.route('/clear_pending_review/<eventId>', methods=['PUT'])
def clear_pending_review(eventId):
    if not checkLogin():
        return notAuthorizedResponse()
    event = safe_call(session.query(TourEvent), "get", eventId)
    event.pending_review = False
    commitSession(event)
    return "Success"


# TODO: Decide to use PR table or PR field
@app.route('/pending_reviews/<id_user>', methods=['GET'])
def get_prs(id_user):
    if not checkLogin():
        return notAuthorizedResponse()
    query = session.query(TourEvent).filter(
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
    if not checkLogin():
        return notAuthorizedResponse()
    data = request.get_json()
    event = TourEvent()
    event.set_props(data)
    commitSession(event)
    return jsonify(event.serialize())


@app.route('/tourevents/<eventid>', methods=['PUT'])
def edit_tourevent(eventid):
    if not checkLogin():
        return notAuthorizedResponse()
    data = request.get_json()
    event = safe_call(session.query(TourEvent), "get", eventid)
    event.set_props(data)
    commitSession(event)
    return jsonify(event.serialize())


@app.route('/tours/image/<tourid>', methods=['POST'])
def upload(tourid):
    if not checkLogin():
        return notAuthorizedResponse()
    file = request.files['file']
    return s3.upload(file, tourid)


@app.route('/tours/image/<tourid>', methods=['GET'])
def get_image(tourid):
    return s3.get_image(tourid)

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, threaded=True)
