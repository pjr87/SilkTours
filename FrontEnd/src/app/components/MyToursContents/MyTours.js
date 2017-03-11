import React from 'react';
import {PageTitle} from 'components';
import {Panel, Grid, Row, Col} from 'react-bootstrap';

class MyTours extends React.Component{
  render(){
    return (
      <div>
        <Grid>
          <PageTitle title="MyTours"/>
          <Row>
            <Col md={6} mdPull={0}>
              <Panel header="Confirmed Tours">
                No Tours
              </Panel>
            </Col>
            <Col md={6} mdPush={0}>
              <Panel header="Completed Tours">
                No Tours
              </Panel>
            </Col>
          </Row>
          <Row>
            <Col md={6} mdPull={0}>
              <Panel header="Tours Pending Confirmation">
                No Tours
              </Panel>
            </Col>
            <Col md={6} mdPush={0}>
              <Panel header="Cancelled Tours">
                No Tours
              </Panel>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default MyTours;
