const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
const secret_key='cattle'
const {verifyTokenuser,verifyToken}=require('../midleware/loginmidleware'); 

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    const token = jwt.sign({ email: user.email, userId: user._id,role:user.role }, secret_key, { expiresIn: '1h' });
    res.status(200).json({ token, expiresIn: 3600,role:user.role,userId:user._id });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}); 
 
router.post('/logout', (req, res) => {
  
  res.send('Logout successful');
});

router.get('/user', verifyTokenuser, (req, res) => {
  res.json({ message: 'Welcome to the user page' });
});


router.get('/admin',verifyToken,  (req, res) => {
  res.json({ message: 'Welcome to the admin page' });
});

module.exports = router;
