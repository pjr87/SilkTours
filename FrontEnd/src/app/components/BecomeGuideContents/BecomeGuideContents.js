import React from 'react';
import {PageTitle} from 'components';
import {Panel, Grid, Row, Col} from 'react-bootstrap';
import * as service from '../../utils/databaseFunctions';
import {connect} from 'react-redux';
import { updateUser } from '../../actions/AuthActions';



class BecomeGuideContents extends React.Component{

  constructor(props) {
    super();
    this.state = {
      termsAgreement: false,
    };
  }

onClickHandler(){
  if(this.state.termsAgreement == false){
    alert("You must accept the terms and conditions!");
    return;
  }
  var modifiedUser = this.props.user;
  console.log('this.props.user', this.props.user);
  modifiedUser.is_guide = true;
  console.log('modifiedUser', modifiedUser);
  this.props.dispatch(updateUser(this.props.user_id, modifiedUser, this.props.auth));
}

checkboxClicked(){
    var t = !this.state.termsAgreement;
    this.setState({termsAgreement:t});
}

  render(){


    return (<Grid>
        <Row>
          <Col lg={12}>
            <Panel header="Terms and Conditions">
              <p>You agree to pay Troy $10000 monthly.</p><br/>
              <input type="checkbox" onChange={this.checkboxClicked.bind(this)} /> I agree to the terms and conditions listed above.
              <br/>
              <input type="button" onClick={this.onClickHandler.bind(this)} value="Submit" />
            </Panel>
          </Col>
        </Row>
      </Grid>
    );
  }
}

BecomeGuideContents.propTypes = {
  auth: React.PropTypes.object,
  user: React.PropTypes.object,
  user_id: React.PropTypes.number
}

function select (state) {
  return {
    auth: state.AuthReducer.auth,
    user: state.AuthReducer.user,
    user_id: state.AuthReducer.id_user
  };
}

export default connect(select)(BecomeGuideContents);
