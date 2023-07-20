let productos = [];
//console.log(productos)
document.addEventListener('DOMContentLoaded', () => {
  // Obtener referencias a los elementos del botón, del formulario y del main
  const botonMostrarFormulario = document.getElementById('mostrar-formulario');
  const createForm = document.getElementById('create-form');
  const main = document.querySelector('main');

  // Agregar manejador de eventos al botón para mostrar el formulario
  botonMostrarFormulario.addEventListener('click', () => {
    // Eliminar el contenido del main y mostrar solo el formulario
    main.innerHTML = '';
    main.appendChild(createForm);
    createForm.style.display = 'block';
    createForm.style.display = "flex";
    createForm.style.flexDirection = "column";
    createForm.style.justifyContent = "center";
    createForm.style.alignItems = "center"; 
  });
});
const botonTodos = document.querySelector("#todos");
botonTodos.addEventListener("click", () => {
  // Recargar la página 
  location.reload();
});

const botonMostrarOrdenes = document.querySelector("#mostrar-ordenes");
const main = document.querySelector("main");

botonMostrarOrdenes.addEventListener("click", () => {
  // Eliminar el contenido del main y mostrar solo las ordenes
  main.innerHTML = '';

  // Hacer una solicitud GET al servidor para obtener las ordenes guardadas en la base de datos
  fetch('/orden')
  .then(response => response.json())
  .then(ordenes => {
    // Mostrar los datos de cada orden en el panel de administración
    for (let orden of ordenes) {
      // Mostrar el número de orden, los productos y el total en el panel de administración
      // Aquí puedes usar el método que prefieras para mostrar los datos en el HTML, por ejemplo, innerHTML, appendChild, etc.
      // Para este ejemplo, vamos a usar innerHTML
      main.innerHTML += `
        <div class="orden">
          <h3>Número de orden: ${orden.numeroOrden}</h3>
          <ul class="productos">
            ${orden.productos.map(producto => `
              <li>${producto.titulo} x ${producto.cantidad} = $${producto.precio * producto.cantidad}</li>
            `).join("")}
          </ul>
          <p>Total: $${orden.total}</p>
        </div>
      `;
    }
  })
  .catch(error => {
    console.error(error);
  });
});



async function fetchProducts() {
  try {
    // Fetch data from the server
    const response = await fetch('/products'); 
    const products = await response.json();
    
    // Update the productos array
    productos = products;

    // Display the data on the page
    const productList = document.getElementById('product-list');
    products.forEach(product => {
      const productElement = document.createElement('div');
      productElement.innerHTML = `
        
        <img class="producto-imagen" src="/${product.imagen}" alt="${product.titulo}">
        <div class="producto-detalles">
        <h2 class="producto-titulo">${product.titulo}</h2>
        <p class="producto-titulo">Categoria: ${product.categoria.nombre}</p>
        <p class="producto-precio">Precio: ${product.precio}</p>
        <button class="delete-button producto-agregar" data-id="${product._id}">Eliminar</button>
        <button class="update-button producto-agregar" data-id="${product._id}">Actualizar</button>
        </div>
        `;
      productList.appendChild(productElement);
    });

    // Eventos botones de borrar
    document.querySelectorAll('.delete-button').forEach(button => {
      button.addEventListener('click', event => {
        const id = event.target.dataset.id;
        deleteProduct(id);
      });
    });

    // eventos  botones de actualizacion
    document.querySelectorAll('.update-button').forEach(button => {
      button.addEventListener('click', event => {
        const id = event.target.dataset.id;
        showUpdateForm(id);
      });
    });
  } catch (error) {
    console.error('Error actualizando productos:', error);
  }
}

async function deleteProduct(_id) {
  try {
    // Log the value of _id
    console.log('ID del producto a eliminar:', _id);

    // Mostrar un diálogo de confirmación utilizando Swal
    Swal.fire({
      title: '¿Estás seguro?',
      icon: 'question',
      html: `Se va a borrar el producto con ID ${_id}.`,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma la acción, eliminar el producto del servidor
        const response = await fetch(`/producto/${_id}`, { method: 'DELETE' });

        // respuesta del servidor
        console.log('Respuesta del servidor:', response);

        // Mostrar una notificación 
        Toastify({
          text: "Producto eliminado",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
          style: {
            background: "linear-gradient(to right, #4b33a8, #785ce9)",
            borderRadius: "2rem",
            textTransform: "uppercase",
            fontSize: ".75rem"
          },
          offset: {
            x: '1.5rem',
            y: '1.5rem'
          },
          onClick: function(){}
        }).showToast();

        setTimeout(() => {
          location.reload();
        }, 3000); 
      }
    });
  } catch (error) {
    console.error('Error deleting product:', error);
  }
}


function showUpdateForm(id) {
  
  const product = productos.find(product => product._id === id);

  
  document.getElementById('update-form-id').value = product._id;
  document.getElementById('update-form-titulo').value = product.titulo;
  document.getElementById('update-form-imagen').value = product.imagen;
  document.getElementById('update-form-categoria-nombre').value = product.categoria.nombre;
  document.getElementById('update-form-categoria-id').value = product.categoria.id;
  document.getElementById('update-form-precio').value = product.precio;

  
  document.getElementById('update-form').style.display = 'block';
}

async function submitUpdateForm(event) {
  event.preventDefault();


  const id = document.getElementById('update-form-id').value;
  const titulo = document.getElementById('update-form-titulo').value;
  const imagen = document.getElementById('update-form-imagen').value;
  const categoriaNombre = document.getElementById('update-form-categoria-nombre').value;
  const categoriaId = document.getElementById('update-form-categoria-id').value;
  const precio = document.getElementById('update-form-precio').value;

  
  const updatedProduct = { 
    titulo, 
    imagen, 
    categoria: { nombre: categoriaNombre, id: categoriaId }, 
    precio 
  };

  try {
    // Actualizar el producto en el servidor
    await fetch(`/producto/${id}`, { 
      method: 'PUT',
      body: JSON.stringify(updatedProduct),
      headers: { 'Content-Type': 'application/json' }
    });

    
    document.getElementById('update-form').style.display = 'none';

    // cargar productos
    fetchProducts();
  } catch (error) {
    console.error('Error updating product:', error);
  }
}

async function submitCreateForm(event) {
  event.preventDefault();

  
  const id = document.getElementById('create-form-id').value;
  const titulo = document.getElementById('create-form-titulo').value;
  const imagenFile = document.getElementById('create-form-imagen').files[0];
  const categoriaNombre = document.getElementById('create-form-categoria-nombre').value;
  const categoriaId = document.getElementById('create-form-categoria-id').value;
  const precio = document.getElementById('create-form-precio').value;

  
  const formData = new FormData();
  formData.append('id', id); 
  formData.append('titulo', titulo);
  formData.append('imagen', imagenFile);
  formData.append('categoria[nombre]', categoriaNombre);
  formData.append('categoria[id]', categoriaId);
  formData.append('precio', precio);

  try {
    // Crear el nuevo producto en el servidor
    await fetch('/api/products', { 
      method: 'POST',
      body: formData
    });

    // Mostrar una notificación utilizando Toastify
    Toastify({
      text: "Producto agregado",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #4b33a8, #785ce9)",
        borderRadius: "2rem",
        textTransform: "uppercase",
        fontSize: ".75rem"
      },
      offset: {
        x: '1.5rem',
        y: '1.5rem'
      },
      onClick: function(){}
    }).showToast();

    // Recargar la página después de un retraso
    setTimeout(() => {
      location.reload();
    }, 3000); 

    // cargar los productos
    fetchProducts();
  } catch (error) {
    console.error('Error creating product:', error);
  }
}
fetchProducts();







