var express = require('express');

var app = express();

var Producto = require('../models/producto')

// Rutas


// ======================== // Traer todos los productos // ========================
app.get('/', (req, res) => {
    var query = { estado: 1 }
    Producto.find(query)
        .populate('suplidor', 'nombre descripcion')
        .exec((error, productos) => {
            if (error) {
                return res.status(500).json({
                    ok: false,
                    mensaje: "Error al cargar suplidores",
                    errors: error
                })
            }


            res.status(200).json({
                ok: true,
                productos: productos
            })
        })

})



// ======================== // Crear producto // ========================
app.post('/', (req, res) => {


    var body = req.body

    let producto = new Producto({
        nombre: body.nombre,
        codigo: body.codigo,
        suplidor: body.suplidor,
        precio: body.precio,
        unidad: body.unidad,
        descripcion: body.descripcion

    })

    producto.save((error, productoGuardado) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error al guardar producto",
                errors: error
            })
        }
        res.status(201).json({
            ok: true,
            producto: productoGuardado
        })

    })


})

// ======================== // Obtener un producto // ========================

app.get('/:id', (req, res) => {

    var id = req.params.id

    Producto.findById(id, (error, productoDB) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error al buscar producto - Obtener producto",
                errors: error
            })
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                mensaje: "Este producto no existe",
                errors: { mensaje: "No existe este producto" }
            })
        }

        res.status(200).json({
            ok: true,
            producto: productoDB
        })

    })
})

// ======================== // Actualizar un producto // ========================

app.put('/:id', (req, res) => {

        var body = req.body
        var id = req.params.id


        Producto.findById(id, (error, productoDB) => {
            if (error) {
                return res.status(500).json({
                    ok: false,
                    mensaje: "Error al buscar producto - Obtener producto",
                    errors: error
                })
            }

            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "Este producto no existe",
                    errors: { mensaje: "No existe este producto" }
                })
            }

            productoDB.nombre = body.nombre
            productoDB.codigo = body.codigo
            productoDB.suplidor = body.suplidor
            productoDB.descripcion = body.descripcion
            productoDB.precio = body.precio
            productoDB.unidad = body.unidad

            productoDB.save((error, productoActualizado) => {

                if (error) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: "Error al actualizar producto",
                        errors: error
                    })
                }

                res.status(200).json({
                    ok: true,
                    producto: productoActualizado
                })
            })

        })
    })
    // ======================== // Eliminar un producto // ========================


app.delete('/:id', (req, res) => {

    var id = req.params.id

    Producto.findByIdAndUpdate(id, { $set: { estado: 2 } }, (error, productoEliminado) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error al eliminar el producot - eliminar producot",
                errors: error
            })
        }
        if (!productoEliminado) {
            return res.status(400).json({
                ok: false,
                mensaje: "El producto no existe",
                errors: { message: "El no existe el producto" }
            })
        }

        res.status(200).json({
            ok: true,
            producto: productoEliminado
        })


    })

})


module.exports = app