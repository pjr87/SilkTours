import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import style from './style.css';

let ErrorMessage = (props) => {
	return (
		props.errorMessage ?
			<div className={style.errorwrapper}>
				<p className={style.error}>{props.errorMessage}</p>
			</div>
			:<div></div>
	);
};

ErrorMessage.propTypes = {
	errorMessage: PropTypes.string
};

const mapStateToProps = (state) => ({
	errorMessage: state.AuthReducer.errorMessage
});

ErrorMessage = connect(mapStateToProps)(ErrorMessage);

export default ErrorMessage;
