# Run a test server.
# from app import app
# app.run(host='0.0.0.0', port=8000, debug=True)

from flask import Flask
from flask import jsonify
from flask import request
from user import User

app = Flask(__name__)
app.config['DEBUG'] = True


@app.route("/")
def hello():
    return "Hello World!"


@app.route('/users/<id>', methods=['GET'])
def get_user(id):
    user = User()
    user.getById(id)
    return jsonify(user.serialize())


# Creates a new user
@app.route('/users', methods=['POST'])
def set_user():
    print (request.form)
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
