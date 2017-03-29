import React from 'react';
import {PageTitle,TourInfo} from 'components';
import {Panel, Grid, Row, Col} from 'react-bootstrap';

class Overview extends React.Component{
  render(){

    const guideBookedTours = this.props.toursGuided.map(function(t,index){
      console.log("key:",index)
      if(t.state=="B")
        return (<TourInfo tour={t} key={index}/>);
      return null;
    });

    return (
      <div>
        <Grid>
          <PageTitle title="Overview"/>
          <Row>
            <Col md={6} mdPull={0}>
              <Panel header="Upcoming Tours">
              {guideBookedTours}
              </Panel>
            </Col>
            <Col md={6} mdPush={0}>
              <Panel header="Pending Reviews">
                No Tours
              </Panel>
            </Col>
          </Row>
          <Row>
            <Col md={6} mdPull={0}>
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

export default Overview;
