const fs = require('fs');

class ProductManager {
	constructor(path, products = []) {
    	this.path = path;
    	this.products = products;
    	this.lastProductId = 0;
    	this.loadProductsFromFile();
}



addProduct(product) {
    if (!this.isFieldValid(product.code)) {
    	throw new Error("El código del producto es inválido o está duplicado.");
    }

    if (!this.areAllFieldsRequired(product)) {
    	throw new Error("Todos los campos del producto son obligatorios.");
    }

    const newProduct = {
    	...product,
    	id: ++this.lastProductId
    };

    this.products.push(newProduct);
    this.saveProductsToFile();
}

getProducts() {
    return this.products;
}

getProductById(id) {
    const product = this.products.find(product => product.id === id);
    if (!product) {
    	throw new Error("Producto no encontrado.");
    }
    return product;
}

updateProduct(productId, fieldToUpdate, newValue) {
    const product = this.getProductById(productId);

    if (fieldToUpdate === "id") {
    	throw new Error("No se puede modificar el ID del producto.");
    }

    product[fieldToUpdate] = newValue;
    this.saveProductsToFile();
}

deleteProduct(productId) {
    const index = this.products.findIndex(product => product.id === productId);
    if (index === -1) {
		throw new Error("Producto no encontrado.");
    }

    const deletedProduct = this.products.splice(index, 1)[0];
    this.saveProductsToFile();
    return deletedProduct;
}

isFieldValid(code) {
    return !this.products.some(product => product.code === code);
}

areAllFieldsRequired(product) {
	return (
    	product.title &&
    	product.description &&
    	product.price &&
    	product.thumbnail &&
    	product.code &&
    	product.stock
    );
}

saveProductsToFile() {
    const data = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.path, data);
}

loadProductsFromFile() {
    if (fs.existsSync(this.path)) {
    	const data = fs.readFileSync(this.path, 'utf8');
    	this.products = JSON.parse(data);
    	this.lastProductId = Math.max(...this.products.map(product => product.id), 0);
    }
}
}

module.exports = ProductManager;