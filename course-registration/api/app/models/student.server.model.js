const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
const saltRounds = 10;
//this definses a student Schema'

const StudentSchema = new Schema({
  studentNumber: String,
  address: String,
  city: String,
  phoneNumber: String,
  program: String,
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    // Set an email index
    index: true,
    // Validate the email format
    match: /.+\@.+\..+/,
  },
  courses: [{ type: Schema.ObjectId, ref: "Course" }],

  password: {
    type: String,
    // Validate the 'password' value length
    validate: [(password) => password.length >= 6, "Password Should Be Longer"],
  },
});
StudentSchema.pre("save", function (next) {
  //hash the password before saving it
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});
StudentSchema.methods.authenticate = function (password) {
  //compare the hashed password of the database
  //with the hashed version of the password the user enters
  return this.password === bcrypt.hashSync(password, saltRounds);
};

StudentSchema.methods.hashPassword = function (password) {
  //console.log(crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex'))
  return crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha1")
    .toString("hex");
};

// Create the 'Student' model out of the 'StudentSchema'
mongoose.model("Student", StudentSchema);
