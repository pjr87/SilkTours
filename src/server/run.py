# Run a test server.
# from app import app
# app.run(host='0.0.0.0', port=8000, debug=True)

from flask import Flask
from flask import jsonify
from flask import request
from user import User
import boto3

app = Flask(__name__)
app.config['DEBUG'] = True

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


@app.route("/")
def hello():
    return "Hello World!"


@app.route('/users/<id>', methods=['GET'])
def get_user(id):
    if (not checkLogin(id)):
        return notAuthorizedResponse()

    user = User()
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


@app.route('/users/<id>', methods=['DELETE'])
def delete_user(id):
    return 'Deleting new User %s' % id

if __name__ == "__main__":
    app.run()
