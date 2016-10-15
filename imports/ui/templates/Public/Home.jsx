import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import ListaContactos from '../../components/ListaContactos.jsx';
import { Contactos } from '../../../api/contactos.js';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        <ListaContactos contactos={this.props.contactos}/>
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