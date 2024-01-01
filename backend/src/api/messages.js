const express = require("express");
const router = express.Router();

const Messages = require("../database/db_models").messages;

const { socketMaps, getSocketIoInstance } = require("../sockets/socket_main");

const authSessionLogin = require("../functions/auth").authSessionLogin;
const updateChats = require("../functions/msgUtil").updateChats;

router.post("/send-message", async (req, res) => {
  const socketIo = getSocketIoInstance();
  const nowTime = new Date();
  const { userName, logID } = req.cookies;
  const result = await authSessionLogin(userName, logID);
  const { toUser, message, msgId } = req.body;
  if (result.stat === true) {
    const msgs = await Messages.findOne({
      users: { $all: [userName, toUser] },
    });
    if (msgs) {
      const newAddMsg = {
        text: message,
        time: nowTime,
        user: userName,
        id: msgId,
      };
      msgs.messages.push(newAddMsg);
      msgs
        .save()
        .then(async () => {
          await updateChats(userName, toUser);
          await updateChats(toUser, userName);
          socketMaps.get(userName).forEach((id) => {
            socketIo.to(id).emit("resLiveMsg", {
              from: userName,
              to: toUser,
              msg: newAddMsg,
            });
          });
          if (socketMaps.has(toUser)) {
            socketMaps.get(toUser).forEach((id) => {
              socketIo.to(id).emit("resLiveMsg", {
                from: userName,
                to: toUser,
                msg: newAddMsg,
              });
            });
          }
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
      const newAddMsg = {
        text: message,
        time: nowTime,
        user: userName,
        id: msgId,
      };
      const newChat = new Messages({
        users: [userName, toUser],
        messages: [newAddMsg],
      });
      newChat
        .save()
        .then(async () => {
          await updateChats(userName, toUser);
          await updateChats(toUser, userName);
          socketMaps.get(userName).forEach((id) => {
            socketIo.to(id).emit("resLiveMsg", {
              from: userName,
              to: toUser,
              msg: newAddMsg,
            });
          });
          socketMaps.get(toUser).forEach((id) => {
            socketIo.to(id).emit("resLiveMsg", {
              from: userName,
              to: toUser,
              msg: newAddMsg,
            });
          });
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

router.post("/fetch-previous-messages", async (req, res) => {
  const { userName, logID } = req.cookies;
  const { toUser } = req.body;
  try {
    const result = await authSessionLogin(userName, logID);
    if (result.stat === true) {
      const msgs = await Messages.findOne({
        users: { $all: [userName, toUser] },
      });
      if (msgs) {
        res.json({ stat: true, err: false, messages: msgs.messages });
      } else {
        res.json({ stat: true, err: false, messages: [] });
      }
    } else {
      res.json({ stat: false, err: false });
    }
  } catch (err) {
    res.json({ stat: false, err: true });
  }
});

module.exports = router;
