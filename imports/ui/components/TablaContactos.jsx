import React, { Component, PropTypes } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default class TablaContactos extends Component {
  render() {
    if (this.props.contactos.length == 0) {
      return (<strong>No hay contactos</strong>);
    }
    let contactos = this.props.contactos.map( (contacto) => {
      return (<tr key={contacto._id}>
          <td>{contacto.nombre}</td>
          <td>{contacto.cedula}</td>
          <td>{contacto.telefono}</td>
          <td>
            <ButtonGroup>
              <LinkContainer to={{pathname: `/admin/editar/${contacto._id}`}}>
                <Button bsStyle="warning">Editar</Button>
              </LinkContainer>
              <Button bsStyle="danger"
                onClick={this.props.onDelete.bind(null, contacto)} >
                Eliminar
              </Button>
            </ButtonGroup>
          </td>
        </tr>);
    });
    return (
      <table className="table table-condensed table-hover table-bordered">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cedula</th>
            <th>Telefono</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {contactos}
        </tbody>
      </table>
    );
  }
}

TablaContactos.defaultProps = {
  onDelete : () => {}
}

TablaContactos.propTypes = {
  contactos: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};

