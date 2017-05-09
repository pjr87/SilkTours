import React from 'react';
import style from './style.css';
import {connect} from 'react-redux';
import InfiniteCalendar, {
  Calendar,
  defaultMultipleDateInterpolation,
  withMultipleDates,
} from 'react-infinite-calendar';
import {
  updateSpecialTimeHoursState} from '../../actions/TourCreationActions';
import {Grid, Col, Row, ControlLabel, Pager, FormGroup, Form, FormControl} from 'react-bootstrap';
import moment from 'moment';
import TimePicker from 'react-bootstrap-time-picker';
require('react-datepicker/dist/react-datepicker-cssmodules.css');
const format = 'hh:mm a';
const now = moment().hour(0).minute(0);

class MultiDateSelect extends React.Component{
  constructor(props){
    super(props);

    this.onDateSelect = this.onDateSelect.bind(this)
    this.formatDate = this.formatDate.bind(this)
    this.findDate = this.findDate.bind(this)
    this.handleStartChange = this.handleStartChange.bind(this)
    this.handleEndChange = this.handleEndChange.bind(this)
    this.toHHMMSS = this.toHHMMSS.bind(this)
  }

  formatDate(date) {
    var day = date.getDate();
    var monthIndex = date.getMonth()+1;
    var year = date.getFullYear();

    return year + '-' + monthIndex + '-' + day;
  }

  findDate(date){
    var arrayLength = this.props.hours_special.length;
    for (var i = 0; i < arrayLength; i++) {
      if(this.props.hours_special[i].date == date)
        return i;
    }
  }

  onDateSelect(date){
    let newdate = this.formatDate(date);
    var index = this.props.hours_special_dates.indexOf(newdate);

    var newHoursSpecial = {
      close_time:	 "",
      date:	 newdate,
      open_time:	 "",
      overrides:	 "0"
    };

    if(index >= 0){
      this.props.hours_special_dates.splice(index, 1);
      var hoursIndex = this.findDate(newdate);
      this.props.hours_special.splice(hoursIndex, 1);
    }
    else{
      this.props.hours_special_dates.push(newdate);
      this.props.hours_special.push(newHoursSpecial);
    }

    this.props.emitChange(this.props.hours_special);
    this.props.emitDateChange(this.props.hours_special_dates);
  }

  toHHMMSS(sec_num) {
     var hours   = Math.floor(sec_num / 3600);
     var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
     var seconds = sec_num - (hours * 3600) - (minutes * 60);

     if (hours   < 10) {hours   = "0"+hours;}
     if (minutes < 10) {minutes = "0"+minutes;}
     if (seconds < 10) {seconds = "0"+seconds;}

     return hours+':'+minutes+':'+seconds;
 }

  handleStartChange(i, time) {
    this._emitUserChange({...this.props.hours_special[i], open_time: time});
  }

  handleEndChange(i, time) {
    this._emitUserChange({...this.props.hours_special[i], end_time: time});
  }

  _emitUserChange (newTimeState) {
    this.props.dispatch(updateSpecialTimeHoursState(newTimeState))
  }

  renderDates(){
    return this.props.hours_special.map((hours_special, index) =>
      <li key={index}>
          <p className={style.BodyStyle}>{hours_special.date}</p>
      </li>
    );
  }

  render(){
    var newTheme = {
      accentColor: '#448AFF',
      floatingNav: {
        background: 'rgba(56, 87, 138, 0.94)',
        chevron: '#FFA726',
        color: '#FFF',
      },
      headerColor: '#A799A5',
      selectionColor: '#A799A5',
      textColor: {
        active: '#FFF',
        default: '#333',
      },
      todayColor: '#A799A5',
      weekdayColor: '#A799A5',
    };

    return(
      <div>
        <InfiniteCalendar
          Component={withMultipleDates(Calendar)}
          theme={newTheme}
          interpolateSelection={defaultMultipleDateInterpolation}
          selected={this.props.hours_special_dates}
          displayOptions={{
            showOverlay: true,
            shouldHeaderAnimate: true,
          }}
          onSelect={this.onDateSelect}
        />
      {this.renderDates()}

      </div>
    );
  }
}

MultiDateSelect.propTypes = {
  dispatch: React.PropTypes.func,
  emitChange: React.PropTypes.func,
  emitDateChange: React.PropTypes.func,
  hours_special: React.PropTypes.array,
  hours_special_dates: React.PropTypes.array,
  base_hours: React.PropTypes.array,
  handleStartChange: React.PropTypes.func,
  handleEndChange: React.PropTypes.func
}

function select (state) {
  return {
    hours_special: state.TourCreationReducer.hours_special,
    hours_special_dates: state.TourCreationReducer.hours_special_dates,
    base_hours: state.TourCreationReducer.base_hours,
  };
}

export default connect(select)(MultiDateSelect);

/*

<div>
  <Row>
    <p className={style.BodyStyle}>{hours_special.date}</p>
    <Col sm={3}>
      <TimePicker
        format="12"
        onChange={this.handleStartChange.bind(this,i)}
        value={hours_special.open_time}/>
    </Col>
    <Col sm={3}>
      <TimePicker
        format="12"
        onChange={this.handleEndChange.bind(this,i)}
        value={hours_special.close_time}/>
    </Col>
  </Row>
</div>

*/
