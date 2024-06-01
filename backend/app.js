//importing modules
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { dbConnector, clientUrl } = require("./src/const");

//middleware setup
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [clientUrl],
    credentials: true,
  })
);

const userAuth = require("./src/api/userauth");
const userInfoFetch = require("./src/api/usrDetReq");
const messages = require("./src/api/messages");
const userInfoUpdate = require("./src/api/userDetUpdt");

app.use("/api/user-auth", userAuth);
app.use("/api/fetch/user-details", userInfoFetch);
app.use("/api/messages/chats", messages);
app.use("/api/update/user-details", userInfoUpdate);

//database connection
mongoose
  .connect(dbConnector)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Error in connecting to DB");
    console.error(err);
  });

//firebase initilizatision
const fb = require("./src/firebase/messaging");
fb.initFireBase();

//socket setup
const http = require("http");
const socketIO = require("socket.io");
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: clientUrl,
    credentials: true,
  },
});

const socketHandler = require("./src/sockets/socket_main");
socketHandler.setupSocketIO(io);

app.get("/", (req, res) => {
  res.send(
    `This is "Pigeon-Chat" App\'s Server!<br><a href="${process.env.CLIENT_URL}">Click here to visit Pigeon-chat`
  );
});

//running server
const port = process.env.PORT || 5050;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
