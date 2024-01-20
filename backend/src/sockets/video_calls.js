const callMap = new Map();

function videoCall(socket, io, getSocketMap) {
  socket.on("startVideoCall", (creds) => {
    const sid = getSocketMap().get(creds.chatUser);
    if (creds.userName === creds.chatUser) {
      socket.emit("callStat", { onCall: false, stat: "Invalid" });
    } else if (sid) {
      sid.forEach((id) => {
        socket.emit("callStat", { onCall: true, stat: "Calling..." });
        io.to(id).emit("callRequest", creds);
      });
    } else {
      socket.emit("callStat", { onCall: false, stat: "User Offline" });
    }
  });

  socket.on("declineCall", (data) => {
    const sid = getSocketMap().get(data.userName);
    io.to(data.cSid).emit("callDeclined");
    sid.forEach((id) => {
      io.to(id).emit("callDeclined");
    });
  });

  socket.on("cancleCall", (cUser) => {
    const sid = getSocketMap().get(cUser);
    try {
      sid.forEach((id) => {
        io.to(id).emit("callCancled");
      });
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("add-new-call", (data) => {
    if (data.me && data.and) {
      callMap.set(data.me, data.and);
      console.log(callMap);
    }
  });

  socket.on("remove-from-calls", () => {
    callMap.delete(socket.id);
  });

  socket.on("disconnect", () => {
    const id = callMap.get(socket.id);
    io.to(id).emit("end-call-on-close");
    callMap.delete(socket.id);
  });
}

module.exports = videoCall;
