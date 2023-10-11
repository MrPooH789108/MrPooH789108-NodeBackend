//const mongoose = require('mongoose');
//const User = mongoose.model('userlist');
const User = require("../models/Model");



exports.registerNewUser = async (req, res) => {
  try {
    let isUser = await User.find({ username: req.body.username });
    console.log(isUser);
    if (isUser.length >= 1) {
      return res.status(409).json({
        message: "Username already in use, Please try another username."
      });
    }
    const user = new User({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      role: req.body.role
    });
    let data = await user.save();
    const token = await user.generateAuthToken(); // here it is calling the method that we created in the model
    res.status(201).json({ data, token });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};
exports.loginUser = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findByCredentials(username, password);
    if (!user) {
      return res
        .status(401)
        .json({ error: "Login failed! Check authentication credentials" });
    }
    const token = await user.generateAuthToken();
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};
exports.getUserDetails = async (req, res) => {
  await res.json(req.userData);
};