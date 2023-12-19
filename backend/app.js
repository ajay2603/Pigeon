//node modules imports
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//custom modules import *api and constants
const userAuth = require("./src/api/userauth");
const userInfoFetch = require("./src/api/usrDetReq");
const { dbConnector, clientUrl } = require("./src/const");

//middleware setups
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

//middleware setups api routes *custom
app.use("/api/user-auth", userAuth);
app.use("/api/fetch/user-details", userInfoFetch);

//database connection
mongoose
  .connect(dbConnector)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Error in connecting to DB");
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send(true);
});

//sockets
const http = require("http");
const socketIO = require("socket.io");
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: clientUrl,
    credentials: true,
  },
});

const socket = require("./src/sockets/socket_main");
socket(io);

//Start Server
const port = process.env.PORT || 5050;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
