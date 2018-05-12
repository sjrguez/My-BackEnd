var mongoose = require('mongoose');

var Unique = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    nombre: { type: String, required: [true, "El nombre es requerido"] },
    nick: { type: String, unique: true, required: [true, "El nick es requerido"] },
    password: { type: String, required: [true, "El password es requerido"] },
    tipo: { type: Schema.Types.ObjectId, ref: 'Tipo_Usu', required: [true, "El tipo de usuario es requerido"] },
    estado: { type: Number, required: false, default: 1 }
})

usuarioSchema.plugin(Unique, { message: "El {PATH} debe ser unico" })

module.exports = mongoose.model('Usuario', usuarioSchema);