
// Importar módulos
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Crear instancia de la aplicación
const app = express();

// Conectar con la base de datos
(async() => {
  try{
    await mongoose.connect(process.env.MONGO_URI_TEST);
    console.log("conexion valida");
  }catch(error){
      console.log(error);
  }
})();

// Configurar opciones generales
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Importar rutas
const userRoutes = require('./routes/user');
app.use('/api', userRoutes);

const productoRoutes = require('./routes/producto');
app.use(productoRoutes);

// Add logging for requests to the /img route
app.use('/img', (req, res, next) => {
  console.log(`Request for image file: ${req.url}`);
  next();
});


const ordenRouter = require('./routes/orden');
app.use('/orden', ordenRouter);
// Usar rutas
app.use('/',express.static(path.resolve('views','home')));
app.use('/Carrito',express.static(path.resolve('views','carrito')));
app.use('/Registro',express.static(path.resolve('views','registro')));
app.use('/login',express.static(path.resolve('views','login')));
app.use('/img',express.static(path.resolve('img')));
app.use('/admin',express.static(path.resolve('views','admin')));
app.use('/users', userRoutes);
 // Usar el objeto router que exportaste
// Exportar la aplicación
module.exports = app;
