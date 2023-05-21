const fs = require('fs').promises;

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.loadProductsFromFile();
  }

  async saveProductsToFile(products) {
    const data = JSON.stringify(products, null, 2);
    await fs.writeFile(this.path, data);
  }

  async loadProductsFromFile() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      this.products = JSON.parse(data);
    } catch (error) {
      console.error('Error loading products from file:', error);
    }
  }

  async getProducts() {
    await this.loadProductsFromFile();
    return this.products;
  }

  async getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  async getProductByCode(code) {
    const product = this.products.find((p) => p.code === code);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }
  
  

  async addProduct(product) {
    await this.loadProductsFromFile();
    const existingProduct = this.products.find((p) => p.code === product.code);
    if (existingProduct) {
      throw new Error('Product with the same code already exists');
    }
    const id = this.generateProductId();
    product.id = id;
    this.products.push(product);
    await this.saveProductsToFile(this.products);
    return id;
  }

  async updateProduct(id, field, value) {
    await this.loadProductsFromFile();
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    product[field] = value;
    await this.saveProductsToFile(this.products);
  }

  async deleteProduct(id) {
    await this.loadProductsFromFile();
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    const deletedProduct = this.products.splice(index, 1);
    await this.saveProductsToFile(this.products);
    return deletedProduct;
  }

  generateProductId() {
    let id = 1;
    if (this.products.length > 0) {
      const lastProduct = this.products[this.products.length - 1];
      id = lastProduct.id + 1;
    }
    return id;
  }
}

module.exports = ProductManager;
