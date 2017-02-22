import React from 'react';

import PageHeader from 'react-bootstrap/lib/PageHeader';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Button from 'react-bootstrap/lib/Button';
import Pager from 'react-bootstrap/lib/Pager';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      {'  '}
      <FormControl {...props}/>
    </FormGroup>
  );
}

class SearchBar extends React.Component{
  render(){
    return(
      <div>
        <Pager>
          <Form inline>
            <FieldGroup
              id="formControlsText"
              type="text"
              label="Search"
              placeholder="Enter text"/>
            &nbsp;&nbsp;&nbsp;
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Country</ControlLabel>
              {'  '}
              <FormControl componentClass="select" placeholder="select">
                <option value="select">select</option>
                <option value="other">United States</option>
              </FormControl>
            </FormGroup>
            &nbsp;&nbsp;&nbsp;
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>State</ControlLabel>
              {'  '}
              <FormControl componentClass="select" placeholder="select">
                <option value="select">select</option>
                <option value="other">PA</option>
              </FormControl>
            </FormGroup>
            &nbsp;&nbsp;&nbsp;
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>City</ControlLabel>
              {'  '}
              <FormControl componentClass="select" placeholder="select">
                <option value="select">select</option>
                <option value="other">Philadelphia</option>
              </FormControl>
            </FormGroup>
            &nbsp;&nbsp;&nbsp;
            <Button type="submit">
              Search
            </Button>
          </Form>
          <br/>
        </Pager>
      </div>
    );
  }
}

export default SearchBar;
