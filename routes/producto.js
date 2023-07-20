// Importar módulos
const express = require('express');
const mongoose = require('mongoose');
const Producto = require('../models/producto');
// Crear el router
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'img/' });



router.post('/producto', upload.single('imagen'), (req, res) => {
  // Get the new product data from the request body
  const { id, titulo, categoria, precio } = req.body;
  const imagenFile = req.file;

  // Store the uploaded image file
  const imagenPath = `/img/${imagenFile.originalname}`;
  fs.rename(imagenFile.path, imagenPath, (err) => {
    if (err) {
      return res.status(500).send('Error al guardar la imagen');
    }

    // Create a new product with the given data
    const producto = { id, titulo, imagen: imagenPath, categoria, precio };
    Producto.create(producto)
      .then(doc => {
        // Send the created document as JSON
        res.json(doc);
      })
      .catch(error => {
        // Send an error message
        res.status(500).send('Error al guardar el producto');
      });
  });
});

router.post('/api/products', upload.single('imagen'), (req, res) => {
  // Get the new product data from the request body
  const { id, titulo, categoria, precio } = req.body;
  const imagenFile = req.file;

  // Store the uploaded image file
  const imagenPath = `img/${imagenFile.originalname}`;
  fs.rename(imagenFile.path, imagenPath, (err) => {
    if (err) {
      return res.status(500).send('Error al guardar la imagen');
    }

    // Create a new product with the given data
    const producto = { id, titulo, imagen: imagenPath, categoria, precio };
    Producto.create(producto)
      .then(doc => {
        // Send the created document as JSON
        res.json(doc);
      })
      .catch(error => {
        console.error(error);
        // Send an error message
        res.status(500).send('Error al guardar el producto');
      });
  });
});

  // Definir la ruta para obtener todos los productos
router.get('/products', (req, res) => {
  console.log('obteniendo productos...');
    // Buscar todos los productos en la base de datos
    Producto.find()
      .then(productos => {
        // Enviar los productos como JSON
        res.json(productos);
      })
      .catch(error => {
        // Enviar un mensaje de error
        res.status(500).send('Error al obtener los productos');
      });
  });
  

  
  // ...

// Definir la ruta para eliminar un producto
router.delete('/producto/:id', (req, res) => {
  // Obtener el ID del producto a eliminar
  const id = req.params.id;
  // Agregar un registro para mostrar el valor de req.params.id
  console.log('ID del producto a eliminar:', id);
  // Eliminar el producto de la base de datos
  Producto.findByIdAndDelete(id)
    .then(() => {
      // Enviar una respuesta vacía
      res.status(204).send();
    })
    .catch(error => {
      // Enviar un mensaje de error
      res.status(500).send('Error al eliminar el producto');
    });
});

// Definir la ruta para actualizar un producto
router.put('/producto/:id', (req, res) => {
  // Obtener el ID del producto a actualizar
  const id = req.params.id;
  // Obtener los datos del producto a actualizar
  const producto = req.body;
  // Actualizar el producto en la base de datos
  Producto.findByIdAndUpdate(id, producto)
    .then(() => {
      // Enviar una respuesta vacía
      res.status(204).send();
    })
    .catch(error => {
      // Enviar un mensaje de error
      res.status(500).send('Error al actualizar el producto');
    });
});





// en caso de borrar la base de datos,
// usar esta ruta y cambiar la url del main 
// a la del json.
/*router.post('/producto', (req, res) => {
  // Obtener los datos del nuevo producto del cuerpo de la solicitud
  const { id, titulo, imagen, categoria, precio } = req.body;

  // Crear un nuevo producto con los datos proporcionados
  const producto = { id, titulo, imagen, categoria, precio };
  Producto.create(producto)
    .then(doc => {
      // Enviar el documento creado como JSON
      res.json(doc);
    })
    .catch(error => {
      // Enviar un mensaje de error
      res.status(500).send('Error al guardar el producto');
    });
});
*/





































//crear producto






// ...


 /* // Importar el modelo de producto
const Producto = require('../models/producto');

// Crear una ruta PUT para actualizar los productos
router.put('/producto/:id', async (req, res) => {
  // Obtener el id del producto desde el parámetro de la ruta
  let id = req.params.id;

  // Obtener el nuevo precio desde el cuerpo de la petición
  let nuevoPrecio = req.body.precio;

  // Buscar y actualizar el producto por su id usando Mongoose
  try {
    let productoActualizado = await Producto.findByIdAndUpdate(id, { precio: nuevoPrecio }, { new: true });
    // Si no hay error, enviar una respuesta con el producto actualizado
    res.status(200).json(productoActualizado);
  } catch (error) {
    // Si hay un error al actualizar el producto, enviar un mensaje de error
    res.status(500).send('Error al actualizar el producto');
  }
});*/


/*
// Importar multer
const multer = require("multer");

// Configurar multer para guardar los archivos en una carpeta llamada uploads
const upload = multer({ dest: "uploads/" });

// Definir la ruta para recibir los datos del formulario
router.post("/producto", upload.single("imagen"), (req, res) => {
  // Obtener los datos del formulario que vienen en el cuerpo de la petición
  const producto = req.body;
  // Obtener el archivo de imagen que viene en la petición
  const imagen = req.file;
  // Crear un documento con el modelo Producto usando los datos del formulario y el archivo
  Producto.create(producto, imagen)
    .then((doc) => {
      // Enviar el documento creado como JSON
      res.json(doc);
    })
    .catch((error) => {
      // Enviar un mensaje de error
      res.status(500).send("Error al guardar el producto");
    });
});
*/


/*const multer = require('multer');


// Set up Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

// Set up the file upload route
router.post('/upload', upload.single('imagen'), (req, res) => {
  // Generate a URL that points to the uploaded file
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

  // Send the URL back to the client
  res.json({ imageUrl });
});

module.exports = router;
*/

  // Exportar el router
  module.exports = router;
  







































