const router = require('express').Router();
const { User, validateUser } = require('../Models/User');
// const { Admin, validateAdmin } = require('../../Models/Admin')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendVerificationEmail } = require('../Mailers/Sender')
require('dotenv').config();


router.post('/', async (req, res) => {
    try {
        // Validate user input
        const { error } = validateUser(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        // Check if email is already in use
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: "That email has been used by another user" });
        }
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        // Create a new user instance
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPassword,
            role:'User',
            image: req.body.image,
            isVerified: false,
            subscribed:false
        });

        // Send verification email
        try {
            await sendVerificationEmail(req.body.email, "User");
            // Save the user to the database
            await user.save();
            // Generate JWT token
            const token = jwt.sign(
                { _id: user._id, email: user.email, phone: user.phone },
                process.env.JWT,
                { expiresIn: '1h' } // Token expires in 1 hour
            );
            return res.status(200).send({ token, message: 'Validation code sent. Check your email.' });
        } catch (emailError) {
            console.error(`Error sending verification email: ${emailError}`);
            return res.status(500).json({ message: 'Error sending verification email. Please try again later.' });
        }
    } catch (serverError) {
        return res.status(500).json({ message: serverError.message });
    }
});


module.exports = router;
