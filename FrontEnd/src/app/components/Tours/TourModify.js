import React from 'react';
import {EditableField, FormTitle, DoubleEditableField, FormButton} from '../Forms/Forms.js';
import {StopDisplay, MultiDateSelect, Interests} from 'components';
import Form from 'react-bootstrap/lib/Form';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';


export default class TourModify extends React.Component{

  render(){



    return(
      <div>
        <Form horizontal>
          <EditableField label="Tour Name" onChange={this.props.onTourChange} value={this.props.tour.name} id="name" />
          <EditableField label="City" onChange={this.props.onAddressChange} value={this.props.tour.address.city} id="city" />
          <EditableField label="State" onChange={this.props.onAddressChange} value={this.props.tour.address.state_code} id="state_code" />
          <EditableField label="Street" onChange={this.props.onAddressChange} value={this.props.tour.address.street} id="street" />
          <EditableField label="Zip Code" onChange={this.props.onAddressChange} value={this.props.tour.address.zip} id="zip" />
          <EditableField label="Min Group Size" onChange={this.props.onTourChange} value={this.props.tour.min_group_size} id="min_group_size" />
          <EditableField label="Max Group Size" onChange={this.props.onTourChange} value={this.props.tour.max_group_size} id="max_group_size" />
          <EditableField label="Description" onChange={this.props.onTourChange} value={this.props.tour.description} id="description" />
          <EditableField label="Price per Person" onChange={this.props.onTourChange} value={this.props.tour.price} id="price" />
          <EditableField label="Date" onChange={this.props.onTourChange} value={this.props.tour.date} id="date" />
          <EditableField label="Time" onChange={this.props.onTourChange} value={this.props.tour.time} id="time" />
        </Form>
        <Grid>
          <Row>
            <MultiDateSelect />
            <StopDisplay stops={this.props.tour.stops} updateStops={this.props.updateStops} />
            <Interests title="Interest Tags" interests={this.props.tour.interests} onChange={this.props.updateInterests} />
          </Row>
        </Grid>
</div>
    );
  }


}
