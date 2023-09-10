// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Authentication middleware
const authenticate = async (req, res, next) => {
    try {
        // Get the JWT token from the request headers
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        // Get the user ID from the decoded token
        const userId = decodedToken.userId;

        // Find the user by ID
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Attach the user to the request object
        req.user = user;

        next();
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).json({ message: 'Authentication failed' });
    }
};

module.exports = authenticate;
