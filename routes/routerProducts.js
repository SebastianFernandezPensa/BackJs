import express from 'express';
import ProductManager from '../dao/managers/productManager.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Obtener la ruta del archivo actual
const currentFilePath = fileURLToPath(import.meta.url);

// Obtener el directorio base
const currentDir = dirname(currentFilePath);

// Utilizar `currentDir` en lugar de `__dirname` en tu código
const productManager = new ProductManager(path.join(currentDir, '../src/productos.json'));

const router = express.Router();


// Ruta raíz GET /api/products
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0;
    const products = await productManager.getProducts(limit);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Ruta GET /api/products/:pid
router.get('/:pid', async (req, res) => {
  try {
    const productId = req.params.pid;
    const product = await productManager.getProductById(productId);

    if (!product) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json(product);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Ruta POST /api/products
router.post('/', async (req, res) => {
  try {
    // Código del manejo del POST

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:code', async (req, res) => {
  try {
    const productCode = req.params.code;
    const updatedFields = req.body;

    // Verificar si el producto existe
    const existingProduct = await productManager.getProductByCode(productCode);
    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Verificar si se intenta actualizar el campo 'code'
    if (updatedFields.hasOwnProperty('code')) {
      return res.status(400).json({ error: 'Cannot update product code' });
    }

    // Actualizar los campos especificados en el producto
    await productManager.updateProduct(existingProduct.id, updatedFields);

    return res.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:code', async (req, res) => {
  try {
    const productCode = req.params.code;

    // Verificar si el producto existe
    const existingProduct = await productManager.getProductByCode(productCode);
    if (!existingProduct) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    // Eliminar el producto
    await productManager.deleteProductByCode(productCode);

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;




  