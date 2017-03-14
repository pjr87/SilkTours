import React from 'react';
import {PageTitle,TourInfo} from 'components';
import {Panel, Grid, Row, Col} from 'react-bootstrap';

export default class MyTours extends React.Component{

  render(){

    const takeCompletedTours = this.props.toursTaken.map(function(t,index){
      console.log("key:",index)
      if(t.state=="C")
        return (<TourInfo tour={t} key={index}/>);
      return null;
    });

    const takeBookedTours = this.props.toursTaken.map(function(t,index){
      console.log("key:",index)
      if(t.state=="B")
        return (<TourInfo tour={t} key={index}/>);
      return null;
    });


    return (
      <div>
        <Grid>
          <PageTitle title="MyTours"/>
          <Row>
            <Col md={6} mdPull={0}>
              <Panel header="Confirmed Tours">
              {takeBookedTours}
              </Panel>
            </Col>
            <Col md={6} mdPush={0}>
              <Panel header="Completed Tours">
                {takeCompletedTours}
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
