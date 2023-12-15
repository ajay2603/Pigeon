module.exports = (io) => {
  io.on("connect", (socket) => {
    console.log("user Connected");

    socket.on("disconnect", () => {
      console.log("disconnect");
    });
  });
};
