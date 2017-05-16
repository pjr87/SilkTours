import React from 'react';
import {PageTitle, WishListContent} from 'components';
import {Panel, Grid, Row, Col} from 'react-bootstrap';

class Favorites extends React.Component{
  render(){
    return (
      <div>
        <Grid>
          <PageTitle title="Favorites"/>
          <WishListContent/>
        </Grid>
      </div>
    );
  }
}

export default Favorites;
