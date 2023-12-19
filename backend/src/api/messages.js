const express = require("express");
const router = express.Router();

const User = require("../database/db_models").users;
const Logs = require("../database/db_models").userlogs;
const Chats = require("../database/db_models").userchats;
const messages = require("../database/db_models").messages;
