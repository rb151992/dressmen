const express = require('express');
const router = express.Router();
const Orden = require('../models/orden');

// Ruta para guardar una orden de compra
router.post('/', function (req, res) {
  // Obtener los datos de la orden del cuerpo de la solicitud
  let { numeroOrden, productos, total } = req.body;

  // Crear un nuevo documento de orden con los datos recibidos
  let orden = new Orden({
    numeroOrden: numeroOrden,
    productos: productos,
    total: total
  });

  // Guardar el documento en la base de datos
  orden.save()
.then(() => {
  // Mostrar un mensaje de éxito al guardar el documento
  console.log("Orden guardada con éxito");
})
.catch(err => {
  // Manejar los posibles errores al guardar el documento
  console.error(err);
});

});


// Ruta para obtener todas las ordenes guardadas en la base de datos
router.get('/', function (req, res) {
    Orden.find({})
    .then(ordenes => {
      // Mostrar los datos de cada orden en el panel de administración
      res.json(ordenes);
    })
    .catch(err => {
      // Manejar los posibles errores al obtener las ordenes
      console.error(err);
    });
});





module.exports = router;
