require("dotenv").config();
const { model } = require("mongoose");
const dbConnector = process.env.DB_CONNECTOR;
const clientUrl = "http://192.168.0.103:5173"
module.exports = { dbConnector, clientUrl };
