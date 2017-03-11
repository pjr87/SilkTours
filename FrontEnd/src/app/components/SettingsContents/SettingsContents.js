import React from 'react';
import PageTitle from '../PageTitle/PageTitle';
import UserInfo from '../UserInfo/UserInfo';
import ProfileHeader from '../Profile/ProfileHeader';
import Interests from '../Interests/Interests';
import { Button, HelpBlock, FormGroup, Col } from 'react-bootstrap';
import * as service from '../../utils/databaseFunctions';
import {connect} from 'react-redux';
import { updateUser } from '../../actions/AuthActions';

class SettingsContents extends React.Component{

  constructor(props) {
    super();

    this.onSubmitClick = this.onSubmitClick.bind(this)
  }

  onSubmitClick(){
    this.props.dispatch(updateUser(this.props.id_user, this.props.user, this.props.auth));
  }

  render(){
    let isLoading = this.props.currentlySending;

    function ErrorFunc(props){
      if( props.errorText ){
        return (<HelpBlock>{props.errorText}</HelpBlock>);
      }
      return <div></div>
    }

    return (
      <div>
        <div>
          <ProfileHeader name={this.props.user.first_name+" "+this.props.user.last_name} profilePicture={this.props.user.profile_picture}/>
          <PageTitle title= "settings" />
          <UserInfo user={this.props.user} dispatch={this.props.dispatch} formTitle="User Information" />
          <Interests title="Interests" user={this.props.user} dispatch={this.props.dispatch} />
          <FormGroup
            validationState = {this.props.errorMessage ? "error" : "success"}>
            <Col smOffset={2} sm={10}>
              <ErrorFunc errorText = {this.props.errorMessage} />
              <Button
                disabled={isLoading}
                onClick={!isLoading ? this.onSubmitClick : null}>
                {isLoading ? 'Updating...' : 'Update Profile'}
              </Button>
            </Col>
          </FormGroup>
        </div>
      </div>
    );
  }
}

SettingsContents.propTypes = {
  currentlySending: React.PropTypes.bool,
  id_user: React.PropTypes.number,
  auth: React.PropTypes.object,
  user: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  errorMessage: React.PropTypes.string
}

function select (state) {
  return {
    id_user: state.AuthReducer.id_user,
    auth: state.AuthReducer.auth,
    user: state.AuthReducer.user,
    currentlySending: state.AuthReducer.currentlySending,
    errorMessage: state.AuthReducer.errorMessage
  };
}


export default connect(select)(SettingsContents);
