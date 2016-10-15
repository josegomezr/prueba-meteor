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
    console.log(contacto)
    Meteor.call('contactos.insert', contacto, (error, result) => {
      if (error)
        return console.log(error.reason);
      
      if (result && result.contactoExists){
        console.log('This link has already been posted')
        this.context.router.push('/ver/'+result._id);
        return;
      }

      this.context.router.push('/admin/');
    });
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
  router: PropTypes.object.isRequired
}