import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Panel from 'react-bootstrap/lib/Panel';
import Col from 'react-bootstrap/lib/Col';
import {TourInfo, ToursList} from 'components';
import Thumbnail from 'react-bootstrap/lib/Thumbnail';
import Image from 'react-bootstrap/lib/Image';
import React from 'react';


export default class ProfileInfo extends React.Component{

  render(){
    const offeredTours = this.props.guide.tours_teaching.map(function(t,index){
      console.log("key:",index)
      if(t.state=="A")
        return (<TourInfo tour={t} key={index}/>);
      return null;
    });
//NEED TO PASS tourDisplayProps argument
    return (
      <Row>
        <Col xs={12} md={4} lg={4}>
        <Panel header="Contact Information">

          <p>Email: {this.props.guide.email}</p>
          <p>Phone: {this.props.guide.phone_number}</p>
          </Panel>
        </Col>
        <ToursList tourDisplayProps={{display:"small",showEdit:false}} tours={tours} />
        <Col xs={12} md={4} lg={4}>
          <Panel header={"About "+this.props.guide.first_name}>
            {this.props.guide.description}
          </Panel>
        </Col>
      </Row>
    );
  }
}
