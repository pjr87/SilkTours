import React from 'react';
import {ProfileContents} from 'components';

export default class ProfilePage extends React.Component{

  constructor(props){
    super(props)
    this.state={guide_id: this.props.location.query.guideUserId};
    
  }

  render(){
    return(
      <div>
        <ProfileContents guideId={this.state.guide_id}/>
      </div>
    );
  }
}
