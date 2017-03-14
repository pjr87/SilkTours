import React from 'react';
import {PageTitle,TourInfo} from 'components';
import {Panel, Grid, Row, Col} from 'react-bootstrap';

class MyGuide extends React.Component{
  render(){

    const guideBookedTours = this.props.toursGuided.map(function(t,index){
      console.log("key:",index)
      if(t.state=="B")
        return (<TourInfo tour={t} key={index}/>);
      return null;
    });

    const guideCompleteTours = this.props.toursGuided.map(function(t,index){
      console.log("key:",index)
      if(t.state=="B")
        return (<TourInfo tour={t} key={index}/>);
      return null;
    });



    return (
      <div>
        <Grid>
          <PageTitle title="MyGuide"/>
          <Row>
            <Col md={6} mdPull={0}>
              <Panel header="Tours Pending Confirmation">
                No Tours
              </Panel>
            </Col>
            <Col md={6} mdPush={0}>
              <Panel header="Upcoming Tours">
                {guideBookedTours}
              </Panel>
            </Col>
          </Row>
          <Row>
            <Col md={6} mdPull={0}>
              <Panel header="Tours Pending to be Validated">
                No Tours
              </Panel>
            </Col>
            <Col md={6} mdPush={0}>
              <Panel header="Tours Pending to Be Paid">
                No Tours
              </Panel>
            </Col>
          </Row>
          <Row>
            <Col md={6} mdPull={0}>
              <Panel header="Completed Tours">
                {guideCompleteTours}
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

export default MyGuide;
