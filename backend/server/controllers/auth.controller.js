const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const User = require('../model/users.model');

dotenv.config();

// Login function
const login = async (req, res, next) => {
  try {
    if(!req.body.hasOwnProperty('email') || !req.body.hasOwnProperty('password')) {
      return res.status(401).json({message:"Invalid Format"});
    }
    
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({message:"Invalid credentials"});
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({message:"Incorrect Password"});
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    res.cookie('token', token);
    res.status(200).json({ user, token });
  } catch (err) {
    next(err); 
  }
};

// Signup function
const signup = async (req, res, next) => {
  try {
    const { email, password, username, role } = req.body;
    console.log(User);
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({message:"User already exists"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: "User created successfully", data: newUser });
  } catch (err) {
    next(err); 
  }
};

module.exports = { login, signup };
