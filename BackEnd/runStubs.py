from flask import Flask
from flask import jsonify
from flask import jsonify
app = Flask(__name__)
app.config['DEBUG'] = True

user1 = {
            "id_users": "1",
            "address": {
                "number": 1600,
                "street": "Pennsylvania",
                "suffix": "Ave",
                "unit": None,
                "unit_number": None,
                "city": "Washington",
                "state": "DC",
                "country": "USA",
                "zip": "20500"
            },
            "dob": "1946-06-14",
            "is_guide": True,
            "first_name": "Donald",
            "last_name": "Trump",
            "phone_number": "000-000-0000",
            "profile_picture": "http://i.imgur.com/vw6zfa1.jpg",
            "tours_taking": [
                {
                    "name": "White House Tour",
                    "tour_id": "1",
                    "state": "future"
                },
                {
                    "name": "Trump Tower",
                    "tour_id": "2",
                    "state": "completed"
                }
            ],
            "tours_guiding": [
                {
                    "name": "MAGA",
                    "tour_id": "3",
                }
            ]
    }

def checkLogin(id):
    return True

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

    return jsonify(user1)


# Creates a new user
@app.route('/users', methods=['POST'])
def set_user():
    data = user1
    data["success"] = True
    return jsonify(data)


# Edits a user
@app.route('/users/<id>', methods=['PUT'])
def edit_user(id):
    data = user1
    data["success"] = True
    return jsonify(data)


tour1 = {
    "tour_id": 1,
    "first_date_time": "2016-09-16",
    "last_data_time": "2017-11-16",
    "number_of_days": 1,
    "location": {
         "number": 1600,
         "street": "Pennsylvania",
         "suffix": "Ave",
         "unit": None,
         "unit_number": None,
         "city": "Washington",
         "state": "DC",
         "country": "USA",
         "zip": "20500"
    },
    "name": "White House Tour",
    "guide_name": "Barack Obama",
    "price": 65.00,
    "description": "This is a tour of the White House",
    "images": [
        "http://i.imgur.com/e9cfxMi.png",
        "https://i.imgur.com/iQzu2RCh.jpg"
    ],
    "videos": []
}

@app.route('/tours', methods=['GET'])
def get_tour_list():
    return jsonify([tour1])


@app.route('/tours/<tourid>', methods=['GET'])
def get_tour(tourid):
    return jsonify(tour1)


@app.route('/tours/<tourname>', methods=['POST'])
def set_tour(tourname):
    data = tour1
    data["success"] = True
    return jsonify(data)


@app.route('/tours/<tourid>', methods=['PUT'])
def edit_tour(tourid):
    data = tour1
    data["success"] = True
    return jsonify(data)


@app.route('/pics', methods=['GET'])
def get_tour_pics():
    return jsonify([])


@app.route('/ratings/<ratingid>', methods=['GET'])
def get_rating(ratingid):
    return jsonify({"average": 4})


@app.route('/tourevents/<teid>', methods=['GET'])
def get_tourevent(teid):
    return jsonify({})


if __name__ == "__main__":
    app.run()
