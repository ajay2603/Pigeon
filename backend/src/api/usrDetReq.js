const express = require("express");
const router = express.Router();
const { model } = require("mongoose");

const User = require("../database/db_models").users;
const Chats = require("../database/db_models").userchats;
const authSessionLogin = require("../functions/auth").authSessionLogin;

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
  const { userName, logID } = req.body;
  const result = await authSessionLogin(userName, logID);
  if (result.stat === true) {
    const userChats = await Chats.findOne({ userName: userName });
    if (userChats) {
      res.json({
        stat: true,
        chats: userChats.chats,
        userName: userName,
        logID: logID,
      });
    } else {
      const newChats = new Chats({
        userName: userName,
        chats: [],
      });
      await newChats.save();
      res.json({
        stat: true,
        chats: [],
        userName: userName,
        logID: logID,
      });
    }
  } else {
    res.json(result);
  }
});

router.get("/get-search-users-list", async (req, res) => {
  const substring = req.query.userName;
  try {
    const usernamesStartingWithSubstring = await User.find({
      userName: { $regex: `^${substring}`, $options: "i" },
    })
      .select("userName")
      .limit(10);

    const count = usernamesStartingWithSubstring.length;

    if (count < 10) {
      const additionalUsernames = await User.find({
        userName: { $regex: substring, $options: "i" },
      })
        .select("userName")
        .limit(10 - count);

      const allUsernames = [
        ...usernamesStartingWithSubstring,
        ...additionalUsernames,
      ];

      const uniqueUsernames = [
        ...new Set(allUsernames.map((user) => user.userName)),
      ];

      res.json({ list: uniqueUsernames, stat: true });
    } else {
      const uniqueUsernames = [
        ...new Set(usernamesStartingWithSubstring.map((user) => user.userName)),
      ];

      res.json({ list: uniqueUsernames, stat: true });
    }
  } catch (error) {
    res.json({ stat: false });
  }
});

module.exports = router;
