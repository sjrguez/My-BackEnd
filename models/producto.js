var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Unique = require('mongoose-unique-validator');

productoSchema = new Schema({
    nombre: { type: String, required: [true, "El nombre es requerido"] },
    codigo: { type: String, unique: true, required: [true, "El codigo es requerido"] },
    suplidor: { type: Schema.Types.ObjectId, ref: 'Suplidor', required: [true, "El suplidor es requerido"] },
    precio: { type: Number, required: [true, "El precio es requeriodo"] },
    unidad: { type: String, required: [true, "La unidad es necesaria"] },
    descripcion: { type: String, required: false, default: null },
    estado: { type: Number, required: false, default: 1 }
})

productoSchema.plugin(Unique, { message: "El {PATH} debe ser unico" })

module.exports = mongoose.model('Producto', productoSchema)