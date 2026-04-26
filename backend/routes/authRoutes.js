import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { protect } from '../middleware/authMiddleware.js';
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';

const router = express.Router();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID || 'dummy');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword });

    if (user) {
      res.status(201).json({
        user: { _id: user._id, name: user.name, email: user.email, role: user.role },
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        user: { _id: user._id, name: user.name, email: user.email, role: user.role },
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/me', protect, async (req, res) => {
  res.json({ user: req.user });
});

router.post('/google', async (req, res) => {
  const { token } = req.body;
  try {
    // Use Google's userinfo endpoint to verify the access token
    const googleResponse = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const { email, name, sub: googleId } = googleResponse.data;

    if (!email) return res.status(400).json({ message: 'Could not retrieve email from Google' });

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, googleId });
    } else if (!user.googleId) {
      user.googleId = googleId;
      await user.save();
    }

    res.json({
      user: { _id: user._id, name: user.name, email: user.email, role: user.role },
      token: generateToken(user._id)
    });
  } catch (error) {
    console.error("Google Auth Error:", error?.response?.data || error.message);
    res.status(401).json({ message: 'Invalid Google token' });
  }
});

router.post('/facebook', async (req, res) => {
  const { token, userID } = req.body;
  try {
    // Verify token with Facebook graph API
    const fbResponse = await axios.get(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email`);
    const { email, name, id: facebookId } = fbResponse.data;
    
    if (!email) return res.status(400).json({ message: 'Email is required from Facebook' });
    
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, facebookId });
    } else if (!user.facebookId) {
      user.facebookId = facebookId;
      await user.save();
    }
    
    res.json({
      user: { _id: user._id, name: user.name, email: user.email, role: user.role },
      token: generateToken(user._id)
    });
  } catch (error) {
    console.error("Facebook Auth Error:", error);
    res.status(401).json({ message: 'Invalid Facebook token' });
  }
});

export default router;
