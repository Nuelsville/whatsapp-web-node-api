const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Adjust the path based on your project structure

const UserController = {
    async register(req, res) {
        try {
            const { username, email, password } = req.body;

            // Check if the user with the given email already exists
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: 'User with this email already exists' });
            }

            // Hash the password before saving
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create the user in the database
            const user = await User.create({
                username,
                email,
                password: hashedPassword
            });

            res.status(201).json({ message: 'User registered successfully', user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred' });
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;

            // Find the user by email
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Compare the password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Generate JWT token
            const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });

            res.json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred' });
        }
    },

    async getUserDetails(req, res) {
        try {
            const userId = req.userId; // Extracted from JWT middleware

            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json({ user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred' });
        }
    }
};

module.exports = UserController;
