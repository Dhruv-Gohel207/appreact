const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = "Something@secret"


// Create user using POST "/api/auth/createuser". No authentication required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 })


], async (req, res) => {
    const errors = validationResult(req);
        
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "A user with this email already exists"  });
        }

        const salt = await bcrypt.genSalt(10);
        const secpass = await bcrypt.hash(req.body.password, salt);
        
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: secpass
        });
        await user.save();
        const data = {
            user:{
                id:user.id 
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)            
        // res.json({ message: "User created successfully", user });
        res.json({authToken})

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
