var mongoose = require('mongoose');
var Unique = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var tipoUsuSchema = new Schema({
    nombre: { type: String, required: [true, "El nombre es requerido"] },
    descripcion: { type: String, required: false, default: null },
    estado: { type: Number, required: false, default: 1 }
})

tipoUsuSchema.plugin(Unique, { mensaje: "El {PATH} debe debe ser unico" })

module.exports = mongoose.model('Tipo_Usu', tipoUsuSchema)