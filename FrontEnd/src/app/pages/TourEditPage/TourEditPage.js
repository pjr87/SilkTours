import React from 'react';
import { TourEditContents } from 'components';
import { connect } from 'react-redux';
import { selectTour } from '../../actions/TourEditActions';
class TourEditPage extends React.Component{

  componentWillMount(){
    this.props.dispatch(selectTour(this.props.location.query.tourId));
  }

  render(){
    return(
      <div>
        <TourEditContents/>
      </div>
    );
  }
}

// select chooses which props to pull from store
function select(state) {
  return {
    selectedTourId: state.TourEditReducer.selectedTourId,
  };
}

export default connect(select)(TourEditPage);
