const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

app.use(express.json());
app.use(cors());

const userAuth = require("./src/api/userauth");

const dbConnector = require("./src/const");
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(dbConnector)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Error in connecting to DB");
    console.log(err);
  });

app.use("/api/user-auth", userAuth);

const port = process.env.PORT || 5050;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
