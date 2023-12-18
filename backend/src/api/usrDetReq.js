const express = require("express");
const router = express.Router();
const { model } = require("mongoose");

const User = require("../database/db_models").users;
const Chats = require("../database/db_models").userchats;
const authSessionLogin = require("../functions/auth").authSessionLogin;

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

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

router.post("/get-user-chats", async (req, res) => {
  const { userName, logID } = req.cookies;
  const result = await authSessionLogin(userName, logID);
  if (result.stat === true) {
    const userChats = await Chats.findOne({ userName: userName });
    if (userChats) {
      res.json({ stat: true, chats: userChats.chats });
    } else {
      const newChats = new Chats({
        userName: userName,
        chats: [],
      });
      await newChats.save();
      res.json({ stat: true, chats: [] });
    }
  } else {
    res.json(result);
  }
});

module.exports = router;
