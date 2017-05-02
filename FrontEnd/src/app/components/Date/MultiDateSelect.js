import React from 'react';
import InfiniteCalendar, {
  Calendar,
  defaultMultipleDateInterpolation,
  withMultipleDates,
} from 'react-infinite-calendar';

export default class MultiDateSelect extends React.Component{
  render(){
    var today = new Date();
    var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    return(
      <InfiniteCalendar
        Component={withMultipleDates(Calendar)}
        interpolateSelection={defaultMultipleDateInterpolation}
        selected={[new Date(2017, 1, 10), new Date(2017, 1, 18), new Date()]}
      />
    );
  }
}
/*
*/
