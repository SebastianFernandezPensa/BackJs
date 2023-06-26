import ProductModel from '../models/productModel.js';

class ProductManager {
  async getProducts() {
    try {
      const products = await ProductModel.find({});
      return products;
    } catch (error) {
      throw new Error(`Error retrieving products: ${error}`);
    }
  }

  async getProductById(id) {
    try {
      const product = await ProductModel.findById(id);
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    } catch (error) {
      throw new Error(`Error retrieving product: ${error}`);
    }
  }

  async getProductByCode(code) {
    try {
      const product = await ProductModel.findOne({ code });
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    } catch (error) {
      throw new Error(`Error retrieving product: ${error}`);
    }
  }

  async addProduct(product) {
    try {
      const createdProduct = await ProductModel.create(product);
      return createdProduct.id;
    } catch (error) {
      throw new Error(`Error creating product: ${error}`);
    }
  }

  async updateProduct(id, updatedFields) {
    try {
      const product = await ProductModel.findByIdAndUpdate(id, updatedFields, { new: true });
      if (!product) {
        throw new Error('Product not found');
      }
    } catch (error) {
      throw new Error(`Error updating product: ${error}`);
    }
  }

  async updateProductByCode(code, updatedFields) {
    try {
      const product = await ProductModel.findOneAndUpdate({ code }, updatedFields, { new: true });
      if (!product) {
        throw new Error('Product not found');
      }
    } catch (error) {
      throw new Error(`Error updating product: ${error}`);
    }
  }

  async deleteProductById(id) {
    try {
      const deletedProduct = await ProductModel.findByIdAndDelete(id);
      if (!deletedProduct) {
        throw new Error('Product not found');
      }
      return deletedProduct;
    } catch (error) {
      throw new Error(`Error deleting product: ${error}`);
    }
  }

  async deleteProductByCode(code) {
    try {
      const deletedProduct = await ProductModel.findOneAndDelete({ code });
      if (!deletedProduct) {
        throw new Error('Product not found');
      }
      return deletedProduct;
    } catch (error) {
      throw new Error(`Error deleting product: ${error}`);
    }
  }
}

export default ProductManager;



