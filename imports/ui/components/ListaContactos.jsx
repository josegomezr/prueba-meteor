import React, { Component, PropTypes } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { LinkContainer } from 'react-router-bootstrap';

export default class ListaContactos extends Component {
  render() {
    if (this.props.contactos.length == 0) {
      return (<strong>No hay contactos</strong>);
    }
    let contactos = this.props.contactos.map( (contacto) => {
      let title = (<h4>
        {contacto.nombre} - <small>{contacto.cedula}</small>
        </h4>
      );
      return (<LinkContainer to={{pathname: `/ver/${contacto._id}`}} 
        key={contacto._id}>
          <ListGroupItem header={title} href="#">
            {contacto.telefono}
          </ListGroupItem>
        </LinkContainer>);
    });
    return (
      <ListGroup className="container-lista-contacto">
        {contactos}
      </ListGroup>
    );
  }
}

ListaContactos.propTypes = {
  contactos: PropTypes.array.isRequired
};

