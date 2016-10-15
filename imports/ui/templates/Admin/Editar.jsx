import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import FormularioContacto from '../../components/FormularioContacto.jsx';
import { Contactos } from '../../../api/contactos.js';

import { Navbar, NavItem, Nav } from 'react-bootstrap';

class Editar extends Component {
  constructor(props){
    super(props);
  }

  editarContacto(contacto){
    Meteor.call('contactos.update', this.props.contacto._id, contacto);
    this.context.router.push('/admin/');
  }

  render() {
    console.log(this.props.contacto);
    if (!this.props.contacto) {
      return (<strong>Cargando...</strong>);
    }
    return (
      <div>
        <FormularioContacto contacto={this.props.contacto} onValid={this.editarContacto.bind(this)} />
      </div>
    );
  }
}

Editar.contextTypes = {
  router: React.PropTypes.object.isRequired
}

Editar.propTypes = {
  contacto: PropTypes.object
}

export default createContainer(({params}) => {
  Meteor.subscribe('contactos');
  return {
    contacto: Contactos.findOne(params.contactoId)
  }
}, Editar)
