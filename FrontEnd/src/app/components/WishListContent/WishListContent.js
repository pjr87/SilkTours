import React from 'react';
import {connect} from 'react-redux';
import * as service from '../../utils/databaseFunctions';
import {Grid, Row} from 'react-bootstrap';
import ToursList from '../Tours/ToursList';

class WishListContent extends React.Component{
  constructor(props){
    super();
    this.state = {
      tours:[],
    }
  }
  componentDidMount() {
    this.fetchPostInfo(this.props.id_user);
  }

  fetchPostInfo = async (id_user) => {
    console.log("User " + id_user)
     try {
       const info = await Promise.all([
         service.favorite_details(id_user, this.props.auth)
       ]);

       // Object destructuring Syntax,
       // takes out required values and create references to them
       const tours = info[0].data;
       for(var i=0; i< tours.length; i++) {
         tours[i].favorite = true;
       }
       console.log("favorties", info[0].data);
       this.setState({
         tours,
       });

     } catch(e) {
       console.log("error occured pulling tour data");
     }
   }


  render(){
    return (
      <div>
        <Grid>
          <Row>
            <ToursList tours={this.state.tours} tourDisplayProps={{display:"favorite", contactTouristBtn:true}} />
          </Row>
        </Grid>
      </div>
    );
  }
}

// select chooses which props to pull from store
function select(state) {
  return {
    auth: state.AuthReducer.auth,
    id_user: state.AuthReducer.id_user,
  };
}

export default connect(select)(WishListContent);
