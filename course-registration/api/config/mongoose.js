// Load the module dependencies
const config = require("./config");
const mongoose = require("mongoose");

// Define the Mongoose configuration method
module.exports = function() {
  // Use Mongoose to connect to MongoDB
  const db = mongoose.connect(config.db);

  require("../app/models/student.server.model");
  require("../app/models/course.server.model");

  var db1 = mongoose.connection;
  db1.on("error", console.log.bind(console, "connection error"));
  db1.once("open", function(callback) {
    console.log("connection succeeded");
  });

  // Return the Mongoose connection instance
  return db;
};
