// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/'); // Import the User model
const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();

        // Set session or cookie
        req.session.userId = newUser._id;

        // Redirect to homepage
        res.status(200).json({ message: 'Signup successful! Redirecting to homepage.' });
    } catch (err) {
        console.error('Signup Error:', err);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
});

module.exports = router;
