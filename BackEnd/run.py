from flask import Flask, g
from flask import jsonify
import json
from flask import request
#from user import User

from user_mapped import User
from ratings_mapped import Rating
from tour_mapped import Tour
from stop_mapped import Stop

from sqlalchemy import create_engine
from sqlalchemy.orm.session import sessionmaker
#from flask_cors import CORS, cross_origin
from user_mapped import User
from ratings_mapped import Rating
from tour_mapped import Tour
from interests_mapped import Interests
from sqlalchemy import create_engine, func, or_
from sqlalchemy.orm.session import sessionmaker
from sqlalchemy.orm import scoped_session
import boto3


from app.database_module.controlers import DbController
from app.s3_module.controlers import S3Controller
app = Flask(__name__)
app.config['DEBUG'] = True
#CORS(app)

client = boto3.client('cognito-idp')

def checkLogin(accessToken):
    response = client.get_user(
        AccessToken="EAAInjq0WOhkBAMSo5Ki3RrvzOLBZB6flRRnx20p2fkGjZAv9puwvHHKuGZCZC4ZBXVTtvxrZBaSE5ZBpGZBcA4NWSZBiddEpP4qN3ZBrbeSNgVTkHIdddmnAgsV6gQV5U6CmvzueK6zVM93aPGJZCYZBZC6T4WgLjjBt3nYZAkrTnHszhj8EKZB1rCLUL4D"#accessToken
    )
    print(response)
    return True
    '''
    try:
        # TODO there is probably a better way of checking for valid login
        # maybe try get_credentials_for_identity. It has an expireation time.
        response = client.describe_identity(
            IdentityId=id
        )
        print response
        return True
    except:
        print "Could not find IdentityId = " + id
        return False
    '''


def notAuthorizedResponse():
    return "<h1>403: Not Authorized. Click <a"
    + " href='http://localhost:5000/login'>here</a> to login.</h1>", 403


db = DbController()
s3 = S3Controller()


#engine = create_engine('mysql+mysqldb://silktours:32193330@silktoursapp.ctrqouiw79qc.us-east-1.rds.amazonaws.com:3306/silktours', pool_recycle=3600)
engine = create_engine('mysql+mysqlconnector://silktours:32193330@silktoursapp.ctrqouiw79qc.us-east-1.rds.amazonaws.com:3306/silktours')

Session = scoped_session(sessionmaker(bind=engine))
#Session = scoped_session(sessionmaker())
session = None
# Session()


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
    checkLogin("")
    user = session.query(User).get(1)
    #session.query(User).filter_by(first_name="Andrew").first()
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
    if (not checkLogin(id)):
        return notAuthorizedResponse()
    checkLogin(id)
    user = session.query(User).get(id)
    return jsonify(user.serialize())


@app.route('/users/email/<email>', methods=['GET'])
def get_user_by_email(email):
    # if (not checkLogin(id)):
    #     return notAuthorizedResponse()
    # checkLogin(id)
    user = session.query(User).filter(User.email == email).first()
    return jsonify(user.serialize())


@app.route('/users/<id>/login/<accessKeyID>', methods=['PUT'])
def login(id, accessKeyID):
    user = session.query(User).get(id)
    user.accessKeyID = accessKeyID
    session.add(user)
    session.commit()
    commitSession()
    return jsonify(user.serialize())


# Creates a new user
@app.route('/users', methods=['POST'])
def set_user():
    user = User()
    user.set_props(request.get_json())
    session.add(user)
    session.commit()
    commitSession()
    return jsonify(user.serialize())


# Edits a user
@app.route('/users/<id>', methods=['PUT'])
def edit_user(id):
    user = session.query(User).get(id)
    user.set_props(request.get_json())
    session.add(user)
    session.commit()
    commitSession()
    return jsonify(user.serialize())


# Adds a new rating
@app.route('/ratings', methods=['POST'])
def add_rating():
    rating = Rating()
    req_json = request.get_json()
    id_user_rated = req_json["id_user_rated"]
    id_tour_rated = req_json["id_tour_rated"]
    rating_value = float(req_json["rating"])
    comment = req_json["comment"]
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
    stop = Stop()
    req_json = request.get_json()
    id_tour = req_json["id_tour"]
    lat = float(req_json["lat"])
    lon = float(req_json["lon"])

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
    return db.post(request.get_json(), 'Tour')


@app.route('/tours/<tourid>', methods=['PUT'])
def edit_tour(tourid):
    return db.edit(tourid, request.get_json(), 'Tour')


@app.route('/tourevents/<tourid>', methods=['POST'])
def set_tourevent(tourid):
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
