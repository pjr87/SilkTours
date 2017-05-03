import React from 'react';
import InfiniteCalendar, {
  Calendar,
  defaultMultipleDateInterpolation,
  withMultipleDates,
} from 'react-infinite-calendar';

export default class MultiDateSelect extends React.Component{
  constructur(){
    this.onDateSelect = this.onDateSelect.bind(this)

    this.state ={
      selectedDays: [new Date()]
    }
  }

  onDateSelect(date){
    this.state.selectedDays.push(date);
    console.log("You selected", date);
    console.log("Whole list", this.state.selectedDays);
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

    var today = new Date();
    return(
      <InfiniteCalendar
        Component={withMultipleDates(Calendar)}
        theme={newTheme}
        interpolateSelection={defaultMultipleDateInterpolation}
        selected={this.state.selectedDays}
        displayOptions={{
          showOverlay: true,
          shouldHeaderAnimate: true,
        }}
        onSelect={this.onDateSelect}
      />
    );
  }
}
