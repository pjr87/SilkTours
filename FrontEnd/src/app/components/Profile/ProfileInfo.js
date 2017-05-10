import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Panel from 'react-bootstrap/lib/Panel';
import Col from 'react-bootstrap/lib/Col';
import {TourInfo, ToursList} from 'components';
import Thumbnail from 'react-bootstrap/lib/Thumbnail';
import Image from 'react-bootstrap/lib/Image';
import React from 'react';


export default class ProfileInfo extends React.Component{

  constructor(props)
  {
    super(props);
  }

  render(){

    const offeredT = this.props.user.tours_teaching;
    const offeredTours = (<ToursList tourDisplayProps={{display:"small", messageButton:false}} tours={offeredT}/>);

    return (
      <Row>
        <Col xs={12} md={4} lg={4}>
        <Panel header="Contact Information">

          <p>Email: {this.props.user.email}</p>
          <p>Phone: {this.props.user.phone_number}</p>
          </Panel>

            <Panel header={"About "+this.props.user.first_name}>
              {this.props.user.description}
            </Panel>
        </Col>
        <Col xs={12} md={8} lg={8}>
          <Panel header={"Tours Offered"}>
            {offeredTours}
          </Panel>
        </Col>
      </Row>
    );
  }
}
