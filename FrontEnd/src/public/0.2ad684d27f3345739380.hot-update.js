webpackHotUpdate(0,{

/***/ 1282:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(421);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(447);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(448);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(452);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(499);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(337);

	var _NavBar = __webpack_require__(1283);

	var _NavBar2 = _interopRequireDefault(_NavBar);

	var _reactRedux = __webpack_require__(392);

	var _style = __webpack_require__(1289);

	var _style2 = _interopRequireDefault(_style);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	__webpack_require__(908).EventEmitter.setMaxListeners(Infinity); /**
	                                                                *
	                                                                * App.react.js
	                                                                *
	                                                                * This component is the skeleton around the actual pages, and should only
	                                                                * contain code that should be seen on all pages. (e.g. navigation bar)
	                                                                */

	// Import stuff

	var App = function (_Component) {
	  (0, _inherits3.default)(App, _Component);

	  function App() {
	    (0, _classCallCheck3.default)(this, App);
	    return (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || (0, _getPrototypeOf2.default)(App)).apply(this, arguments));
	  }

	  (0, _createClass3.default)(App, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement('div', { className: 'wrapper' }, _react2.default.createElement(_NavBar2.default, { loggedIn: this.props.loggedIn,
	        usersName: this.props.usersName,
	        currentlySending: this.props.currentlySending,
	        history: this.props.history,
	        location: this.props.location,
	        dispatch: this.props.dispatch }), this.props.children, _react2.default.createElement('div', { className: _style2.default.centerStuff }, _react2.default.createElement('p', { className: _style2.default.Footer }, _react2.default.createElement(_reactRouter.Link, { to: '/contactus' }, 'Contact us')), _react2.default.createElement('p', { className: _style2.default.Footer }, '\xA9silk tours inc.')));
	    }
	  }]);
	  return App;
	}(_react.Component);

	App.propTypes = {
	  loggedIn: _react2.default.PropTypes.bool.isRequired,
	  currentlySending: _react2.default.PropTypes.bool,
	  usersName: _react2.default.PropTypes.string,
	  history: _react2.default.PropTypes.object,
	  location: _react2.default.PropTypes.object,
	  children: _react2.default.PropTypes.object,
	  dispatch: _react2.default.PropTypes.func
	};

	// select chooses which props to pull from store
	function select(state) {
	  return {
	    loggedIn: state.AuthReducer.loggedIn,
	    currentlySending: state.AuthReducer.currentlySending,
	    usersName: state.AuthReducer.user.fullName
	  };
	}

	// Wrap the component to inject dispatch and state into it
	exports.default = (0, _reactRedux.connect)(select)(App);

/***/ }

})
