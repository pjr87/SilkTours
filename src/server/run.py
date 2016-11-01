# Run a test server.
#from app import app
#app.run(host='0.0.0.0', port=8000, debug=True)

from flask import Flask
from flask import jsonify
from flask import request
import app.bar
from user import User

app = Flask(__name__)
app.config['DEBUG'] = True

@app.route("/")
def hello():
    return "Hello World!"

@app.route('/users/<id>', methods=['GET'])
def get_user(id):
    user = User(id)
    return jsonify(user.serialize());

# Creates a new user
@app.route('/users', methods=['POST'])
def set_user():
    print (request.form)
    user = User(0)
    user.setProps(request.form)
    user.commit()
    return jsonify(user.serialize());

# Edits a user
@app.route('/users/<id>', methods=['PUT'])
def edit_user(id):
    user = User(id)
    user.setProps(request.form)
    user.commit()
    return 'Editing new User %s' % id

@app.route('/users/<id>', methods=['DELETE'])
def delete_user(id):
    return 'Deleting new User %s' % id

if __name__ == "__main__":
    app.run()

