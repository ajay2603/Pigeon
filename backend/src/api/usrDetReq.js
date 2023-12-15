const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { model } = require("mongoose");
const User = require("../database/db").users;

router.use(express.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/chat-list-info", async (req, res) => {
  const usr = req.query.userName;
  try {
    const usrDet = await User.findOne({ userName: usr });

    var picPath = "";
    if (!usrDet.profilePicPath) picPath = "/profile_pics/def_profile.jpg";
    else picPath = usrDet.profilePicPath;

    res.json({
      stat: true,
      userName: usrDet.userName,
      firstName: usrDet.firstName,
      lastName: usrDet.lastName,
      profilePicPath: picPath,
    });
  } catch (err) {
    res.json({ stat: false });
  }
});

module.exports = router;
