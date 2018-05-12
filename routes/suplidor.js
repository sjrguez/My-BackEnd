var express = require('express');
var jwt = require('jsonwebtoken');



var mdAutenticacion = require('../middleware/autenticacion')
var app = express();

var Suplidor = require('../models/suplidor')




// ======================== // Traer todos los suplidores // ========================

app.get('/', (req, res) => {

    var query = { estado: 1 }
    Suplidor.find(query, (error, suplidoresDB) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error al cargar suplidores",
                errors: error
            })
        }
        res.status(200).json({
            ok: true,
            suplidores: suplidoresDB
        })



    })
})


// ======================== // Crear suplidor // ========================
app.post('/', (req, res) => {

    var body = req.body

    var suplidor = new Suplidor({
        nombre: body.nombre,
        descripcion: body.descripcion
    })

    suplidor.save((error, suplidorGuardado) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error al guardar suplidor",
                errors: error
            })
        }
        res.status(201).json({
            ok: true,
            suplidor: suplidorGuardado
        })

    })

})

// ======================== // Obtener un suplidor // ========================

app.get('/:id', (req, res) => {

    var id = req.params.id

    Suplidor.findById(id, (error, suplidorDB) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error al obtener el suplidor - obtener suplidor",
                errors: error
            })
        }

        if (!suplidorDB) {
            return res.status(400).json({
                ok: false,
                mensaje: "Este suplidor no existe",
                errors: { mensaje: "No existe este suplidor" }
            })
        }

        res.status(200).json({
            ok: true,
            suplidor: suplidorDB
        })

    })
})


// ======================== // Actualizar suplidor // ========================


app.put('/:id', (req, res) => {

    var id = req.params.id
    var body = req.body


    Suplidor.findById(id, (error, suplidorDB) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                mensaje: "Error al actualizar el suplidor - actualizar suplidor",
                errors: error
            })
        }

        if (!suplidorDB) {
            return res.status(400).json({
                ok: false,
                mensaje: "Este suplidor no existe",
                errors: { mensaje: "No existe este suplidor" }
            })
        }

        suplidorDB.nombre = body.nombre
        suplidorDB.descripcion = body.descripcion

        suplidorDB.save((error, suplidorActualizado) => {
            if (error) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "No se puede modificar el suplidor",
                    errors: error
                })
            }
            res.status(200).json({
                ok: true,
                suplidor: suplidorActualizado
            })
        })
    })

})

// ======================== // Eliminar suplidor // ========================

app.delete('/:id', (req, res) => {

    var id = req.params.id

    Suplidor.findByIdAndUpdate(id, { $set: { estado: 2 } }, (error, suplidorEliminado) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                mensaje: "Error al eliminar el suplidor - eliminar suplidor",
                errors: error
            })
        }

        if (!suplidorEliminado) {
            return res.status(400).json({
                ok: false,
                mensaje: "El suplidor no existe",
                errors: { message: "El no existe el suplidor" }
            })
        }

        res.status(200).json({
            ok: true,
            suplidor: suplidorEliminado
        })
    })

})

module.exports = app