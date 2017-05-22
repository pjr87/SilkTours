import React from 'react';

import {ToursList} from 'components';

import * as service from '../../utils/databaseFunctions';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';

class TourContainer extends React.Component {
  constructor(props) {
    super();
    // initializes component state
    this.state = {
      fetching: false, // tells whether the request is waiting for response or not
      tours: [],
      displayprops:{display:"large", showEdit:false}
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
      const tours = info[0].data.data;
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
  //  const {fetching, tours, displayProps} = this.state;


    //console.log("tProps:",this.state.displayProps);
    return (
      <div>
        <Grid>
          <Row>
            <ToursList tourDisplayProps={{display:"large"}}  tours={this.state.tours}/>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default TourContainer;
