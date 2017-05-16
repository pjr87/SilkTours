import React from 'react';
import {PageTitle} from 'components';
import {Panel, Grid, Row, Col} from 'react-bootstrap';
import * as service from '../../utils/databaseFunctions';
import {connect} from 'react-redux';
import { updateUser } from '../../actions/AuthActions';
import { browserHistory } from 'react-router';



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


  var obj = {is_guide:true};
  var forSubmit = JSON.parse(JSON.stringify(obj));
  console.log(forSubmit);
  this.props.dispatch(updateUser(this.props.user_id, forSubmit, this.props.auth));
  browserHistory.push('/tour-creation');
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
              <ol>
                <li><strong>Introduction</strong></li>
            </ol>
            <p>These Website Standard Terms and Conditions written on this webpage shall manage your use of this website. These Terms will be applied fully and affect to your use of this Website. By using this Website, you agreed to accept all terms and conditions written in here. You must not use this Website if you disagree with any of these Website Standard Terms and Conditions.</p>
            <ol start={2}>
                <li><strong>Intellectual Property Rights</strong></li>
            </ol>
            <p>Other than the content you own, under these Terms, Silk Tours and/or its licensors own all the intellectual property rights and materials contained in this Website.</p>
            <p>You are granted limited license only for purposes of viewing the material contained on this Website.</p>
            <ol start={3}>
                <li><strong>Restrictions</strong></li>
            </ol>
            <p>You are specifically restricted from all of the following</p>
            <ul>
                <li>publishing any Website material in any other media;</li>
                <li>selling, sublicensing and/or otherwise commercializing any Website material;</li>
                <li>publicly performing and/or showing any Website material;</li>
                <li>using this Website in any way that is or may be damaging to this Website;</li>
                <li>using this Website in any way that impacts user access to this Website;</li>
                <li>using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity;</li>
                <li>engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website;</li>
                <li>using this Website to engage in any advertising or marketing.</li>
            </ul>
            <p>Certain areas of this Website are restricted from being access by you and Silk Tours may further restrict access by you to any areas of this Website, at any time, in absolute discretion. Any user ID and password you may have for this Website are confidential and you must maintain confidentiality as well.</p>
            <ol start={4}>
                <li><strong>Your Content</strong></li>
            </ol>
            <p>In these Website Standard Terms and Conditions, “Your Content” shall mean any audio, video text, images or other material you choose to display on this Website. By displaying Your Content, you grant Silk Tours a non-exclusive, worldwide irrevocable, sub licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.</p>
            <p>Your Content must be your own and must not be invading any third-party’s rights. Silk Tours reserves the right to remove any of Your Content from this Website at any time without notice.</p>
            <ol start={5}>
                <li><strong>No warranties</strong></li>
            </ol>
            <p>This Website is provided “as is,” with all faults, and Silk Tours express no representations or warranties, of any kind related to this Website or the materials contained on this Website. Also, nothing contained on this Website shall be interpreted as advising you.</p>
            <ol start={6}>
                <li><strong>Limitation of liability</strong></li>
            </ol>
            <p>In no event shall Silk Tours, nor any of its officers, directors and employees, shall be held liable for anything arising out of or in any way connected with your use of this <a href="https://premiumlinkgenerator.com/" target="_blank">Website</a> whether such liability is under contract. &nbsp;Silk Tours, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.</p>
            <ol start={7}>
                <li><strong>Indemnification</strong></li>
            </ol>
            <p>You hereby indemnify to the fullest extent Silk Tours from and against any and/or all liabilities, costs, demands, causes of action, damages and expenses arising in any way related to your breach of any of the provisions of these Terms.</p>
            <ol start={8}>
                <li><strong>Severability</strong></li>
            </ol>
            <p>If any provision of these Terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.</p>
            <ol start={9}>
                <li><strong>Variation of Terms</strong></li>
            </ol>
            <p>Silk Tours is permitted to revise these Terms at any time as it sees fit, and by using this Website you are expected to review these Terms on a regular basis.</p>
            <ol start={10}>
                <li><strong>Assignment</strong></li>
            </ol>
            <p>The Silk Tours is allowed to assign, transfer, and subcontract its rights and/or obligations under these Terms without any notification. However, you are not allowed to assign, transfer, or subcontract any of your rights and/or obligations under these Terms.</p>
            <ol start={11}>
                <li><strong>Entire Agreement</strong></li>
            </ol>
            <p>These Terms constitute the entire agreement between Silk Tours and you in relation to your use of this Website, and supersede all prior agreements and understandings.</p>
            <ol start={12}>
                <li><strong>Governing Law &amp; Jurisdiction</strong></li>
            </ol>
            <p>These Terms will be governed by and interpreted in accordance with the laws of the State of Pennsylvania, and you submit to the non-exclusive jurisdiction of the state and federal courts located in Pennsylvania for the resolution of any disputes.</p>







              <br/>
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
