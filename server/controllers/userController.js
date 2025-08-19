import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

// Signup a new user
export const signup = async (req, res) => {
    const { fullName, email, password, bio } = req.body;

    try {
        if (!fullName || !email || !password || !bio) {
            return res.json({ success: false, message: "Missing Details" });
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.json({ success: false, message: "Account already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            email,
            fullName,
            password: hashedPassword,
            bio
        });

        const acceptedUser = await newUser.save();

        const token = generateToken(acceptedUser._id);

        return res.json({ success: true, userData: newUser, token, message: "Account created successfully" });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};


//login user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await User.findOne({ email });

        const isPasswordCorrect = await bcrypt.compare(password, userData.password);

        if (!isPasswordCorrect) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = generateToken(userData._id);

        return res.json({ success: true, userData, token, message: "Login successful" });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

//check if user is authenticated
export const checkAuth = (req, res) => {
    res.json({ success: true, user: req.user });
};


//update user profile
export const updateProfile = async (req, res) => {
    try {
        const { profilePic, bio, fullName } = req.body;

        const userId = req.user._id;
        let updatedUser;

        if (!profilePic) {
            updatedUser = await User.findByIdAndUpdate(
                userId,
                { bio, fullName },
                { new: true }
            );
        } else {
            const upload = await cloudinary.uploader.upload(profilePic);

            updatedUser = await User.findByIdAndUpdate(
                userId,
                { profilePic: upload.secure_url, bio, fullName },
                { new: true }
            );
        }
        return res.json({ success: true, userData: updatedUser, message: "Profile updated successfully" });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};
