var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var suplidorSchema = new Schema({
    nombre: { type: String, required: [true, "El nombre es requerido"] },
    descripcion: { type: String, required: false, default: null },
    estado: { type: Number, required: false, default: 1 }

}, { collection: 'suplidores' })

module.exports = mongoose.model('Suplidor', suplidorSchema);