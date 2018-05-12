var express = require('express');

var app = express();

// Rutas


app.get('/', (req, res) => {

    res.status(200).json({
        ok: true,
        mensaje: "Prueba tres"
    })
})

module.exports = app