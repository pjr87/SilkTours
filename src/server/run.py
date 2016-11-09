# Run a test server.
#from app import app
#app.run(host='0.0.0.0', port=8000, debug=True)

from app.database_module.controlers import dyanamoDbController
from app.s3_module.controlers import S3Controller
from flask import Flask
from flask import jsonify
app = Flask(__name__)

db = dyanamoDbController()
s3 = S3Controller()

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
    app.run()

