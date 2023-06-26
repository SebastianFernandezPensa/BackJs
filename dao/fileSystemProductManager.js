import path from 'path';
import ProductManager from '../dao/managers/productManager.js';

const productsFilePath = path.join(__dirname, '../src/productos.json');
const productManager = new ProductManager(productsFilePath);

export default productManager;
