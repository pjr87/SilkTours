import React from 'react';
import {PageTitle} from 'components';
import {Panel, Grid, Row, Col} from 'react-bootstrap';

class MyGuide extends React.Component{
  render(){
    return (
      <div>
        <Grid>
          <PageTitle title="MyGuide"/>
          <Row>
            <Col md={6} mdPush={6}>
              <Panel header="Upcoming Tours">
                No Tours
              </Panel>
            </Col>
            <Col md={6} mdPull={6}>
              <Panel header="Pending Reviews">
                No Tours
              </Panel>
            </Col>
          </Row>
          <Row>
            <Col md={6} mdPush={0}>
              <Panel header="New Messages">
                No Tours
              </Panel>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default MyGuide;
