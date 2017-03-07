import React from 'react';

import {PageTitle, BannerImage ProfileHeader,
  Interests} from 'components';
import * as service from '../../utils/databaseFunctions';
import {FormButton} from '../../components/Forms/Forms.js';
import {connect} from 'react-redux';

export default class Profile extends React.Component{

    render(){
      return (
        <div>
          <ProfileHeader />

        </div>);
    }
}
