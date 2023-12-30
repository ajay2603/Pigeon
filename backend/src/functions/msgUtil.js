const { userchats: Chats } = require("../database/db_models"); // Assuming userchats is the model
const moveIndexFront = require("../functions/index_move");

const updateChats = async (userName, toUser) => {
  try {
    // Find the chat for the specified user
    let chat = await Chats.findOne({ userName });

    if (chat) {
      const idx = chat.chats.indexOf(toUser);
      if (idx === -1) {
        chat.chats.unshift(toUser);
      } else {
        chat.chats = moveIndexFront(chat.chats, toUser);
      }

      await chat.save();
      return true;
    } else {
      // If chat doesn't exist, create a new one
      const newChat = new Chats({ userName, chats: [toUser] });
      await newChat.save();
      console.log("New chat created");
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = { updateChats };
