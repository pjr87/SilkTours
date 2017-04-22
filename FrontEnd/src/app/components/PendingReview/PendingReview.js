import React from 'react';

import PageHeader from 'react-bootstrap/lib/PageHeader';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Button from 'react-bootstrap/lib/Button';
import Pager from 'react-bootstrap/lib/Pager';
import Pagination from 'react-bootstrap/lib/Pagination';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';
import Modal from 'react-bootstrap/lib/Modal';

import ToursList from '../Tours/ToursList';
import * as service from '../../utils/databaseFunctions';
import { getPendingReviewsByUserId, setShowPendingReview, setShowRating, setShowComment, postPendingReviewsByRatingComment, putClearPendingReviewsByEventId } from '../../actions/PendingReviewActions';

class PendingReview extends React.Component{
  constructor(props){
    super();
    this.state = {
      showModal: true,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleSubmitPendingReview = this.handleSubmitPendingReview.bind(this);
    this.handleDeclinePendingReview = this.handleDeclinePendingReview.bind(this);
  }

  closeModal() {
    this.props.dispatch(setShowPendingReview(false));
  }

  openModal() {

  }

  handleRatingChange(e) {
    this.props.dispatch(setShowRating(e.target.value));
  }

  handleCommentChange(e) {
    this.props.dispatch(setShowComment(e.target.value));
  }

  handleSubmitPendingReview(){
    this.props.dispatch(postPendingReviewsByRatingComment(this.props.id_user, this.props.tripCompleted[0].id_tour, this.props.rating, this.props.comment, this.props.auth));
    this.props.dispatch(setShowPendingReview(false));
  }

  handleDeclinePendingReview(){
    this.props.dispatch(putClearPendingReviewsByEventId(this.props.tripCompleted[0].id_tourEvent, this.props.auth))
    this.props.dispatch(setShowPendingReview(false));
  }

  componentDidMount() {
    if(this.props.loggedIn) {
      this.props.dispatch(getPendingReviewsByUserId("1", this.props.auth));
      // this.props.dispatch(getPendingReviewsByUserId(this.props.id_user, this.props.auth));
    }
  }

  render(){
    if(this.props.loggedIn && this.props.tripCompleted != '') {
    return(
      <div>
      <Modal show={this.props.showPendingReview} onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Review: {this.props.tripCompleted[0].name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Average Rating: {this.props.tripCompleted[0].average_rating}
          <br/>
          <br/>
          <br/>
          <Form>
          <FormGroup controlId="Review">
            <ControlLabel>Review: </ControlLabel>
            {'  '}
            <FormControl componentClass="select" placeholder="select" value={this.props.rating}
              onChange={this.handleRatingChange}>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </FormControl>
          </FormGroup>
          <br/>
          <FormGroup controlId="comment">
            <ControlLabel>Comment: </ControlLabel>
            {'  '}
            <FormControl value={this.props.comment}
              onChange={this.handleCommentChange}/>
          </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleSubmitPendingReview}>Submit</Button>
          <Button onClick={this.handleDeclinePendingReview}>Decline</Button>
          <Button onClick={this.closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
      </div>
    );
    }
    else{
      return(
        <div></div>
      );
    }
  }
}

PendingReview.propTypes = {

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

export default connect(select)(PendingReview);
