
import AuthStore from "./stores/AuthStore.js";
import axios from 'axios';


authStore.on("login", () => {

  console.log("GOT USER!")
});

var userData={};

class GetData{
  static loggedInUser;

  constructor(){

    authStore.on("login", () => {

      console.log("GOT USERzz!")
    });
  }

  static getUser(){
    console.log("called.")
    return loggedInUser;
  }

  static getUser(id){

    var user1 = {id_users: "1",
    address: {
        number: 1600,
        street: "Pennsylvania",
        suffix: "Ave",
        unit: "",
        unit_number: "",
        city: "Washington",
        state: "DC",
        country: "USA",
        zip: "20500"
    },
    dob: "1946-06-14",
    is_guide: true,
    first_name: "Donald",
    last_name: "Trump",
    phone_number: "000-000-0000",
    profile_picture: "http://thehustle.co/wp-content/uploads/2016/03/1453212321_maxresdefault.jpg",
    tours_taking: [
        {
            name: "White House Tour",
            tour_id: "1",
            state: "future"
        },
        {
            name: "Trump Tower",
            tour_id: "2",
            state: "completed"
        }
    ],
    tours_guiding: [
        {
            name: "MAGA",
            tour_id: "3",
        }
    ]
    };
    axios.get("http://34.197.42.24:5000/users/"+id)
      .done(function(data) {
        console.log(data);
        data.profile_picture="http://thehustle.co/wp-content/uploads/2016/03/1453212321_maxresdefault.jpg";
        console.log(data);
        userData = data;
    });
    return user1;
  }
}

export default GetData;