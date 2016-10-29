# Run a test server.
#from app import app
#app.run(host='0.0.0.0', port=8000, debug=True)

from app.database_module.controlers import dyanamoDbController
from flask import Flask
from flask import jsonify
app = Flask(__name__)

db = dyanamoDbController()
db.listTables()

@app.route("/")
def hello():
    return "Hello World!"

@app.route('/users/<username>', methods=['GET'])
def get_user(username):
    return 'User %s' % username

@app.route('/users/<username>', methods=['POST'])
def set_user(username):
    return 'Creating new User %s' % username

@app.route('/tours', methods=['GET'])
def get_tour_list():
    tour_list = {}
    tour_list['key'] = 'value'
    return jsonify(tour_list)

@app.route('/tours/<tourid>', methods=['GET'])
def get_tour(tourid):
    return 'Tour id %s' % db.listTables()

@app.route('/tours/<tourname>', methods=['POST'])
def set_tour(tourname):
    return 'Tour post Name %s' % tourname

@app.route('/tours/<tourid>', methods=['PUT'])
def edit_tour(tourid):
    return 'Tour put Id %s' % tourid



if __name__ == "__main__":
    app.run()

