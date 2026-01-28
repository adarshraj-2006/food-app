import mongoose from "mongoose";
import 'dotenv/config';
import { connectDB } from "./config/db.js";
import foodModel from "./models/foodModel.js";

// Food items from data.ts with offers (external images)
const food_items_with_offers = [
    {
        name: "Chicken Biryani",
        description: "Aromatic basmati rice cooked with tender chicken pieces, exotic spices, and fried onions. Served with raita and salan.",
        price: 299,
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&h=400&fit=crop",
        category: "Biryani"
    },
    {
        name: "Margherita Pizza",
        description: "Classic Italian pizza with fresh mozzarella, tomatoes, and basil on a crispy thin crust with our signature sauce.",
        price: 349,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop",
        category: "Pizza"
    },
    {
        name: "Classic Whopper",
        description: "Flame-grilled beef patty topped with fresh lettuce, tomatoes, onions, pickles, and creamy mayo in a sesame seed bun.",
        price: 199,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop",
        category: "Burgers"
    },
    {
        name: "Kung Pao Chicken",
        description: "Stir-fried chicken with peanuts, vegetables, and dried chili peppers in a savory Sichuan-style sauce.",
        price: 449,
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&h=400&fit=crop",
        category: "Chinese"
    },
    {
        name: "Masala Dosa",
        description: "Crispy rice crepe filled with spiced potato masala, served with sambar and coconut chutney.",
        price: 129,
        image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=600&h=400&fit=crop",
        category: "South Indian"
    },
    {
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with a molten center, served with vanilla ice cream and chocolate sauce.",
        price: 199,
        image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&h=400&fit=crop",
        category: "Deserts"
    },
    {
        name: "Paneer Butter Masala",
        description: "Soft paneer cubes in a rich, creamy tomato-based gravy with aromatic spices. Served with butter naan.",
        price: 279,
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop",
        category: "North Indian"
    },
    {
        name: "Pepperoni Pizza",
        description: "Loaded with spicy pepperoni slices and extra mozzarella cheese on our signature tomato sauce base.",
        price: 449,
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&h=400&fit=crop",
        category: "Pizza"
    },
];

// Food items from assets.ts (local images)
const food_list = [
    {
        name: "Greek salad",
        image: "food_1.png",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
    },
    {
        name: "Veg salad",
        image: "food_2.png",
        price: 18,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
    },
    {
        name: "Clover Salad",
        image: "food_3.png",
        price: 16,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
    },
    {
        name: "Chicken Salad",
        image: "food_4.png",
        price: 24,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
    },
    {
        name: "Lasagna Rolls",
        image: "food_5.png",
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    },
    {
        name: "Peri Peri Rolls",
        image: "food_6.png",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    },
    {
        name: "Chicken Rolls",
        image: "food_7.png",
        price: 20,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    },
    {
        name: "Veg Rolls",
        image: "food_8.png",
        price: 15,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    },
    {
        name: "Ripple Ice Cream",
        image: "food_9.png",
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    },
    {
        name: "Fruit Ice Cream",
        image: "food_10.png",
        price: 22,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    },
    {
        name: "Jar Ice Cream",
        image: "food_11.png",
        price: 10,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    },
    {
        name: "Vanilla Ice Cream",
        image: "food_12.png",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    },
    {
        name: "Chicken Sandwich",
        image: "food_13.png",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    },
    {
        name: "Vegan Sandwich",
        image: "food_14.png",
        price: 18,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    },
    {
        name: "Grilled Sandwich",
        image: "food_15.png",
        price: 16,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    },
    {
        name: "Bread Sandwich",
        image: "food_16.png",
        price: 24,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    },
    {
        name: "Cup Cake",
        image: "food_17.png",
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake"
    },
    {
        name: "Vegan Cake",
        image: "food_18.png",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake"
    },
    {
        name: "Butterscotch Cake",
        image: "food_19.png",
        price: 20,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake"
    },
    {
        name: "Sliced Cake",
        image: "food_20.png",
        price: 15,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake"
    },
    {
        name: "Garlic Mushroom",
        image: "food_21.png",
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg"
    },
    {
        name: "Fried Cauliflower",
        image: "food_22.png",
        price: 22,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg"
    },
    {
        name: "Mix Veg Pulao",
        image: "food_23.png",
        price: 10,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg"
    },
    {
        name: "Rice Zucchini",
        image: "food_24.png",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg"
    },
    {
        name: "Cheese Pasta",
        image: "food_25.png",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pasta"
    },
    {
        name: "Tomato Pasta",
        image: "food_26.png",
        price: 18,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pasta"
    },
    {
        name: "Creamy Pasta",
        image: "food_27.png",
        price: 16,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pasta"
    },
    {
        name: "Chicken Pasta",
        image: "food_28.png",
        price: 24,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pasta"
    },
    {
        name: "Butter Noodles",
        image: "food_29.png",
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    },
    {
        name: "Veg Noodles",
        image: "food_30.png",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    },
    {
        name: "Somen Noodles",
        image: "food_31.png",
        price: 20,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    },
    {
        name: "Cooked Noodles",
        image: "food_32.png",
        price: 15,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    }
];

// Combine both arrays
const all_food_items = [...food_items_with_offers, ...food_list];

const seedDatabase = async () => {
    try {
        await connectDB();

        // Clear existing food items
        await foodModel.deleteMany({});
        console.log("Cleared existing food items");

        // Insert all food items
        const result = await foodModel.insertMany(all_food_items);
        console.log(`Successfully seeded ${result.length} food items!`);

        console.log("\nSeeded categories:");
        const categories = [...new Set(all_food_items.map(item => item.category))];
        categories.forEach(cat => {
            const count = all_food_items.filter(item => item.category === cat).length;
            console.log(`  - ${cat}: ${count} items`);
        });

        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedDatabase();
