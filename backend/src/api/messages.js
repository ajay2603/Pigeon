const express = require("express");
const router = express.Router();

const Messages = require("../database/db_models").messages;

const socket = require("../sockets/socket_main").ioInstance;

const authSessionLogin = require("../functions/auth").authSessionLogin;
const updateChats = require("../functions/msgUtil").updateChats;

router.post("/send-message", async (req, res) => {
  const nowTime = new Date();
  const { userName, logID } = req.cookies;
  const result = await authSessionLogin(userName, logID);
  const { toUser, message } = req.body;
  if (result.stat === true) {
    const msgs = await Messages.findOne({
      users: { $all: [userName, toUser] },
    });
    if (msgs) {
      msgs.messages.push({ text: message, time: nowTime, user: userName });
      msgs
        .save()
        .then(async () => {
          await updateChats(userName, toUser);
          await updateChats(toUser, userName);
          res.json({ stat: true, time: nowTime });
        })
        .catch((err) => {
          console.log(err);
          res.json({
            stat: false,
            msg: "internal server error while sending message",
          });
        });
    } else {
      const newChat = new Messages({
        users: [userName, toUser],
        message: [{ text: message, time: nowTime, user: userName }],
      });
      newChat
        .save()
        .then(async () => {
          await updateChats(userName, toUser);
          await updateChats(toUser, userName);
          res.json({ stat: true, time: nowTime });
        })
        .catch((err) => {
          console.log(err);
          res.json({
            stat: false,
            msg: "internal server error while sending message",
          });
        });
    }
  }
});

module.exports = router;
