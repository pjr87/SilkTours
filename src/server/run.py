# Run a test server.
#from app import app
#app.run(host='0.0.0.0', port=8000, debug=True)

from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

@app.route('/users/<username>', methods=['GET'])
def get_user(username):
    return 'User %s' % username

@app.route('/users/<username>', methods=['POST'])
def set_user(username):
    return 'Creating new User %s' % username

@app.route('/users/<username>', methods=['PUT'])
def edit_user(username):
    return 'Editing new User %s' % username

@app.route('/users/<username>', methods=['DELETE'])
def delete_user(username):
    return 'Deleting new User %s' % username

if __name__ == "__main__":
    app.run()

