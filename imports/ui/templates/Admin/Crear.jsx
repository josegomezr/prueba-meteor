import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import FormularioContacto from '../../components/FormularioContacto.jsx';
import { Contactos } from '../../../api/contactos.js';

import { Navbar, NavItem, Nav } from 'react-bootstrap';

export default class Crear extends Component {
  constructor(props){
    super(props);
  }

  crearContacto(contacto){
    Meteor.call('contactos.insert', contacto);
    this.context.router.push('/admin/');
  }

  render() {
    return (
      <div>
        <FormularioContacto onValid={this.crearContacto.bind(this)} />
      </div>
    );
  }
}

Crear.contextTypes = {
  router: React.PropTypes.object.isRequired
}