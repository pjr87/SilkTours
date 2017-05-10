import React from 'react';


export default class TourInfo extends React.Component{



  render(){


    return(<div >
      <h4>{"Tourid:"+this.props.tour.id_tour}</h4>
      start time: {this.props.tour.start_date_time}<br/>
      end time: {this.props.tour.end_date_time}<br/>
      tour event id: {this.props.tour.id_tourEvent}<br/>
      <br/>
      </div>
    );
  }
}
