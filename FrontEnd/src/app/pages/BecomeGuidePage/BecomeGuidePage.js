import React from 'react';
import {PageTitle,BecomeGuideContents} from 'components';
import {Panel, Grid, Row, Col} from 'react-bootstrap';
import { browserHistory } from 'react-router';

export default class BecomeGuidePage extends React.Component{

  render(){


    return (<div>
      <br/>
      <br/>
        <pageTitle title="Guide Signup Page"/>
        <BecomeGuideContents />
      </div>
    );
  }
}
