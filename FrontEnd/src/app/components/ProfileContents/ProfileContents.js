import React from 'react';
import {ProfileHeader,ProfileInfo} from 'components';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Thumbnail from 'react-bootstrap/lib/Thumbnail';
import Image from 'react-bootstrap/lib/Image';
import {connect} from 'react-redux';
import * as service from '../../utils/databaseFunctions';
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router';


class ProfileContents extends React.Component{

  constructor(props){
    super(props);

    ///console.log("loc:", this.props.guideId);
    this.state = {
      guide:{},
      guideId:this.props.guideId
    };
    //this.componentWillMount = componentWillMount.bind(this);
  }
  getGuide(response){
      console.log("guide",response.data);
      // var guide = response.data;
      // var tours = guide.tours_teaching;
      // for(var i =0;i< tours.length;i++){
      //   if(tours.state=="A"){
      //     service.getTourById(tours.id_tour).then(function(response){
      //
      //     });
      //   }

      // }
      this.setState({guide:response.data});
  }
  componentDidMount(){
    service.getUser(this.state.guideId,this.props.auth).then(this.getGuide.bind(this));

  }


  render(){
    const rend = (this.state.guide.id_users) ?
    (<div><ProfileHeader profilePicture={this.state.guide.profile_picture}
      name={this.state.guide.first_name+" "+this.state.guide.last_name}/>
    <Grid>
      <ProfileInfo guide={this.state.guide}/>

    </Grid></div>) : (<div></div>);
    console.log("rend",rend);

    return(<div>
      {rend}</div>
    );
  }
}

ProfileContents.propTypes = {
  auth: React.PropTypes.object
}

function select (state) {
  return {
    auth: state.AuthReducer.auth
  };
}

export default connect(select)(ProfileContents);
