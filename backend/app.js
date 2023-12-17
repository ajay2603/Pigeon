//node modules imports
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

//custom modules import *api and constants
const userAuth = require("./src/api/userauth");
const userInfoFetch = require("./src/api/usrDetReq");
const { dbConnector, clientUrl } = require("./src/const");

//middleware setups
app.use(express.json());
app.use(express.static("public"));
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

//Start Server
const port = process.env.PORT || 5050;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
