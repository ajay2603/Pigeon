const express = require("express");
const router = express.Router();
const { model } = require("mongoose");
const { messages } = require("../database/db_models");
const { app } = require("firebase-admin");
const { getFBAdmin } = require("./messages");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const User = require("../database/db_models").users;
const Chats = require("../database/db_models").userchats;
const authSessionLogin = require("../functions/auth").authSessionLogin;

router.put("/:userName/:logID", async (req, res) => {
  let userName = req.cookies.userName || req.params.userName;
  let logID = req.cookies.logID || req.params.logID;

  console.log("called");

  if (!userName || !logID) {
    return res
      .status(400)
      .json({ stat: false, message: "Missing userName or logID" });
  }

  try {
    const result = await authSessionLogin(userName, logID);

    if (!result) {
      return res
        .status(401)
        .json({ stat: false, message: "Authentication failed" });
    }

    console.log(req.body);

    const updateResult = await User.findOneAndUpdate(
      { userName },
      { $set: req.body }
    );

    if (updateResult) {
      let info_fields = Object.keys(req.body);
      let result = {};
      info_fields.forEach((field) => {
        result[field] = updateResult[field];
      });
      return res.status(200).json({ stat: true, data: result });
    } else {
      return res.status(404).json({ stat: false, message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ stat: false, message: "Internal server error" });
  }
});

router.put("/password/:userName/:logID", async (req, res) => {
  let userName = req.cookies.userName || req.params.userName;
  let logID = req.cookies.logID || req.params.logID;

  const result = await authSessionLogin(userName, logID);

  if (!result) {
    return res.status(401).json({ msg: "Unauthorized request" });
  }

  const pass = req.body;

  if (!pass.password || !pass.newPassword) {
    return res.status(400).json({ msg: "Some fields are empty" });
  }

  if (pass.newPassword != pass.confirmPassword)
    return res
      .status(400)
      .json({ msg: "Password and confirm password are not same" });

  User.findOne({ userName })
    .then((usr) => {
      if (usr) {
        if (usr.password == pass.password) {
          usr.password = pass.newPassword;
          usr
            .save()
            .then((_) => {
              return res.status(200).json({ msg: "Password updated" });
            })
            .catch((err) => {
              console.error(err);
              return res.status(500).json({ msg: "Unable to update password" });
            });
        } else {
          return res.status(400).json({ msg: "Incorrect password" });
        }
      }
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json("Unable to fetch data");
    });
});

router.put("/dp/:userName/:logID", upload.single("image"), async (req, res) => {
  let userName = req.cookies.userName || req.params.userName;
  let logID = req.cookies.logID || req.params.logID;

  const result = await authSessionLogin(userName, logID);

  if (!result) {
    return res.status(401).json({ msg: "Unauthorized request" });
  }

  const admin = getFBAdmin();
  const bucket = admin.storage().bucket();

  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded." });
    }

    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    blobStream.on("error", (err) => {
      console.error(err);
      res.status(500).json({ msg: "Unable to upload file." });
    });

    blobStream.on("finish", () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      User.findOne({ userName })
        .then((resp) => {
          resp.profilePicPath = publicUrl;
          resp
            .save()
            .then(() => {
              res.status(200).json({ profilePicPath: publicUrl });
            })
            .catch((err) => {
              console.error(err);
              res.status(500).json({ msg: "Unable to update DP" });
            });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ msg: "Unable to update DP" });
        });
    });

    blobStream.end(req.file.buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error." });
  }
});

module.exports = router;
