import React from 'react';
import logoImg from '../../style/images/logo.png';
import {PageTitle, BannerImage, Interests, TourModify} from 'components';
import style from './style.css';
import { Button, HelpBlock, FormGroup, Col, Row, Tab, Nav, NavItem, Image } from 'react-bootstrap';
import * as service from '../../utils/databaseFunctions';
import {connect} from 'react-redux';
import TourCreationLocation from './TourCreationLocation';
import TourCreationLanguage from './TourCreationLanguage';

class TourCreationContents extends React.Component{
  constructor() {
    super();
  }

  render(){
    return (
      <div>
        <div className={style.mainBody}>
          <Tab.Container id="left-tabs-example" defaultActiveKey="location">
            <Row className="clearfix">
              <Col sm={4}>
                <Nav stacked>
                  <NavItem eventKey="location">
                    <Image src={logoImg} style={{width:65, height:65, marginTop: -8}} circle/>
                  </NavItem>
                  <NavItem eventKey="language">
                    <p className={style.TabStyle}>Language</p>
                  </NavItem>
                </Nav>
              </Col>
              <Col sm={8}>
                <Tab.Content animation>
                  <Tab.Pane eventKey="location">
                    <TourCreationLocation
                      currentlySending={this.props.currentlySending}
                      auth={this.props.auth}
                      tour={this.props.tour}
                      dispatch={this.props.dispatch}
                      errorMessage={this.props.errorMessage}/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="language">
                    <TourCreationLanguage
                      currentlySending={this.props.currentlySending}
                      auth={this.props.auth}
                      tour={this.props.tour}
                      dispatch={this.props.dispatch}
                      errorMessage={this.props.errorMessage}/>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div>
    );
  }
}

TourCreationContents.propTypes = {
  currentlySending: React.PropTypes.bool,
  auth: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  tour: React.PropTypes.object,
  errorMessage: React.PropTypes.string
}

function select (state) {
  return {
    auth: state.AuthReducer.auth,
    currentlySending: state.TourCreationReducer.currentlySending,
    errorMessage: state.TourCreationReducer.errorMessage,
    tour: state.TourCreationReducer.tour
  };
}

export default connect(select)(TourCreationContents);
