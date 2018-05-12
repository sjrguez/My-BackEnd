var express = require('express');
var jwt = require('jsonwebtoken');



var mdAutenticacion = require('../middleware/autenticacion')
var app = express();

var TipoUsu = require('../models/tipo_usu')


// ======================== // Traer tipos de usuarios // ========================

app.get('/', (req, res, next) => {

    var query = { estado: 1 }
    TipoUsu.find(query, (error, tipoDB) => {

        if (error) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error al cargar tipos de usuarios",
                errors: error
            })
        }

        res.status(200).json({
            ok: true,
            tipoDB: tipoDB
        })
    })
})



// ======================== // Agregar tipo de usu// ========================

app.post('/', mdAutenticacion.VerificarToken, (req, res) => {

        var body = req.body

        var tipo_usu = new TipoUsu({
            nombre: body.nombre,
            descripcion: body.descripcion
        })


        tipo_usu.save((error, tipoGuardado) => {
            if (error) {
                return res.status(500).json({
                    ok: false,
                    mensaje: "Error al guardar el tipo de usuario",
                    errors: error
                })
            }
            res.status(201).json({
                ok: true,
                tipoGuardado: tipoGuardado
            })

        })

    })
    // ======================== // Obtener tipo de usuario // ========================

app.get('/:id', mdAutenticacion.VerificarToken, (req, res) => {
    var id = req.params.id

    TipoUsu.findById(id, (error, tipousuDB) => {

        if (error) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error buscar el tipo de usuario - Obtener tipo",
                errors: error
            })

        }
        if (!tipousuDB) {
            return res.status(400).json({
                ok: false,
                mensaje: "Este tipo de usuario no existe",
                errors: { mensaje: "No existe este tipo de usuario" }
            })
        }

        res.status(200).json({
            ok: true,
            tipousuDB: tipousuDB
        })
    })


})


// ======================== // Actualizar tipo de usuario // ========================


app.put('/:id', mdAutenticacion.VerificarToken, (req, res) => {

    var id = req.params.id
    var body = req.body
    TipoUsu.findById(id, (error, tipo_usu) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error buscar el tipo de usuario - Actualizar tipo",
                errors: error
            })

        }

        if (!tipo_usu) {
            return res.status(400).json({
                ok: false,
                mensaje: "Este tipo de usuario no existe",
                errors: { mensaje: "No existe este tipo de usuario" }
            })
        }

        tipo_usu.nombre = body.nombre

        tipo_usu.save((error, tipoActualizado) => {
            if (error) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "Error actualizar el tipo de usuario",
                    errors: error
                })

            }
            res.status(200).json({
                ok: true,
                tipoActualizado: tipoActualizado
            })
        })

    })


})

// ======================== // Eliminar tipo de usuario // ========================

app.delete('/:id', mdAutenticacion.VerificarToken, (req, res) => {
    var id = req.params.id

    TipoUsu.findByIdAndUpdate(id, { $set: { estado: 2 } }, (error, tipoEliminado) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error buscar el tipo de usuario - eliminar tipo",
                errors: error
            })
        }


        if (!tipoEliminado) {
            return res.status(400).json({
                ok: false,
                mensaje: "Este tipo de usuario no existe",
                errors: { mensaje: "No existe este tipo de usuario" }
            })
        }

        res.status(200).json({
            ok: true,
            tipoEliminado: tipoEliminado
        })
    })

})





module.exports = app