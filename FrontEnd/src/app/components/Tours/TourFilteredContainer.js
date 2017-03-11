import React, {Component} from 'react';

import ToursList from './ToursList';

import * as service from '../../utils/databaseFunctions';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';

class TourFilteredContainer extends Component {
  constructor(props) {
    super();
    // initializes component state
    this.state = {
      fetching: false, // tells whether the request is waiting for response or not
      tours: [],
      rating: props.rating,
      priceMin: props.priceMin,
      priceMax: props.priceMax,
      keywords: props.keywords
    };
  }

  componentDidMount() {
    this.fetchPostInfo(this.state.rating, this.state.priceMin, this.state.priceMax, this.state.keywords);
  }

  componentWillReceiveProps(nextProps) {
    console.log("props changed")
    // console.log("rating: " + nextProps.rating)
    // console.log("priceMin: " + nextProps.priceMin)
    // console.log("priceMax: " + nextProps.priceMax)
    // console.log("keywords: " + nextProps.keywords)
    if(this.props.rating != nextProps.rating || this.props.priceMin != nextProps.priceMin
      || this.props.priceMax != nextProps.priceMax || this.props.keywords != nextProps.keywords){
      this.setState({
        rating: nextProps.rating,
        priceMin: nextProps.priceMin,
        priceMax: nextProps.priceMax,
        keywords: nextProps.keywords
      })
      this.fetchPostInfo(nextProps.rating, nextProps.priceMin, nextProps.priceMax, nextProps.keywords);
    }
  }

  fetchPostInfo = async (rating, priceMin, priceMax, keywords) => {
    this.setState({
      fetching: true // requesting..
    });

    try {
      // wait for two promises
      console.log("new tour")
      console.log("rating: " + rating)
      console.log("priceMin: " + priceMin)
      console.log("priceMax: " + priceMax)
      console.log("keywords: " + keywords)
      const info = await Promise.all([
        service.getFilteredTours(rating, priceMin, priceMax, keywords)
      ]);

      // Object destructuring Syntax,
      // takes out required values and create references to them
      const tours = info[0].data.data;
      console.log(info[0].data.data);
      this.setState({
        tours,
        fetching: false // done!
      });

    } catch(e) {
      // if err, stop at this point
      this.setState({
        fetching: false
      });
      console.log("error occured pulling tour data");
    }
  }

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <ToursList tours={this.state.tours}/>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default TourFilteredContainer;
