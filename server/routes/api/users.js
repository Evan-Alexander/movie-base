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
  })
  .patch(
    checkLoggedIn,
    grantAccess("updateOwn", "profile"),
    async (req, res) => {
      try {
        const user = await User.findOneAndUpdate(
          { _id: req.user._id },
          {
            $set: {
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              age: req.body.age,
            },
          },
          // Return the updated user object instead of the default original user object
          { new: true }
        );
        if (!user) return res.status(400).json({ message: "User not found" });

        res.status(200).json(getUserProps(user));
      } catch (error) {
        res.status(400).json({ message: "Problem updating", error: error });
      }
    }
  );

router.route("/isauth").get(checkLoggedIn, async (req, res) => {
  res.status(200).send(getUserProps(req.user));
});

router
  .route("/update_email")
  .patch(
    checkLoggedIn,
    grantAccess("updateOwn", "profile"),
    async (req, res) => {
      try {
        if (await User.emailTaken(req.body.newemail)) {
          return res
            .status(400)
            .json({ message: "Sorry that email is already in use." });
        }

        const user = await User.findOneAndUpdate(
          {
            _id: req.user._id,
            email: req.body.email,
          },
          {
            $set: {
              email: req.body.newemail,
            },
          },
          { new: true }
        );
        if (!user) return res.status(400).json({ message: "User not found" });

        const token = user.generateToken();
        res
          .cookie("flickbase-token", token)
          .status(200)
          .send({ email: user.email });
      } catch (error) {
        res.status(400).json({ message: "Problem updating", error: error });
      }
    }
  );

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
