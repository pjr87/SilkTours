import React from 'react';
import {PageTitle} from 'components';
import {Panel, Grid, Row, Col} from 'react-bootstrap';

class Messages extends React.Component{
  render(){
    return (
      <div>
        <Grid>
          <PageTitle title="Messages"/>
        </Grid>
      </div>
    );
  }
}

export default Messages;
