const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = "Something@secret";
const fetchuser = require('../middleware/fetchuser')

//Route:1 Create user using POST "/api/auth/createuser". No authentication required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "A user with this email already exists" });
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
            user: {
                id: user.id
            }   
        };
        const authToken = jwt.sign(data, JWT_SECRET);

        success = true;
        res.json({success, authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//Route:2 Authenticate a user using POST "/api/auth/login". No login required
// Route:2 Authenticate a user using POST "/api/auth/login". No login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists()
], async (req, res) => {
  let success = false; // Default to failure
  const errors = validationResult(req);

  // Handle validation errors
  if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ success: false, error: "Please try to login with correct credentials" });
      }

      // Compare passwords
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
          return res.status(400).json({ success: false, error: "Invalid credentials" });
      }

      // Generate auth token
      const data = { user: { id: user.id } };
      const authToken = jwt.sign(data, JWT_SECRET);

      success = true;
      res.json({ success, authToken });

  } catch (error) {
      console.error("Login error:", error.message);
      res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

//Route:3 Get loggedin user details using POST "/api/auth/getuser".  login required
router.post('/getuser', fetchuser , async (req, res) => {
try {
     const userId = req.user.id;
     const user = await User.findById(userId).select("-password");  
     res.json(user);
} catch (error) {
    console.error(error.message);
        res.status(500).send("Internal Server Error");
}
});
module.exports = router; 
