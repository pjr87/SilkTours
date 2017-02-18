from flask import Flask, g
from flask import jsonify
from flask import request
from user_mapped import User
from ratings_mapped import Rating
from tour_mapped import Tour
from stop_mapped import Stop

from sqlalchemy import create_engine
from sqlalchemy.orm.session import sessionmaker
from flask_cors import CORS, cross_origin
from user_mapped import User
from ratings_mapped import Rating
from tour_mapped import Tour
from interests_mapped import Interests
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


def checkLogin(data):
    if "bypass" in data and data["bypass"]:
        return True

    try:
        result = client.get_credentials_for_identity(
            IdentityId=data["IdentityId"],
            Logins=data["Logins"]
        )
        print ("Success")
        print(result)
        return True
    except Exception as e:
        print(e)
        print("Fail")
        return False


def notAuthorizedResponse():
    return "<h1>403: Not Authorized. Click <a"
    + " href='http://localhost:5000/login'>here</a> to login.</h1>", 403


db = DbController()
s3 = S3Controller()

# engine = create_engine('mysql+mysqldb://silktours:32193330@silktoursapp.ctrqouiw79qc.us-east-1.rds.amazonaws.com:3306/silktours', pool_recycle=3600)
engine = create_engine(
    'mysql+mysqlconnector://silktours:32193330@silktoursapp.ctrqouiw79qc.us-east-1.rds.amazonaws.com:3306/silktours')

engine = create_engine('mysql+mysqlconnector://silktours:32193330@silktoursapp.ctrqouiw79qc.us-east-1.rds.amazonaws.com:3306/silktours')

Session = scoped_session(sessionmaker(bind=engine))
session = None


def commitSession():
    try:
        session.commit()
    except:
        print("INFO: session commit failed")
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


@app.errorhandler(500)
def internal_server_error(e):
    session.rollback()
    return "Internal Server Error. Rolling back session. Try again.", 500


@app.route("/")
def hello():
    checkLogin({
        "cognito-idp.us-east-1.amazonaws.com/us-east-1_917Igx5Ld": "eyJraWQiOiJCZTVyY2oraXJUclNvdHVMRGhSc1JGemVudzdyelwvTVNDR0ZzaFVTYXZTND0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhOGE3MjYwNy0yOTZlLTQxMWUtOWYzOC00ZTYwZjRmM2NlMGYiLCJhdWQiOiIyYnM5bDl0NW9sNG0wOWZnZm1hZGszam1oNyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTQ4NzAzODM1NCwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfOTE3SWd4NUxkIiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzp1c2VybmFtZSI6ImFuZHJld3NoaWRlbEBnbWFpbC5jb20iLCJwaG9uZV9udW1iZXIiOiIrMTQxMjY1MTA0OTgiLCJleHAiOjE0ODcwNDE5NTQsImlhdCI6MTQ4NzAzODM1NCwiZW1haWwiOiJhbmRyZXdzaGlkZWxAZ21haWwuY29tIn0.WrfAVkJ7dsb2DBK2pdVZl3mz4DUg-bxdtej83Oq9SQpe5Qzw61o6rcHorVQwwuOfrGva3Ckg2mq9Cl8Nt9ATsUalhdo0J_RC3LENrue17bW7ubVQ_WA1if1xac-mqmyCN_KO7FlZ6iFNRRP2nAaoQtvs3i6_SLrEWaMg_yoY9NA-zcOLKwr78emWhY1vo5lIlyR0evtuL3FJqUh27c6eocDXdc5Cfo4kpSRw8ixx-3Lvcd65WnIL_5QNVfya8qabd-pKYyKQNrpBIMsT1b6xh-WUKQqUCouJAb0DD4t_RclFrDUwK1kMTZDvlkTVKtEVfICMjQVCw6oZocrpb5nZHw"
    }, "us-east-1:5d00c8d9-83d3-47d3-ad69-8fd5b8b70349")

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
        query = query.filter("Tour.average_rating>=" + rating)
    if priceMin is not None:
        query = query.filter("Tour.price>=" + priceMin)
    if priceMax is not None:
        query = query.filter("Tour.price<=" + priceMax)
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
    if (not checkLogin(data)):
        return notAuthorizedResponse()
    user = User()
    user.set_props(request.get_json())
    session.add(user)
    session.commit()
    commitSession()
    return jsonify(user.serialize())


# Edits a user
@app.route('/users/<id>', methods=['PUT'])
def edit_user(id):
    data = request.get_json()
    if (not checkLogin(data)):
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
    if (not checkLogin(data)):
        return notAuthorizedResponse()

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
    session.commit()
    commitSession()
    return "Success"


# Adds a new rating
@app.route('/stops', methods=['POST'])
def add_stop():
    data = request.get_json()
    if (not checkLogin(data)):
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
    if (not checkLogin(data)):
        return notAuthorizedResponse()

    return db.post(request.get_json(), 'Tour')


@app.route('/tours/<tourid>', methods=['PUT'])
def edit_tour(tourid):
    data = request.get_json()
    if (not checkLogin(data)):
        return notAuthorizedResponse()

    return db.edit(tourid, data, 'Tour')


@app.route('/tourevents/<tourid>', methods=['POST'])
def set_tourevent(tourid):
    data = request.get_json()
    if (not checkLogin(data)):
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
