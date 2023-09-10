// authController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {User} = require('../models/');

// Register a new user
const registerUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;


        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: 'User Registered successfully', user });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Registration failed' });
    }
};

// User login
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user in the database
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Compare the passwords
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Update last_logged_in timestamp
        user.last_logged_in = new Date();
        await user.save();

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Login failed' });
    }
};

module.exports = { registerUser, loginUser };
