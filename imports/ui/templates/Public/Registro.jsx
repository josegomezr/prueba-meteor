import React, { Component, PropTypes } from 'react';
import { Accounts } from 'meteor/accounts-base'
import { browserHistory } from 'react-router'
import { Meteor } from 'meteor/meteor';
import { FormGroup, Button, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

export default class Registro extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      registerError: false,
      validationError: false
    }

    this.validations = {
      username: (input) => /^[a-z0-9_]{4,}$/i.test(input),
      password: (input) => input.length > 6
    }
  }

  validate(event){
    event.preventDefault();
    var valid = ['username', 'password'].map((e) => {
      return this.validations[e](this.state[e])
    }).reduce((curr, next) => curr && next, true);

    let state = this.state;
    state.validationError = !valid;
    this.setState(state);
    if (!valid)
      return;

    Accounts.createUser({
        username: this.state.username,
        password: this.state.password 
      }, (error) => {
        if (error) {
          this.state.registerError = 'auth';
        } else {
          this.context.router.push('/login');
        }
      });
  }

  handleChange(name, event){
    let state = this.state;
    state[name] = event.target.value;
    this.setState(state);
  }

  getValidationState(name){
    if(!this.state[name])
      return;
    
    const validation = this.validations[name];
    return validation(this.state[name]) ? 'success' : 'error';
  }

  render() {
    return (
      <div>
        {this.state.registerError ? (
        <div className="alert alert-danger">
          <p>Error de registro</p>
        </div>) : ''}

        {this.state.validationError ? (
        <div className="alert alert-danger">
          <p>Error de validacion</p>
        </div>) : ''}

        <form onSubmit={this.validate.bind(this)}>
          <FormGroup controlId="username" 
            validationState={this.getValidationState('username')}>
            <ControlLabel>Usuario</ControlLabel>
            <FormControl type="text" value={this.state.username} 
              placeholder="Nombre de usuario" 
              onChange={this.handleChange.bind(this, 'username')} />
            <FormControl.Feedback />
          </FormGroup>

          <FormGroup controlId="password"
            validationState={this.getValidationState('password')}>
            <ControlLabel>Clave</ControlLabel>
            <FormControl type="password" value={this.state.password} 
              placeholder="Clave" 
              onChange={this.handleChange.bind(this, 'password')} />
            <FormControl.Feedback />
          </FormGroup>
          <div className="form-group">
            <Button bsStyle="primary" type="submit">Entrar</Button>
          </div>
        </form>
      </div>
    );
  }
}

Registro.contextTypes = {
  router: React.PropTypes.object.isRequired
}