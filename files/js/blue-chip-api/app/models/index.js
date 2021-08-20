const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.configs = require("./config.model.js")(mongoose);
db.designs = require("./design.model.js")(mongoose);

module.exports = db;
