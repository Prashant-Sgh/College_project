import { Product } from "../models/product.js";
import { Restaurant } from "../models/restaurant.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SampleProduct = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../assets/product-sample.json'), 'utf8'));


const sampleRestaurant = {
    name: "Aman's Restaurant",
    address: "Asam, India",
    phone: "123-456-7890",
    email: "test@test.com",
    pass : "test",
    owner: "Aman",
}

export async function loadSampleData() {

    try{
        const existingRestaurants = await Restaurant.find({});
        if (existingRestaurants.length === 0) {
            await Restaurant.insertOne(sampleRestaurant);
            console.log("Sample restaurant loaded successfully.");
            existingRestaurants = await Restaurant.find({});
        } else {
            console.log("Sample restaurant already exists. Skipping load.");
        }

        const existingProducts = await Product.find({});
        if (existingProducts.length === 0) {
            SampleProduct.forEach(async (product)=>{
                product.restaurant = existingRestaurants[0]._id; // Assign the restaurant ID to the product
                await Product.insertOne(product);
            })
            console.log("Sample products loaded successfully.");
        } else {
            console.log("Sample products already exist. Skipping load.");
        }
    }
    catch (error) {
        console.error("Error loading sample products:", error);
    }
}