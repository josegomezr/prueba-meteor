import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Contactos } from './contactos.js';
 
if (Meteor.isServer) {
  describe('Contactos', () => {
    describe('methods', () => {
      const userId = Random.id();
      let taskId;
 
      beforeEach(() => {
        Contactos.remove({});
        taskId = Contactos.insert({
          _id: Random.id(),
          nombre: 'prueba 1',
          telefono: '0416-1234567',
          cedula: 'V-1234567'
        });

        Contactos.insert({
          _id: Random.id(),
          nombre: 'prueba 2',
          telefono: '0416-7654321',
          cedula: 'V-7654321'
        });
      });
 
      it('puede listar todos los contactos', () => {
        var contactos = Contactos.find({}).count();
        assert.equal(contactos, 2);
      });

      it('puede crear un contacto', () => {
        const crearContacto = Meteor.server.method_handlers['contactos.insert'];
        var contactoEjemplo = {
          nombre: 'Hanny Kauam',
          cedula: 'V-99994444',
          telefono: '0123-5544221'
        };

        crearContacto.apply(null, [contactoEjemplo]);

        var contactos = Contactos.find({}).count();
        assert.equal(contactos, 3);
      });

    });
  });
}