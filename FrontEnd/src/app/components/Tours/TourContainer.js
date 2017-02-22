import React, {Component} from 'react';

import ToursList from './ToursList';

import * as service from '../../ajaxServices/AjaxList';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';

class TourContainer extends Component {
  constructor(props) {
    super();
    // initializes component state
    this.state = {
      fetching: false, // tells whether the request is waiting for response or not
      tours: [],
    };
  }

  componentDidMount() {
    this.fetchPostInfo(1);
  }

  fetchPostInfo = async (postId) => {
    this.setState({
      fetching: true // requesting..
    });

    try {
      // wait for two promises
      const info = await Promise.all([
        service.getAllTours()
      ]);

      // Object destructuring Syntax,
      // takes out required values and create references to them
      const tours = info[0].data.data
      this.setState({
        tours,
        fetching: false // done!
      });

    } catch(e) {
      // if err, stop at this point
      this.setState({
        fetching: false
      });
    }
  }

  render() {
    const {fetching, tours} = this.state;
    return (
      <div>
        <Grid>
          <Row>
            <ToursList tours={tours}/>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default TourContainer;
