import CartModel from '../models/cartModel.js';

class CartManager {
  async createCart() {
    try {
      const newCart = await CartModel.create({});
      return newCart.id;
    } catch (error) {
      throw new Error(`Error creating cart: ${error}`);
    }
  }

  async getCartById(id) {
    try {
      const cart = await CartModel.findById(id);
      if (!cart) {
        throw new Error('Cart not found');
      }
      return cart;
    } catch (error) {
      throw new Error(`Error retrieving cart: ${error}`);
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      const cart = await CartModel.findById(cartId);
      if (!cart) {
        throw new Error('Cart not found');
      }

      const productIndex = cart.products.findIndex((p) => p.product.toString() === productId);
      if (productIndex !== -1) {
        cart.products[productIndex].quantity++;
      } else {
        cart.products.push({ product: productId, quantity: 1 });
      }

      await cart.save();
    } catch (error) {
      throw new Error(`Error adding product to cart: ${error}`);
    }
  }
}

export default CartManager;



