const path = require('path');
const express = require('express');
const app = express();
const routerProductos = require('../routes/routerProducts');
const cartRouter = require('../routes/routerCart');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const exphbs = require('express-handlebars').create({});

const ProductManager = require('./productManager');
const productManager = new ProductManager(path.join(__dirname, './productos.json'));

const CartManager = require('./cartManager');
const cartManager = new CartManager(path.join(__dirname, './carts.json'));

app.engine('hbs', exphbs.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.json());

const PORT = 8080;

app.use('/api/products', routerProductos);

app.use('/api/carts', cartRouter);

app.use('/socket.io', express.static(path.join(__dirname, 'node_modules/socket.io/client-dist')));


// Ruta para renderizar la vista home.handlebars
app.get('/', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render('index', { products });
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).send('Internal server error');
  }
});

// Ruta para renderizar la vista realTimeProducts.handlebars
app.get('/realtimeproducts', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', { products });
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).send('Internal server error');
  }
});

// ...

io.on('connection', (socket) => {
  console.log('New client connected');

  // Escuchar eventos de cambio en la lista de productos
  productManager.on('change', (products) => {
    // Emitir evento 'update' con la lista actualizada de productos
    socket.emit('update', products);
  });

  // Manejar evento 'createProduct' para crear un nuevo producto
  socket.on('createProduct', async (product) => {
    try {
      const productId = await productManager.addProduct(product);

      // Emitir evento 'update' con la lista actualizada de productos a todos los clientes
      io.emit('update', await productManager.getProducts());

      console.log(`Product created with ID: ${productId}`);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  });

  // Manejar evento 'deleteProduct' para eliminar un producto
  socket.on('deleteProduct', async (productId) => {
    try {
      await productManager.deleteProductById(productId);

      // Emitir evento 'update' con la lista actualizada de productos a todos los clientes
      io.emit('update', await productManager.getProducts());

      console.log(`Product deleted with ID: ${productId}`);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// ...


server.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});












  






