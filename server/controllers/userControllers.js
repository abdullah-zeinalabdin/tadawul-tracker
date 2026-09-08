import { User } from "../models/UserModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";

const tokenGen = (userId) => {
    return jwt.sign({userId}, process.env.JWT_SECRET, { expiresIn: "7d"});
}

export const registerUser = async(req, res) => {
    const { email, password } = req.body;
    try {
        if(!email || !password) {
            res.status(400).json({error: "Please Fill Both Fields"});
            return;
        }

        if(!validator.isEmail(email)) {
            res.status(400).json({error: "Wrong Email Format"});
            return;
        }

        if(!validator.isStrongPassword(password)) {
            res.status(400).json({error: "Password is not Strong Enough"});
            return;
        }

        const exists = await User.findOne({ email });
        if(exists) {
            res.status(400).json({error: "Email Already Exists, Try Sign In!"});
            return;
        };

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await User.create({ email, passwordHash: hash });

        res.status(201).json({message: "Successfully Signed User!"});
    }

    catch(error) {
        res.status(400).json({error: error.message});
    }
};

export const loginUser = async(req, res) => {
    const { email, password } = req.body;

    try {
        if(!email || !password) {
            res.status(400).json({error: "Please Fill Both Fields"});
            return;
        }

        const user = await User.findOne({ email });
        if(!user) {
            res.status(401).json({error: "Combination is wrong, Try again"});
            return;
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);

        if(isMatch) {
            const token = tokenGen(user._id);
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            res.status(200).json({message: "Login Successfully"});
        }
        else {
            res.status(401).json({error: "Combination is wrong, Try again"});
        }
    }
    catch(error) {
        res.status(400).json({error: error.message});
    }
}

export const getMe = async(req, res) => {
    const { userId } = req.user;

    try {
        const user = await User.findById(userId);

        if(!user) {
            return res.status(404).json({error: "User was not found"});
        }

        return res.status(200).json({message: "User is logged in", email: user.email});
    }
    catch(error) {
        res.status(500).json({error: error.message});
    }
}