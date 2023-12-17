const { model } = require("mongoose");
const dbConnector =
  "mongodb://127.0.0.1:27017/pegionDB?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.1";

const clientUrl = "http://localhost:5173";
module.exports = { dbConnector, clientUrl };
