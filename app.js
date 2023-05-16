const ProductManager = require('./productManager');

// Crear una instancia de ProductManager con la ruta del archivo
const path = './productos.json';
const productManager = new ProductManager(path);

// Agregar productos de prueba
const product1 = {
  title: 'Producto 1',
  description: 'Descripción del Producto 1',
  price: 10,
  thumbnail: 'imagen1.png',
  code: 'ABC123',
  stock: 5
};

const product2 = {
  title: 'Producto 2',
  description: 'Descripción del Producto 2',
  price: 20,
  thumbnail: 'imagen2.png',
  code: 'DEF456',
  stock: 10
};

try {
  productManager.addProduct(product1);
  productManager.addProduct(product2);

  // Obtener todos los productos
  const allProducts = productManager.getProducts();
  console.log('Todos los productos:', allProducts);

  // Obtener un producto por su ID
  const productId = 1; // Reemplazar con el ID válido
  const productById = productManager.getProductById(productId);
  console.log('Producto por ID:', productById);

  // Actualizar un campo de un producto
  const productIdToUpdate = 2; // Reemplazar con el ID válido
  const fieldToUpdate = 'price'; // Reemplazar con el campo válido
  const newValue = 30; // Nuevo valor
  productManager.updateProduct(productIdToUpdate, fieldToUpdate, newValue);
  const updatedProduct = productManager.getProductById(productIdToUpdate);
  console.log('Producto actualizado:', updatedProduct);

  // Eliminar un producto
  const productIdToDelete = 1; // Reemplazar con el ID válido
  const deletedProduct = productManager.deleteProduct(productIdToDelete);
  console.log('Producto eliminado:', deletedProduct);

  // Obtener todos los productos después de eliminar uno
  const remainingProducts = productManager.getProducts();
  console.log('Productos restantes:', remainingProducts);
} catch (error) {
  console.error('Error:', error.message);
}