import React, { Component, PropTypes } from 'react';
import { FormGroup, Button, ControlLabel, 
  FormControl, HelpBlock } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';

export default class FormularioContacto extends Component {
  constructor(props) {
    super(props);
    this.state = props.contacto || {};
    this.validations = {
      nombre: (input) => /^[\w\s]{4,}$/i.test(input),
      cedula: (input) => /^[VEJPG]-[0-9]{5,8}$/.test(input),
      telefono: (input) => /^[0-9]{4}-[0-9]{7}$/.test(input)
    }
  }

  validate(event){
    event.preventDefault();
    var valid = ['nombre', 'cedula', 'telefono'].map((e) => {
      return this.validations[e](this.state[e])
    }).reduce((curr, next) => curr && next, true);

    if (valid) {
      this.props.onValid(this.state);
    }
  }
  
  getValidationState(name){
    if(!this.state[name])
      return;
    
    const validation = this.validations[name];
    return validation(this.state[name]) ? 'success' : 'error';
  }

  handleChange(name, event){
    let state = this.state;
    state[name] = event.target.value;
    this.setState(state);
  }
  
  componentWillReceiveProps(newProps){
    this.setState(newProps.contacto);
  }

  render() {
    return (
      <form onSubmit={this.validate.bind(this)}>
          <FormGroup controlId="nombre" 
            validationState={this.getValidationState('nombre')}>
            <ControlLabel>Nombre</ControlLabel>
            <FormControl type="text" value={this.state.nombre} 
              placeholder="Nombre" 
              onChange={this.handleChange.bind(this, 'nombre')} />
            <FormControl.Feedback />
            <HelpBlock>Al menos 4 caracteres.</HelpBlock>
          </FormGroup>

          <FormGroup controlId="cedula"
            validationState={this.getValidationState('cedula')}>
            <ControlLabel>Cedula</ControlLabel>
            <FormControl type="text" value={this.state.cedula} 
              placeholder="Cedula" 
              onChange={this.handleChange.bind(this, 'cedula')} />
            <FormControl.Feedback />
            <HelpBlock>Con el formato <code>X-XXXXXXX</code>.</HelpBlock>
          </FormGroup>

          <FormGroup controlId="telefono"
            validationState={this.getValidationState('telefono')}>
            <ControlLabel>Telefono</ControlLabel>
            <FormControl type="text" value={this.state.telefono} 
              placeholder="Telefono" 
              onChange={this.handleChange.bind(this, 'telefono')} />
            <FormControl.Feedback />
            <HelpBlock>Con el formato <code>0XXX-XXXXXXX</code>.</HelpBlock>
          </FormGroup>

          <div className="form-group">
            <Button bsStyle="primary" type="submit">
            {(this.props.contacto && this.props.contacto._id) ? 'Editar' : 'Crear'}
            </Button>
          </div>
      </form>
    );
  }
}

FormularioContacto.propTypes = {
  onValid: PropTypes.func.isRequired,
  contacto: PropTypes.object
};

