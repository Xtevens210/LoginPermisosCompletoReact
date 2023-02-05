const mongoose = require('mongoose');
const { Schema } = mongoose;


//Creamos el esquema.
const loginSquema = new Schema({
    usuario: { type: String, required: true},
    contraseña: { type: String, required: true},
    permisos: { type: String, default: []}
},{versionKey: false})


//Creacion del modelo
module.exports = mongoose.model('usuarios', loginSquema, 'usuarios');