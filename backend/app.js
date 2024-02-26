const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const userAuth = require("./src/api/userauth");
const userInfoFetch = require("./src/api/usrDetReq");
const messages = require("./src/api/messages");
const { dbConnector, clientUrl } = require("./src/const");

//middleware setup
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: clientUrl,
    credentials: true,
  })
);

app.use("/api/user-auth", userAuth);
app.use("/api/fetch/user-details", userInfoFetch);
app.use("/api/messages/chats", messages);

//data base setup
mongoose
  .connect(dbConnector)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Error in connecting to DB");
    console.error(err);
  });

//firebase setup
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

const fs = require('fs');
const directoryPath = './'; // Replace with your actual directory path

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
  } else {
    console.log('List of files in the directory:');
    files.forEach((file) => {
      console.log(file);
    });
  }
});


const socketHandler = require("./src/sockets/socket_main");
socketHandler.setupSocketIO(io);

//run server

app.get("/", (req, res) => {
  res.send(true);
});

const port = process.env.PORT || 5050;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
