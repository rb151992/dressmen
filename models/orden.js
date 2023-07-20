const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definir el esquema de las ordenes
const ordenSchema = new Schema({
  numeroOrden: Number,
  productos: [{
    titulo: String,
    cantidad: Number,
    precio: Number
  }],
  total: Number
});

// Crear el modelo de las ordenes
const Orden = mongoose.model('Orden', ordenSchema);
// Exportar el modelo
module.exports = Orden;