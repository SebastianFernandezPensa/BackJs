const ProductManager = require('./productManager');

const express = require('express');

const app = express();

const productManager = new ProductManager('./productos.json');

app.get('/products', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0;
    const products = await productManager.getProducts(limit);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = 3001; // Puerto en el que se ejecutará el servidor

app.get('/products/code/:code', async (req, res) => {
    try {
      const productCode = req.params.code;
      const product = await productManager.getProductByCode(productCode);
  
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
      } else {
        res.json(product);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});





// async function testProductManager() {
//     try {
//       // Agregar un producto
//       const productId = await productManager.addProduct({
//         title: 'Producto 1',
//         description: 'Descripción del Producto 1',
//         price: 10,
//         thumbnail: 'ruta/imagen1.jpg',
//         code: '123456',
//         stock: 5,
//       });
//       console.log('Producto agregado. ID:', productId);
  
//       // Obtener todos los productos
//       const allProducts = await productManager.getProducts();
//       console.log('Todos los productos:', allProducts);
  
//       // Buscar un producto por su id
//       const productIdToFind = 1; // Reemplaza con el id de un producto existente
//       const productById = await productManager.getProductById(productIdToFind);
//       console.log('Producto por ID:', productById);
  
//       // Actualizar un producto
//       const productIdToUpdate = 1; // Reemplaza con el id de un producto existente
//       await productManager.updateProduct(productIdToUpdate, 'price', 15);
//       console.log('Producto actualizado.');
  
//       // Eliminar un producto
//       const productIdToDelete = 1; // Reemplaza con el id de un producto existente
//       await productManager.deleteProduct(productIdToDelete);
//       console.log('Producto eliminado.');
  
//       // Obtener todos los productos después de la eliminación
//       const remainingProducts = await productManager.getProducts();
//       console.log('Productos restantes:', remainingProducts);
//     } catch (error) {
//       console.error(error);
//     }
//   }
  
//   testProductManager();
  