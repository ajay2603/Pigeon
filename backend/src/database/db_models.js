const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: String,
  firstName: String,
  lastName: String,
  password: String,
  profilePicPath: String,
});
const user = mongoose.model("user", userSchema);

const userLogSchema = new mongoose.Schema({
  userName: String,
  clients: [
    {
      logId: String,
      addedAt: { type: Date, default: Date.now },
      expiresAt: {
        type: Date,
        expires: 259200,
        default: () => new Date(Date.now() + 259200000),
      }, // expires after 3 days of creation
    },
  ],
});
const UserLog = mongoose.model("userlog", userLogSchema);

const userChatSchema = new mongoose.Schema({
  userName: String,
  chats: [String],
});
const userChat = mongoose.model("userchat", userChatSchema);

const messagesSchema = new mongoose.Schema({
  users: [String],
  messages: [
    {
      user: String,
      text: String,
      time: Date,
      id: String,
    },
  ],
});

const message = new mongoose.model("message", messagesSchema);

module.exports = {
  users: user,
  userlogs: UserLog,
  userchats: userChat,
  messages: message,
};
