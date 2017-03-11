import React from 'react';
import { TourDetailContents } from 'components';
import { connect } from 'react-redux';
import { selectTour } from '../../actions/TourDetailActions';
class TourDetailPage extends React.Component{

  componentWillMount(){
    this.props.dispatch(selectTour(this.props.location.query.tourId));
  }

  render(){
    return(
      <div>
        <TourDetailContents/>
      </div>
    );
  }
}

// select chooses which props to pull from store
function select(state) {
  return {
    selectedTourId: state.TourReducer.selectedTourId,
  };
}

export default connect(select)(TourDetailPage);
