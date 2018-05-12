var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');



var mdAutenticacion = require('../middleware/autenticacion')

var Usuario = require('../models/usuario')

var app = express();



// Rutas
// ======================== // Traer usuarios // ========================
app.get('/', (req, res) => {

    var query = { estado: 1 }
    Usuario.find(query, 'nombre nick tipo estado')
        .populate('tipo', 'nombre')
        .exec((error, usuarioDB) => {
            if (error) {
                return res.status(500).json({
                    ok: false,
                    mensaje: "Error al cargar usuarios",
                    errors: error
                })
            }

            res.status(200).json({
                ok: true,
                usuarioDB: usuarioDB
            })
        })

})



// ======================== // Crear usuarios // ========================

app.post('/', mdAutenticacion.VerificarToken, (req, res) => {

    var body = req.body

    var usuario = new Usuario({
        nombre: body.nombre,
        nick: body.nick,
        password: bcrypt.hashSync(body.password, 10),
        tipo: body.tipo
    })

    usuario.save((error, usuarioGuardado) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error al guardar usuario",
                errors: error
            })
        }

        usuarioGuardado.password = "fuck yourself"
        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado,
            usuarioToken: req.usuario
        })
    })
})

// ======================== // Obtener un usuario // ========================

app.get('/:id', mdAutenticacion.VerificarToken, (req, res) => {

    var id = req.params.id

    Usuario.findById(id)
        .populate('tipo', 'nombre')
        .exec((error, UsuarioDB) => {

            if (error) {
                return res.status(500).json({
                    ok: false,
                    mensaje: "Error al buscar usuario - Obtener usuario",
                    errors: error
                })
            }

            if (!UsuarioDB) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "El usuario no existe",
                    errors: { message: "El no existe el usuario" }
                })
            }

            res.status(200).json({
                ok: true,
                usuario: UsuarioDB
            })

        })

})


// ======================== // Actualizar un usuario // ========================

app.put('/:id', mdAutenticacion.VerificarToken, (req, res) => {

    var body = req.body
    var id = req.params.id


    Usuario.findById(id, (error, usuarioDB) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error al buscar usuario - Actualizar usuario",
                errors: error
            })
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: "El usuario no existe",
                errors: { message: "El no existe el usuario" }
            })
        }

        usuarioDB.nombre = body.nombre
        usuarioDB.nick = body.nick
        usuarioDB.tipo = body.tipo


        usuarioDB.save((error, usuariActualizado) => {
            if (error) {
                return res.status(500).json({
                    ok: false,
                    mensaje: "Error al actualizar usuario - Actualizar usuario",
                    errors: error
                })
            }

            res.status(200).json({
                ok: true,
                usuario: usuariActualizado
            })

        })
    })

})


// ======================== // Elimianr un usuario // ========================

app.delete('/:id', mdAutenticacion.VerificarToken, (req, res) => {

    var id = req.params.id

    Usuario.findByIdAndUpdate(id, { $set: { estado: 2 } }, (error, usuarioEliminado) => {

        if (error) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error al eliminar el usuario - eliminar usuario",
                errors: error
            })
        }
        if (!usuarioEliminado) {
            return res.status(400).json({
                ok: false,
                mensaje: "El usuario no existe",
                errors: { message: "El no existe el usuario" }
            })
        }

        res.status(200).json({
            ok: true,
            usuario: usuarioEliminado
        })

    })


})


// ======================== // buscar  usuario // ========================



module.exports = app