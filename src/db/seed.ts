// Import the 'Product' type and 'db' object from the current directory (probably index.ts or a db setup file)
import { type Product, db } from '.';

// Import dotenv package to load environment variables from a .env file
import * as dotenv from 'dotenv';

// Load the variables from .env into process.env so you can use them in the app
dotenv.config();

// Function to randomly select a price from a predefined list
const getRandomPrice = () => {
  const PRICES = [9.99, 19.99, 29.99, 39.99, 49.99]; // Available price options
  return PRICES[Math.floor(Math.random() * PRICES.length)]; // Pick one at random
};

// Predefined list of shirt colors
const COLORS = ['white', 'beige', 'blue', 'green', 'purple'] as const;

// Predefined list of shirt sizes
const SIZES = ['S', 'M', 'L'] as const;

// Main function that will generate product data and insert it into the database
const seed = async () => {
  const products: Product[] = []; // This array will hold all generated product objects

  // Outer loop: create 3 base product types
  for (let i = 0; i < 3; i++) {
    // Middle loop: go through each color
    for (let j = 0; j < COLORS.length; j++) {
      // Inner loop: go through each size
      for (let k = 0; k < SIZES.length; k++) {
        const size = SIZES[k]; // Get current size
        const color = COLORS[j]; // Get current color

        // Push a new product into the array
        products.push({
          id: `${color}-${size}-${i + 1}`, // Unique ID e.g. "blue-M-1"
          imageId: `/${color}_${i + 1}.png`, // Image path e.g. "/blue_1.png"
          color, // Shirt color
          name: `${color[0].toUpperCase() + color.slice(1)} shirt ${i}`, // Name like "Blue shirt 0"
          size, // Shirt size
          price: getRandomPrice(), // Random price from helper function
        });
      }
    }
  }

  // Map sizes to numeric values for use in a vector (good for AI similarity search)
  const SIZE_MAP = {
    S: 0,
    M: 1,
    L: 2,
  };

  // Map colors to numeric values for vector representation
  const COLOR_MAP = {
    white: 0,
    beige: 1,
    blue: 2,
    green: 3,
    purple: 4,
  };

  // Insert or update all products into the database using the upsert method
  // Each product is converted into an object with an id, vector, and metadata
  await db.upsert(
    products.map((product) => ({
      id: product.id, // Unique identifier for the product
      vector: [
        // Vector representation of product features
        COLOR_MAP[product.color], // Convert color to a number
        SIZE_MAP[product.size], // Convert size to a number
        product.price, // Use the price as a numeric value
      ],
      metadata: product, // Store full product object as metadata
    }))
  );
};

// Run the seed function to populate the database
seed();
