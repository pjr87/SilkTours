import React from 'react';
import {PageTitle,BecomeGuideContents} from 'components';
import {Panel, Grid, Row, Col} from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';


class BecomeGuidePage extends React.Component{

	constructor(props){
		super(props);
	}

	componentWillMount(){
		if( this.props.isGuide ){
			browserHistory.push('/tour-creation');
		}
	}

  render(){


    return (<div>
      <br/>
      <br/>
        <pageTitle title="Guide Signup Page"/>
        <BecomeGuideContents />
      </div>
    );
  }
}

// select chooses which props to pull from store
function select(state) {
  return {
    isGuide: state.AuthReducer.user.is_guide,
  };
}

export default connect(select)(BecomeGuidePage);
