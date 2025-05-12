import express from 'express';
import { Product } from '../models/product.js';
import { restaurantAuth } from '../middleware/restaurantAuth.js';

const router = express.Router();

// Get all products for the authenticated restaurant
router.get('/products', restaurantAuth, async (req, res) => {
  try {
    const products = await Product.find({ restaurant: req.user._id });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Create a new product
router.post('/products', restaurantAuth, async (req, res) => {
  try {
    const { name, price, description, category, image } = req.body;
    const product = new Product({
      name,
      price,
      description,
      category,
      image,
      restaurant: req.user._id
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ message: 'Error creating product' });
  }
});

// Update a product
router.put('/products/:id', restaurantAuth, async (req, res) => {
  try {
    const { name, price, description, category, image } = req.body;
    const product = await Product.findOne({
      _id: req.params.id,
      restaurant: req.user._id
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = name;
    product.price = price;
    product.description = description;
    product.category = category;
    product.image = image;

    await product.save();
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(400).json({ message: 'Error updating product' });
  }
});

// Delete a product
router.delete('/products/:id', restaurantAuth, async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      restaurant: req.user._id
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(400).json({ message: 'Error deleting product' });
  }
});

export default router; 