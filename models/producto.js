

// Importar mongoose
const mongoose = require('mongoose');

// Definir el schema del producto
const productoSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  titulo: {
    type: String,
    required: true
  },
  imagen: {
    type: String,
    required: true
  },
  categoria: {
    nombre: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  precio: { // Agregar el campo price al esquema
    type: Number,
    required: true
  }
});

// Crear el modelo del producto
const Producto = mongoose.model('Producto', productoSchema);

// Exportar el modelo
module.exports = Producto;
