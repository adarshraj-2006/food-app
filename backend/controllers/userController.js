import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { successResponse, errorResponse } from "../utils/response.js";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return errorResponse(res, "User doesn't exist", 404);
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return errorResponse(res, "Invalid credentials", 401);
        }

        const token = createToken(user._id);
        const responseData = {
            token,
            isAdmin: Boolean(user.isAdmin), // Added at top level for easier access
            user: {
                name: user.name,
                email: user.email,
                id: user._id,
                isAdmin: Boolean(user.isAdmin)
            }
        };
        console.log(`Login attempt for ${email}: isAdmin = ${user.isAdmin}`);
        return successResponse(res, "Login Successful", responseData);

    } catch (error) {
        console.log(error);
        return errorResponse(res, "Error logging in");
    }
}

// register user
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        // checking if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return errorResponse(res, "User already exists", 400);
        }

        // validating email format & strong password
        if (!validator.isEmail(email)) {
            return errorResponse(res, "Please enter a valid email", 400);
        }

        if (password.length < 8) {
            return errorResponse(res, "Please enter a strong password (min 8 chars)", 400);
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        return successResponse(res, "Registration Successful", { token, user: { name: user.name, email: user.email, id: user._id } }, 201);

    } catch (error) {
        console.log(error);
        return errorResponse(res, "Error registering user");
    }
}

const listUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        res.json({ success: true, data: users });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

export { loginUser, registerUser, listUsers };
