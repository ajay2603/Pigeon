require("dotenv").config();
const { model } = require("mongoose");
const dbConnector = process.env.DB_CONNECTOR;
const clientUrl = "http://localhost:5173";
module.exports = { dbConnector, clientUrl };
