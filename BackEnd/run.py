from flask import Flask, g
from flask import jsonify
from flask import request
from flask_cors import CORS, cross_origin
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
CORS(app)

client = boto3.client('cognito-identity')


def checkLogin(id):
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

engine = create_engine('mysql+mysqldb://silktours:32193330@silktoursapp.ctrqouiw79qc.us-east-1.rds.amazonaws.com:3306/silktours', pool_recycle=3600)
Session = scoped_session(sessionmaker(bind=engine))
#Session = scoped_session(sessionmaker())
session = None
# Session()


def commitSession():
    try:
        session.commit()
    except:
        print "INFO: session commit failed"
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

    tours = query.all()
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


# Creates a new user
@app.route('/users', methods=['POST'])
def set_user():
    user = User()
    user.set_props(request.form)
    session.add(user)
    commitSession()
    return jsonify(user.serialize())


# Edits a user
@app.route('/users/<id>', methods=['PUT'])
def edit_user(id):
    user = session.query(User).get(id)
    user.set_props(request.form)
    session.add(user)
    commitSession()
    return jsonify(user.serialize())


# Adds a new rating
@app.route('/ratings', methods=['POST'])
def add_rating():
    rating = Rating()
    id_user_rated = request.form.get("id_user_rated")
    id_tour_rated = request.form.get("id_tour_rated")
    rating_value = float(request.form.get("rating"))
    comment = request.form.get("comment")
    rating.set_props(rating_value, comment, id_tour_rated, id_user_rated)
    tour = session.query(Tour).get(int(id_tour_rated))
    tour.average_rating = ((tour.average_rating
                           * tour.rating_count+rating_value)
                           / (tour.rating_count+1))
    tour.rating_count += 1
    session.add(tour)
    session.add(rating)
    commitSession()
    return "Success"


@app.route('/tours', methods=['GET'])
def get_tour_list():
    return db.list_tours()


@app.route('/tours/<tourid>', methods=['GET'])
def get_tour(tourid):
    return db.list_tour_with_id(tourid)


@app.route('/tours/<tourname>', methods=['POST'])
def set_tour(tourname):
    return db.post_tour_with_name(tourname)


@app.route('/tours/<tourid>', methods=['PUT'])
def edit_tour(tourid):
    return db.edit_tour_with_id(tourid)


@app.route('/pics', methods=['GET'])
def get_tour_pics():
    return s3.getItems()


@app.route('/ratings/<ratingid>', methods=['GET'])
def get_rating(ratingid):
    return db.list_rating_with_id(ratingid)


@app.route('/tourevents/<teid>', methods=['GET'])
def get_tourevent(teid):
    return db.list_tourevent_with_id(teid)


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
