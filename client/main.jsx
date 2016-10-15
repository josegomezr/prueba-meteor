import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import '../imports/startup/accounts-config.js';

import Admin from '../imports/ui/templates/Admin.jsx';
import Public from '../imports/ui/templates/Public.jsx';

import {Router, Route, hashHistory, IndexRoute} from 'react-router';

Meteor.startup(() => {
  render(<Router history={hashHistory}>
          <Route path="/" component={Public.App}>
            <IndexRoute component={Public.Home} />
            <Route path="ver/:contactoId" component={Public.DetalleContacto} />
            <Route path="login" component={Public.Login} />
            <Route path="registro" component={Public.Registro} />
          </Route>
          <Route path="/admin/" component={Admin.App}>
            <IndexRoute component={Admin.Home} />
            <Route path="crear" component={Admin.Crear} />
            <Route path="editar/:contactoId" component={Admin.Editar} />
          </Route>
        </Router>, document.getElementById('startup'));
});