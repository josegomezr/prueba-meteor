import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Navbar, NavItem, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        <Navbar staticTop>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Contactos</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            {this.props.currentUser ? 
              (<LinkContainer to={{pathname: '/admin/'}}>
                <NavItem eventKey={1}>
                  Ir al Admin
                </NavItem>
              </LinkContainer>)
            : 
              [(
                <LinkContainer key={1} to={{pathname: '/login'}}>
                <NavItem eventKey={1}>
                  Login
                </NavItem>
              </LinkContainer>),
              (<LinkContainer key={2} to={{pathname: '/registro'}}>
                <NavItem eventKey={2}>
                  Registro
                </NavItem>
              </LinkContainer>
              )]
            }
          </Nav>
        </Navbar>

        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  currentUser: PropTypes.object
};

export default createContainer(() => {
  return {
    currentUser: Meteor.user()
  };
}, App);