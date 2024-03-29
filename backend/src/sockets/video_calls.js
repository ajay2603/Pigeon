const callMap = new Map();

function videoCall(socket, io, getSocketMap) {
  socket.on("startVideoCall", (creds) => {
    const sid = getSocketMap().get(creds.chatUser);
    if (creds.userName === creds.chatUser) {
      socket.emit("callStat", { onCall: false, stat: "Invalid" });
    } else if (sid) {
      let isBusy = false;
      const keys = [...callMap.keys()];
      sid.forEach((key) => {
        if (keys.includes(key)) {
          isBusy = true;
          return;
        }
      });
      if (isBusy) {
        socket.emit("callStat", { onCall: false, stat: "User Busy" });
      } else {
        sid.forEach((id) => {
          socket.emit("callStat", {
            onCall: true,
            stat: `Calling ${creds.chatUser}`,
          });
          io.to(id).emit("callRequest", creds);
        });
      }
    } else {
      socket.emit("callStat", { onCall: false, stat: "User Offline" });
    }
  });

  socket.on("declineCall", (data) => {
    console.log(data);
    const sid = getSocketMap().get(data.userName);
    io.to(data.cSid).emit("callDeclined", { same: true });
    sid.forEach((id) => {
      io.to(id).emit("callDeclined", { same: false });
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

  socket.on("answerCall", (userName) => {
    const sid = getSocketMap().get(userName);
    console.log(sid);
    sid.forEach((id) => {
      if (id != socket.id) {
        io.to(id).emit("callCancled");
      }
    });
  });

  socket.on("add-new-call", (data) => {
    if (data.me && data.and) {
      callMap.set(data.me, data.and);
    }
  });

  socket.on("remove-from-calls", () => {
    if (callMap.has(socket.id)) callMap.delete(socket.id);
  });

  socket.on("disconnect", () => {
    const id = callMap.get(socket.id);
    io.to(id).emit("end-call-on-close");
    callMap.delete(socket.id);
  });
}

module.exports = videoCall;
