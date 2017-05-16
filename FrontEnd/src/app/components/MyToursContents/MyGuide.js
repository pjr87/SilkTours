import React from 'react';
import {PageTitle,TourInfo,ToursList} from 'components';
import {Panel, Grid, Row, Col} from 'react-bootstrap';
import { getUser } from '../../actions/AuthActions';
import {connect} from 'react-redux';


class MyGuide extends React.Component{

  constructor(props)
  {
    super(props);
  }

  componentWillMount(){
        console.log(this.props.id_user, this.props.auth);

    this.props.dispatch(getUser(this.props.id_user, this.props.auth));
  }


  render(){

    const guideBookedT = this.props.toursGuided.filter(function(tour){
      return tour.state=="B";
    });
    const guideBookedTours = guideBookedT.length > 0 ? (<ToursList tourDisplayProps={{display:"small"}} tours={guideBookedT}/>) : "No Tours";

    console.log("guidebookedT", guideBookedT);

    const guideUnbookedT = this.props.toursGuided.filter(function(tour){
      return tour.state=="A";
    });
    const guideUnbookedTours =guideUnbookedT.length > 0 ? (<ToursList tourDisplayProps={{display:"small"}} tours={guideUnbookedT}/>) : "No Tours";

    console.log("guideunbookedT", guideUnbookedT);


    /*const guideUnbookedTours = this.props.toursGuided.map(function(t,index){
      console.log("key:",index)
      if(t.state=="A")
        return (<TourInfo tour={t} key={index}/>);
      return null;
    });*/
    const guideCompleteT = this.props.toursGuided.filter(function(tour){
      return tour.state=="C";
    });

    const guideCompleteTours = guideCompleteT.length > 0 ?  (<ToursList tourDisplayProps={{display:"small"}} tours={guideCompleteT}/>) : "No Tours";

    /*
      const guideCancelT = this.props.toursGuided.filter(function(tour){
        return tour.state=="D";
      });

      const guideCancelledTours = (<ToursList tourDisplayProps={{display:"small", isGuide: true}} tours={guideCancelT} cancelTourEvent={this.props.cancelTourEvent} />);
    */

    const guideToursG = this.props.allToursGuided;
    const guideToursGiving = guideToursG.length > 0 ? (<ToursList tourDisplayProps={{display:"small", isGuide: true, editBtn: true}} tours={guideToursG}  />) : "No Tours";//
    /*const guideCompleteTours = this.props.toursGuided.map(function(t,index){
      console.log("key:",index)
      if(t.state=="B")
        return (<TourInfo tour={t} key={index}/>);
      return null;
    });*/

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
              <Panel header="UnBooked Tours">
                {guideUnbookedTours}
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
              <Panel header="Currently Active Tours">
                {guideToursGiving}
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

export default connect(select)(MyGuide);