from flask import Flask, g
from flask import jsonify
from flask import request

from user_mapped import User
from ratings_mapped import Rating
from tour_mapped import Tour
from stop_mapped import Stop

from sqlalchemy import create_engine, func, or_
from sqlalchemy.orm.session import sessionmaker
from flask_cors import CORS
from sqlalchemy.orm import scoped_session
import boto3

from app.database_module.controlers import DbController
from app.s3_module.controlers import S3Controller
app = Flask(__name__)
app.config['DEBUG'] = True
CORS(app)

client = boto3.client('cognito-identity')


def checkLogin(logins, identityId):
    try:
        client.get_credentials_for_identity(
            IdentityId=identityId,
            Logins=logins
        )
        return True
    except:
        return False


def notAuthorizedResponse():
    return "<h1>403: Not Authorized. Click <a"
    + " href='http://localhost:5000/login'>here</a> to login.</h1>", 403


db = DbController()
s3 = S3Controller()


engine = create_engine('mysql+mysqlconnector://silktours:32193330@silktoursapp.ctrqouiw79qc.us-east-1.rds.amazonaws.com:3306/silktours')

Session = scoped_session(sessionmaker(bind=engine))
session = None


def commitSession():
    try:
        session.commit()
    except:
        print ("INFO: session commit failed")
        session.roolback()


@app.before_request
def before_request():
    global session
    session = Session()


@app.after_request
def after_request(response):
    for funct in getattr(g, 'call_after_request', ()):
        response = funct(response)
    session.close()
    return response


@app.route("/")
def hello():
    checkLogin({
        "cognito-idp.us-east-1.amazonaws.com/us-east-1_917Igx5Ld": "eyJraWQiOiJCZTVyY2oraXJUclNvdHVMRGhSc1JGemVudzdyelwvTVNDR0ZzaFVTYXZTND0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhOGE3MjYwNy0yOTZlLTQxMWUtOWYzOC00ZTYwZjRmM2NlMGYiLCJhdWQiOiIyYnM5bDl0NW9sNG0wOWZnZm1hZGszam1oNyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTQ4NzAyOTA4MCwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfOTE3SWd4NUxkIiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzp1c2VybmFtZSI6ImFuZHJld3NoaWRlbEBnbWFpbC5jb20iLCJwaG9uZV9udW1iZXIiOiIrMTQxMjY1MTA0OTgiLCJleHAiOjE0ODcwMzI2ODAsImlhdCI6MTQ4NzAyOTA4MCwiZW1haWwiOiJhbmRyZXdzaGlkZWxAZ21haWwuY29tIn0.KzCZXzja9pierqXzrSNEXC6ioXmU4l3kOCjFcx5Bf1l8qqxLzEMwzne2RzNfLFP4wVB1uodcjof_gFgLHDP-iAgQlfJbI_L0SfsWkhSznPu7ZPeO9M0Jco8SxQVpKUtHkYuiUmCbYKNrXUPlP17BbUwcaeGr2s6fsJhqsu1XBYP3OfctvBNaIMCytYbZ48BQUFRpSf_ypqQgEhAzkONvXHRypCQUD91KOLYQ6IqsJEK0vSeggNgi8rKzzVA53Mp-x0Ke3WqeYQ8c6oz6Qg4rpIMhMh1BX_CQQcZeaRilTEsXbZkc_DMIxsuIXEZXNY_goP9Fo0Qj6ysN8FNeI4_yNA"
    }, "us-east-1:e40401ad-863b-464e-8281-21475d67a0ab")

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
        query = query.filter("Tour.average_rating>="+rating)
    if priceMin is not None:
        query = query.filter("Tour.price>="+priceMin)
    if priceMax is not None:
        query = query.filter("Tour.price<="+priceMax)
    if city is not None:
        query = query.filter(Tour.address_city == city)

    tours = []
    try:
        tours = query.all()
    except:
        session.rollback()
        raise

    result = []
    for tour in tours:
        result.append(tour.serialize(True))

    return jsonify({"data": result})


@app.route('/users/<id>', methods=['GET'])
def get_user(id):
    #if (not checkLogin(id)):
    #    return notAuthorizedResponse()
    #checkLogin(id)
    user = session.query(User).get(id)
    return jsonify(user.serialize())


@app.route('/users/email/<email>', methods=['GET'])
def get_user_by_email(email):
    # if (not checkLogin(id)):
    #     return notAuthorizedResponse()
    # checkLogin(id)
    user = session.query(User).filter(User.email == email).first()
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
@app.route('/users', methods=['POST'])
def set_user():
    data = request.get_json()
    if (not checkLogin(data["Logins"], data["IdentityId"])):
        return notAuthorizedResponse()
    user = User()
    user.set_props(data)
    session.add(user)
    session.commit()
    commitSession()
    return jsonify(user.serialize())


# Edits a user
@app.route('/users/<id>', methods=['PUT'])
def edit_user(id):
    data = request.get_json()
    if (not checkLogin(data["Logins"], data["IdentityId"])):
        return notAuthorizedResponse()

    user = session.query(User).get(id)
    user.set_props(data)
    session.add(user)
    session.commit()
    commitSession()
    return jsonify(user.serialize())


# Adds a new rating
@app.route('/ratings', methods=['POST'])
def add_rating():
    data = request.get_json()
    if (not checkLogin(data["Logins"], data["IdentityId"])):
        return notAuthorizedResponse()

    rating = Rating()
    id_user_rated = data["id_user_rated"]
    id_tour_rated = data["id_tour_rated"]
    rating_value = float(data["rating"])
    comment = data["comment"]
    rating.set_props(rating_value, comment, id_tour_rated, id_user_rated)
    tour = session.query(Tour).get(int(id_tour_rated))
    tour.average_rating = ((tour.average_rating
                           * tour.rating_count+rating_value)
                           / (tour.rating_count+1))
    tour.rating_count += 1
    session.add(tour)
    session.add(rating)
    session.commit()
    commitSession()
    return "Success"


# Adds a new rating
@app.route('/stops', methods=['POST'])
def add_stop():
    data = request.get_json()
    if (not checkLogin(data["Logins"], data["IdentityId"])):
        return notAuthorizedResponse()

    stop = Stop()
    id_tour = data["id_tour"]
    lat = float(data["lat"])
    lon = float(data["lon"])

    stop.set_props(id_tour, lat, lon)

    session.add(stop)
    session.commit()
    commitSession()
    return "Success"


@app.route('/tours', methods=['GET'])
def get_tour_list():
    return db.list_tours()


@app.route('/tours/<tourid>', methods=['GET'])
def get_tour(tourid):
    return db.list_tour_with_id(tourid)


@app.route('/tours', methods=['POST'])
def set_tour():
    data = request.get_json()
    if (not checkLogin(data["Logins"], data["IdentityId"])):
        return notAuthorizedResponse()

    return db.post(data, 'Tour')


@app.route('/tours/<tourid>', methods=['PUT'])
def edit_tour(tourid):
    data = request.get_json()
    if (not checkLogin(data["Logins"], data["IdentityId"])):
        return notAuthorizedResponse()

    return db.edit(tourid, data, 'Tour')


@app.route('/tourevents/<tourid>', methods=['POST'])
def set_tourevent(tourid):
    data = request.get_json()
    if (not checkLogin(data["Logins"], data["IdentityId"])):
        return notAuthorizedResponse()

    return db.edit(tourid, request.get_json(), 'TourEvent')


@app.route('/tourevents/<tourid>', methods=['PUT'])
def edit_tourevent(tourid):
    return db.edit(tourid, request.get_json(), 'TourEvent')


@app.route('/tours/image/<tourid>', methods=['POST'])
def upload(tourid):
    file = request.files['file']
    return s3.upload(file, tourid)


@app.route('/tours/image/<tourid>', methods=['GET'])
def get_image(tourid):
    return s3.get_image(tourid)

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
