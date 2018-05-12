var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED

var app = express();

var Usuario = require('../models/usuario')
    // Rutas


app.post('/', (req, res) => {
    var body = req.body

    Usuario.findOne({ nick: body.nick }, (error, usuarioDB) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error al buscar usuario - Login usuario ",
                errors: error
            })
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: "Credenciales incorrecto - nick ",
                errors: error
            })
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: "Credenciales incorrecto - password ",
                errors: error
            })
        }

        // Crear Token

        var token = jwt.sign({ Usuario: usuarioDB }, SEED, { expiresIn: 14400 })
        usuarioDB.password = "Fuck yourself"
        res.status(200).json({
            ok: true,
            usuarioDB: usuarioDB,
            token: token,
            id: usuarioDB._id
        })
    })
})

module.exports = app