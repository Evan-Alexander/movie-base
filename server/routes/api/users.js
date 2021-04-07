const express = require("express");
const { checkLoggedIn } = require("../../middleware/auth");
const { grantAccess } = require("../../middleware/roles");
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

router.route("/signin").post(async (req, res) => {
  try {
    // Find User
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: "Email does not exist" });

    // Compare Password
    const compare = await user.comparePassword(req.body.password);

    if (!compare)
      return res.status(400).json({ message: "Password does not match." });

    // Generate Token
    const token = user.generateToken();

    // Send Response
    res.cookie("flickbase-token", token).status(200).send(getUserProps(user));
  } catch (error) {
    res.status(400).json({
      message: "Error",
      error: error,
    });
  }
});

router
  .route("/profile")
  .get(checkLoggedIn, grantAccess("readOwn", "profile"), async (req, res) => {
    try {
      const permission = res.locals.permission;
      const user = await User.findById(req.user._id);
      if (!user) return res.status(400).json({ message: "User not found" });

      res.status(200).json(permission.filter(user._doc));
    } catch (error) {
      return res.status(400).send(error);
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
