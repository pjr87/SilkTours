import React from 'react';

import {PageTitle} from 'components';

class NotFound extends React.Component{
  render(){
    return(
      <div>
        <PageTitle title = "Page not found, please go back"/>
        <PageTitle title = "Never More!"/>
      </div>
    );
  }
}

export default NotFound;
