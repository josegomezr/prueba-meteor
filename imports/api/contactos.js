import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {Random} from 'meteor/random';
import {check} from 'meteor/check';

export const Contactos = new Mongo.Collection('Contactos');


if (Meteor.isServer) {
  Meteor.publish('contactos', function ContactoPublication(){
    return Contactos.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId }
      ]
    });
  })

  Meteor.publish('contacto', function ContactoPublication(contactoId){
    return Contactos.find(contactoId);
  })
}

Meteor.methods({
  'contactos.insert': function ({nombre, cedula, telefono}) {
    check(nombre, String);
    check(cedula, String);
    check(telefono, String);

    Contactos.insert({
      _id: Random.id(),
      nombre,
      cedula,
      telefono
    });
  },
  'contactos.search': function (criteria) {
    check(criteria, String);

    return Contactos.find({
      $or:[
        {'nombre': {$regex: criteria}},
        {'cedula': {$regex: criteria}},
        {'telefono': {$regex: criteria}}
      ]
    });
  },
  'contactos.update': function (contactoId, {nombre, cedula, telefono}) {
    check(nombre, String);
    check(cedula, String);
    check(telefono, String);

    Contactos.update(contactoId, {
      $set: {
        nombre,
        cedula,
        telefono
      }
    });
  },
  'contactos.remove': function(contactoId) {
    check(contactoId, String);
    //const Contacto = Contactos.findOne(contactoId);
    Contactos.remove(contactoId)
  }
})