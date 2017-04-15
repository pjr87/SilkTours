import React, {Component} from 'react';

import ToursList from './ToursList';

import * as service from '../../utils/databaseFunctions';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';

import {connect} from 'react-redux';

class TourFilteredContainer extends Component {
  constructor(props) {
    super();
    // initializes component state
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <ToursList tours={this.props.tours}/>
          </Row>
        </Grid>
      </div>
    );
  }
}

TourFilteredContainer.propTypes = {
  tours: React.PropTypes.array,
}

function select (state) {
  return {
    tours: state.SearchReducer.tours,
  };
}

export default connect(select)(TourFilteredContainer);
