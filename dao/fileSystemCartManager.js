import path from 'path';
import CartManager from '../dao/managers/cartManager.js';

const cartsFilePath = path.join(__dirname, '../src/carts.json');
const cartManager = new CartManager(cartsFilePath);

export default cartManager;
