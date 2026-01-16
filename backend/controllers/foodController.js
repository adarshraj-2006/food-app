import foodModel from "../models/foodModel.js";

// Add food item
const addFood = async (req, res) => {
    try {
        console.log("POST /api/food/add - Body:", req.body);
        console.log("File:", req.file);

        // Handle optional image
        let image_filename = null;
        if (req.file) {
            image_filename = req.file.filename;
        }

        const { name, description, price, category } = req.body;

        // Validate required fields
        if (!name || !description || !price || !category) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Validate price
        if (isNaN(price) || Number(price) <= 0) {
            return res.status(400).json({
                success: false,
                message: "Price must be a positive number"
            });
        }

        // Create food document
        const food = new foodModel({
            name,
            description,
            price: Number(price),
            category,
            image: image_filename   // null if not provided
        });

        await food.save();

        res.status(201).json({
            success: true,
            message: "Food Added",
            data: food
        });

    } catch (error) {
        console.error("Add Food Error:", error);
        res.status(500).json({
            success: false,
            message: "Error adding food item"
        });
    }
};

//all food items
const listFood =async(req,res)=>{
    try{
        const food= await foodModel.find({});
        res.json({success:true,data:food})
    } catch(error){
        console.log(error)
        res.status(500).json({success:false,message:"Error fetching food items"})
    }
}

// remove food item
const removeFood =async(req,res) =>{
    try{
        const food =await foodModel.foodById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{});
    }
}

export { addFood ,listFood,removeFood};
