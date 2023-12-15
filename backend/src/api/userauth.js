const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { model } = require("mongoose");
const User = require("../database/db").users;

router.use(express.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/add-new-user", async (req, res) => {
  const { userName, firstName, lastName, password } = req.body;
  const foundUser = await User.findOne({ userName: userName });
  if (foundUser) {
    res.json({ stat: false, err: false });
  } else {
    const newUser = new User({
      userName: userName,
      firstName: firstName,
      lastName: lastName,
      password: password,
      profilePicPath: "/profile_pic/def_profile.jpg"
    });
    try {
      await newUser.save();
      res.json({ stat: true, err: false });
    } catch (err) {
      console.log("Error occured in adding user");
      console.log(err);
      res.json({ stat: false, err: true });
    }
  }
});

router.post("/check-user-exist", async (req, res) => {
  const userName = req.body.userName;
  try {
    const usr = await User.findOne({ userName: userName });
    if (usr) {
      res.json({ stat: true, err: false });
    } else {
      res.json({ stat: false, err: false });
    }
  } catch (err) {
    res.json({ stat: false, err: true });
  }
});

router.post("/auth-user-login", async (req, res) => {
  const { userName, password } = req.body;
  try {
    const usr = await User.findOne({ userName: userName });
    if (!usr) {
      res.json({ stat: false, usr: false, err: false });
    } else if (usr.password == password) {
      res.json({ stat: true, usr: true, err: false });
    } else {
      res.json({ stat: false, usr: true, err: false });
    }
  } catch (err) {
    console.log("Error in loging user");
    console.log(err);
    res.json({ stat: false, usr: false, err: true });
  }
});

module.exports = router;
