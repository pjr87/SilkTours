import AuthStore from './AuthStore';
import * as service from '../../utils/databaseFunctions';

authStore.on("login", () => {
  //ObjectStore.setState();
  UserStore.
  console.log("GOT USERzz!");
});

class UserStore{
  constructor(){

    this.state = {
        fetching: false, // tells whether the request is waiting for response or not
        user: {},
        warningVisibility: false
    };

    this.userProfile = {id_users: "",
    address: {
        number: 0,
        street: "",
        suffix: "",
        unit: "",
        unit_number: "",
        city: "",
        state: "",
        country: "",
        zip: ""
    },
    dob: "",
    is_guide: false,
    first_name: "",
    last_name: "",
    phone_number: "",
    profile_picture: "http://thehustle.co/wp-content/uploads/2016/03/1453212321_maxresdefault.jpg",
    tours_taking: [
        {
            name: "",
            tour_id: "1",
            state: ""
        },
        {
            name: "",
            tour_id: "",
            state: ""
        }
    ],
    tours_guiding: [
        {
            name: "",
            tour_id: "",
        }
    ]
    };
  }

  getUserInfo = async (postId) => {

      try {
          // wait for two promises
          const info = await Promise.all([
              service.getUser(1)
          ]);

          const user = info[0].data.data

      } catch(e) {
          // if err, stop at this point
          this.setState({
              fetching: false
          });
          this.showWarning();
      }
  }


getUserProfile(){
  if(authStore.signedin())
    return this.userProfile;

  return {};
}

}
