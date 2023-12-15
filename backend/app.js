const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const userAuth = require("./src/api/userauth");
const userInfoFetch = require("./src/api/usrDetReq");
const dbConnector = require("./src/const");

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/user-auth", userAuth);
app.use("/api/fetch/user-details", userInfoFetch);

mongoose
  .connect(dbConnector)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Error in connecting to DB");
    console.log(err);
  });

const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

const socketHandler = require("./src/sockets/socket");

socketHandler(io);

const port = process.env.PORT || 5050;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
