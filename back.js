class ProductManager {
	constructor(products = []) {
	this.products = products;
	this.lastProductId = 0;
	}

	addProduct(product) {
		if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
			throw new Error("Todos los campos son obligatorios");
		}
	
		if (this.products.some(p => p.code === product.code)) {
			throw new Error("Ya existe un producto con ese código");
		}
	
		const newProduct = new Product(
			product.title,
			product.description,
			product.price,
			product.thumbnail,
			product.code,
			product.stock
		);
		newProduct.id = ++this.lastProductId; 
	
		this.products.push(newProduct);
	}

	removeProduct(product) {
		const index = this.products.indexOf(product);
		if (index !== -1) {
		this.products.splice(index, 1);
	}
	}

	getProductById(id) {
	return this.products.find(product => product.id === id);
	}

	getAllProducts() {
	return this.products;
	}
}

class Product {
		constructor(title, description, price, thumbnail, code, stock) {
	this.title = title;
	this.description = description;
	this.price = price;
	this.thumbnail = thumbnail;
	this.code = code;
	this.stock = stock;
}
}