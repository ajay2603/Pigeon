const authConnection = require("../functions/auth").authSessionLogin;

const socketIO = async (io) => {
  io.on("connection", async (socket) => {
    const { userName, logID } = socket.handshake.query;

    const result = await authConnection(userName, logID);

    if (!result.stat) {
      socket.disconnect();
    }

    socket.on("clientEvent", (data) => {
      console.log("Received data from client:", data);
    });
  });
};

module.exports = socketIO;
