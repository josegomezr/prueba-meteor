import React, { Component, PropTypes } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Contactos } from '../../../api/contactos.js';
import { LinkContainer } from 'react-router-bootstrap';

class DetalleContacto extends Component {
  render() {
    if (!this.props.ready) {
      return (<span>waiting</span>)
    }

    return (
      <div className="container-contacto">
        <dl>
          <dt>Nombre</dt>
          <dd>{this.props.contacto.nombre}</dd>
          <dt>Cedula</dt>
          <dd>{this.props.contacto.cedula}</dd>
          <dt>Telefono</dt>
          <dd>{this.props.contacto.telefono}</dd>
        </dl>
        <LinkContainer to={{pathname: '/'}} onlyActiveOnIndex={true}>
          <Button>Atras</Button>
        </LinkContainer>
      </div>
    );
  }
}

DetalleContacto.propTypes = {
  contacto: PropTypes.object,
  ready: PropTypes.bool.isRequired
};

export default createContainer(({params}) => {
  return {
    ready: Meteor.subscribe('contacto', params.contactoId).ready(),
    contacto: Contactos.findOne(params.contactoId)
  };
}, DetalleContacto);