import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Navbar, NavItem, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  componentWillMount() {
    if (this.props.ready && !this.props.currentUser) {
      this.context.router.push('/login');
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.ready && !this.props.currentUser) {
      this.context.router.push('/login');
    }
  }
  logout(){
    Meteor.logout()
    this.context.router.push('/');
  }
  render() {
    return (
      <div>
        <Navbar inverse staticTop>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/admin/">Admin Panel</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav pullRight>
            <NavItem eventKey={1}>{this.props.currentUser ? this.props.currentUser.username : 'cargando...'}</NavItem>
            <NavItem eventKey={2} onClick={this.logout.bind(this)}>Salir</NavItem>
          </Nav>
        </Navbar>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}


App.contextTypes = {
  router: PropTypes.object.isRequired,
}

App.propTypes = {
  ready: PropTypes.bool.isRequired,
  currentUser: PropTypes.object
};

export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
    ready: !Meteor.loggingIn()
  };
}, App);