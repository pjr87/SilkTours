import React from 'react';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // Make sure to import the default stylesheet

export default class MultiDateSelect extends React.Component{

  render(){

    var today = new Date();

    return(
      <InfiniteCalendar
        width={400}
        height={600}
        selectedDates={[today]}
        disabledDays={[0,6]}
        keyboardSupport={true}
      />
    );
  }

}
