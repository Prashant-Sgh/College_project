import { Router } from "express";
import { Product } from "../models/product.js";
import { restaurantAuth } from "../middleware/restaurantAuth.js";

export const productRoute = Router();

// Public: Get restaurants offering a given product name
productRoute.get('/:name/restaurants', async (req, res) => {
  const { name } = req.params;
  try {
    const products = await Product.find({ name }).populate('restaurant', 'name');
    const restaurantNames = products.map(p => p.restaurant.name);
    const unique = [...new Set(restaurantNames)];
    res.json({ product: name, offeredBy: unique });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch restaurants' });
  }
});

// Public route to get all products
productRoute.get("/all", async (req, res) => {
  try {
    const products = await Product.find()
      .populate('restaurant', 'name')
      .sort({ createdAt: -1 });

    const formattedProducts = products.map(product => ({
      _id: product._id,
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      rating: product.rating,
      restaurant: product.restaurant ? product.restaurant.name : undefined
    }));

    res.json(formattedProducts);
  } catch (error) {
    console.error('Error fetching all products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Protected routes
productRoute.use(restaurantAuth);

// Get restaurant's products
productRoute.get("/", async (req, res) => {
  try {
    const products = await Product.find({ restaurant: req.user._id });
    res.json(products);
  } catch (error) {
    console.error('Error fetching restaurant products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Create new product
productRoute.post("/", async (req, res) => {
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