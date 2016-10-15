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

    if (!nombre || !cedula || !telefono) 
      return console.log("hay campos que no son validados")

    if (!this.userId) 
      return console.log("usted no esta logueado");

    var cedulaExit = Contactos.findOne({cedula: cedula});
    if (cedulaExit) {
      return {
        contactoExists: true,
        _id: cedulaExit._id
      }
    }

    Contactos.insert({
      _id: Random.id(),
      nombre,
      cedula,
      telefono
    });
  },
  'contactos.update': function (contactoId, {nombre, cedula, telefono}) {
    check(nombre, String);
    check(cedula, String);
    check(telefono, String);

    if (!this.userId) 
      return console.log("usted no esta logueado");

    if (!nombre || !cedula || !telefono) 
      return console.log("hay campos que no son validados")
     var contacto = Contactos.findOne({_id: contactoId});

     if(contacto.cedula!=cedula){
      var cedulaExit = Contactos.findOne({cedula: cedula});
    if (cedulaExit) {
      return console.log("la cedula que trata de modificar existe")
    }
     }

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
    if (!this.userId) 
      return console.log("usted no esta logueado");
    Contactos.remove(contactoId)
  }
})