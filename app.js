// Require

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')


// Inicializacion del App
var app = express();

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE,OPTIONS");
    next();
});

// Importar rutas

var appRoutes = require('./routes/app')
var tipoUsuRoutes = require('./routes/tipo_usu')
var usuarioRoutes = require('./routes/usuario')
var loginRoutes = require('./routes/login')
var suplidorRoutes = require('./routes/suplidor')
var productoRoutes = require('./routes/producto')

// parse Body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// Conexion a la base de datos

mongoose.connection.openUri('mongodb://localhost:27017/pruebDB', (error, res) => {

    if (error) throw error;
    console.log("Base de datos: \x1b[32m%s\x1b[0m", "Online")
})



// Rutas

app.use('/producto', productoRoutes)
app.use('/suplidor', suplidorRoutes)
app.use('/tipousu', tipoUsuRoutes)
app.use('/usuario', usuarioRoutes)
app.use('/login', loginRoutes)
app.use('/', appRoutes)



// Puerto de escucha

app.listen(3000, () => {
    console.log("----------------Nuevo inicio----------------")
    console.log("Express working puerto:\x1b[32m%s\x1b[0m", " 3000")
});