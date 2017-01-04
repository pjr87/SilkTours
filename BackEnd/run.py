from flask import Flask
from flask import jsonify
import json
from flask import request
#from user import User
import boto3

<<<<<<< HEAD
from app.database_module.controlers import Tours
=======
from app.database_module.controlers import DbController
>>>>>>> refs/remotes/origin/master
from app.s3_module.controlers import S3Controller
from flask import Flask
from flask import jsonify
app = Flask(__name__)
app.config['DEBUG'] = True

client = boto3.client('cognito-identity')
tours = Tours()

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

<<<<<<< HEAD
=======
db = DbController()
s3 = S3Controller()
>>>>>>> refs/remotes/origin/master


@app.route("/")
def hello():
    return "Hello World!"


@app.route('/users/<id>', methods=['GET'])
def get_user(id):
    if (not checkLogin(id)):
        return notAuthorizedResponse()

    user = User(db)
    user.getById(id)
    checkLogin(id)
    return jsonify(user.serialize())


# Creates a new user
@app.route('/users', methods=['POST'])
def set_user():
    user = User()
    user.create(request.form)
    return jsonify(user.serialize())


# Edits a user
@app.route('/users/<id>', methods=['PUT'])
def edit_user(id):
    user = User()
    user.getById(id)
    user.setProps(request.form)
    user.commit()
    return jsonify(user.serialize())


@app.route('/tours', methods=['GET'])
def get_tour_list():
    return tours.list_tours()


@app.route('/tours/<tourid>', methods=['GET'])
def get_tour(tourid):
    return tours.list_tour_with_id(tourid)

@app.route('/tours', methods=['POST'])
def set_tour():
    return tours.post_tour(request.args.to_dict())

@app.route('/tours/<tourid>', methods=['PUT'])
def edit_tour(tourid):
    return tours.edit_tour_with_id(tourid)


@app.route('/pics', methods=['GET'])
def get_tour_pics():
    return s3.getItems()


@app.route('/ratings/<ratingid>', methods=['GET'])
def get_rating(ratingid):
    return tours.list_rating_with_id(ratingid)


@app.route('/tourevents/<teid>', methods=['GET'])
def get_tourevent(teid):
    return tours.list_tourevent_with_id(teid)


if __name__ == "__main__":
    app.run()
