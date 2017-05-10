import React from 'react';
import {PageTitle,TourInfo,ToursList} from 'components';
import {Panel, Grid, Row, Col} from 'react-bootstrap';
import { getUser } from '../../actions/AuthActions';
import {connect} from 'react-redux';


class MyTours extends React.Component{
  constructor(props) {
    super();
  }


  componentWillMount(){
    console.log(this.props.id_user, this.props.auth);
    this.props.dispatch(getUser(this.props.id_user, this.props.auth));
  }

  render(){

    const takeCompletedT = this.props.toursTaken.filter(function(tour){
      return tour.state=="C";
    });
    const takeCompletedTours = (takeCompletedT.length > 0) ? (<ToursList tourDisplayProps={{display:"small", isGuide: false, cancelBtn:true}} tours={takeCompletedT} cancelTourEvent={this.props.cancelTourEvent}/>) : "No Tours";

    /*const takeCompletedTours = this.props.toursTaken.map(function(t,index){
      console.log("key:",index)
      if(t.state=="C")
        return (<TourInfo tour={t} key={index}/>);
      return null;
    });*/

    const takeBookedT = this.props.toursTaken.filter(function(tour){
      return tour.state=="B";
    });
    const takeBookedTours = (<ToursList tourDisplayProps={{display:"small", isGuide: false, cancelBtn:true}} tours={takeBookedT} cancelTourEvent={this.props.cancelTourEvent}/>);

    const cancelT = this.props.toursTaken.filter(function(tour){
      return tour.state=="D";
    });
    console.log("cancelT", cancelT);
    const cancelledTours = (cancelT.length > 0 ) ? (<ToursList tourDisplayProps={{display:"small", isGuide: false}} tours={cancelT} cancelTourEvent={this.props.cancelTourEvent}/>) : "No Tours";

    /*
    const takeBookedTours = this.props.toursTaken.map(function(t,index){
      console.log("key:",index)
      if(t.state=="B")
        return (<TourInfo tour={t} key={index}/>);
      return null;
    });*/


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
                {cancelledTours}
              </Panel>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}


function select (state) {
  return {
    auth: state.AuthReducer.auth,
    id_user: state.AuthReducer.id_user
  };
}

export default connect(select)(MyTours);