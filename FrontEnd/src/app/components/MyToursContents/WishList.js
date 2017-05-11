import React from 'react';
import {PageTitle, WishListContent} from 'components';
import {Panel, Grid, Row, Col} from 'react-bootstrap';

class WishList extends React.Component{
  render(){
    return (
      <div>
        <Grid>
          <PageTitle title="WishList"/>
          <WishListContent/>
        </Grid>
      </div>
    );
  }
}

export default WishList;
