const express = require("express");
let router = express.Router();
require("dotenv").config();

const { User } = require("../../models/user_model");

router.route("/register").post(async (req, res) => {
  try {
    // Check if email exists
    if (await User.emailTaken(req.body.email)) {
      return res.status(400).json({
        message: "This email is already in use.",
      });
    }
    // create the model
    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });

    // generate token
    const token = user.generateToken();
    const doc = await user.save();
    // save & send token with cookie
    res.cookie("flickbase-token", token).status(200).send(getUserProps(doc));
  } catch (error) {
    res.status(400).json({
      message: "Error",
      error: error,
    });
  }
});

const getUserProps = (user) => {
  return {
    _id: user._id,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    age: user.age,
    role: user.role,
  };
};

module.exports = router;
