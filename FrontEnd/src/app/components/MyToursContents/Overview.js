import React from 'react';
import {PageTitle,TourInfo,ToursList} from 'components';
import {Panel, Grid, Row, Col, ListGroup, ListGroupItem, Button} from 'react-bootstrap';
import { getPendingReviewsByUserId, setShowPendingReview } from '../../actions/PendingReviewActions';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';
import PendingReview from '../PendingReview/PendingReview';
import { getUser } from '../../actions/AuthActions';


class Overview extends React.Component{
  constructor(props){
    super();
    this.state = {
      showComponent: false,
      selectedPendingReview: '',
    };
  }

  componentWillMount() {
        console.log(this.props.id_user, this.props.auth);

    this.props.dispatch(getPendingReviewsByUserId(this.props.id_user, this.props.auth));
    // this.props.dispatch(getPendingReviewsByUserId("1", this.props.auth));
    this.props.dispatch(getUser(this.props.id_user, this.props.auth));
  }

  handleReviewChange(id_tour) {
    this.setState({
      showComponent: true,
      selectedPendingReview: id_tour,
    });
    this.props.dispatch(setShowPendingReview(true));
  }

  render(){
    
    const guideBookedT = this.props.toursGuided.filter(function(tour){
      return tour.state=="B";
    });
    const guideBookedTours = guideBookedT.length > 0 ? (<ToursList tourDisplayProps={{display:"small"}} tours={guideBookedT}/>) : "No Tours";


    const pendingReviewContent = this.props.tripCompleted.length > 0 ?  <ListGroup fill>
                  {this.props.tripCompleted.map((tours, i) => {
                    return (
                      <ListGroupItem key={i}>{i+1}. {tours.name} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Button onClick={this.handleReviewChange.bind(this, i)}>Review</Button></ListGroupItem>);
                  })}
                </ListGroup> : "No Tours for Review" ;


  /*  const guideBookedTours = this.props.toursGuided.map(function(t,index){
      console.log("key:",index)
      if(t.state=="B")
        return (<TourInfo tour={t} key={index}/>);
      return null;
    });*/

    return (
      <div>
        {this.state.showComponent ?
           <PendingReview selectedPendingReview={this.state.selectedPendingReview}/> :
           null
        }
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
                {pendingReviewContent}
              </Panel>
            </Col>
          </Row>
        {/*
          <Row>
            <Col md={6} mdPull={0}>
              <Panel header="New Messages">
                No Tours
              </Panel>
            </Col>
          </Row>
          */}
        </Grid>
      </div>
    );
  }
}

function select (state) {
  return {
    auth: state.AuthReducer.auth,
    loggedIn: state.AuthReducer.loggedIn,
    id_user: state.AuthReducer.id_user,
    showPendingReview: state.PendingReviewReducer.showPendingReview,
    tripCompleted: state.PendingReviewReducer.tripCompleted,
    rating: state.PendingReviewReducer.rating,
    comment: state.PendingReviewReducer.comment,
  };
}

export default connect(select)(Overview);
