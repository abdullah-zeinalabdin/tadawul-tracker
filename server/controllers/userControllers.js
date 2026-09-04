import { User } from "../models/UserModel.js";
import bcrypt from "bcrypt";

export const registerUser = async(req, res) => {
    const { email, password } = req.body;
    try {
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