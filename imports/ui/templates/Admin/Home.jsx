import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import TablaContactos from '../../components/TablaContactos.jsx';
import { Contactos } from '../../../api/contactos.js';

import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  deleteContacto(contacto){ 
    Meteor.call('contactos.remove', contacto._id);
  }

  render() {
    return (
      <div>
        <div className="pull-right">
          <LinkContainer to={{pathname: '/admin/crear'}}>
            <Button bsStyle="info">Crear Contacto</Button>
          </LinkContainer>
        </div>
        <div className="clearfix" />
        <br />
        <TablaContactos
          onDelete={this.deleteContacto.bind(this)} 
          contactos={this.props.contactos}
        />
      </div>
    );
  }
}

Home.propTypes = {
  contactos: PropTypes.array.isRequired
};

export default createContainer(() => {
  Meteor.subscribe('contactos');
  return {
    contactos: Contactos.find({}).fetch()
  };
}, Home);