import React from 'react';

import {PageTitle, ContactUsContents, TermsOfService, Privacy} from 'components';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import style from './style.css';
import { Link } from 'react-router';


class PolicyPage extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      currentPage: this.props.location.query.doc
    };

    console.log("Page: ", this.state.currentPage);

    this.viewTerms = this.viewTerms.bind(this);
    this.viewPrivacy = this.viewPrivacy.bind(this);

    console.dir(this.props.location.query.doc);
  }

  viewTerms(){
    this.setState({currentPage: 'terms'})
  }

  viewPrivacy(){
    this.setState({currentPage: 'privacy'})
  }

  render(){

    var component;
    var pageTitle;

    if( this.state.currentPage == "privacy" )
    {
      component = <Privacy />;
      pageTitle = <PageTitle title= "Privacy Policy"/>;
    }
    else
    {
      component = <TermsOfService />;
      pageTitle = <PageTitle title= "Terms of Service"/>;
    }


    return(

      <div className={style.policyPage}>
        <Grid>
          <Row>
            <Col xs={2} lg={4}>
              <ul className={style.policySidebar}>
              <Link onClick={this.viewTerms} to={{pathname:"/policy", query:{doc:"terms"}}}>
                <li className={this.state.currentPage=="terms"&&style.activeDoc || null}>Terms of Service</li>
              </Link>
              <Link onClick={this.viewPrivacy} to={{pathname:"/policy", query:{doc:"privacy"}}}>
                <li className={this.state.currentPage=="privacy"&&style.activeDoc || null}>Privacy Policy</li>
              </Link>
              </ul>
            </Col>

            <Col xs={10} lg={8}>
              {pageTitle}
              <br/>
              <br/>
              {component}
            </Col>
          </Row>
        </Grid>
        <br />
        <br />
        <br />

      </div>
    );
  }
}

export default (PolicyPage);
