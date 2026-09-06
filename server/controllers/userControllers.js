import { User } from "../models/UserModel.js";
import bcrypt from "bcrypt";
import validator from "validator";

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

        isMatch ? res.status(200).json({message: "Login successfully"}) : res.status(401).json({error: "Combination is wrong, Try again"});
    }
    catch(error) {
        res.status(400).json({error: error.message});
    }
}