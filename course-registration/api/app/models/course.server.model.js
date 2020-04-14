const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this defines my course schema
const CourseSchema = new Schema({
  courseName: {
    type: String,
    default: "",
    trim: true,
  },
  courseCode: {
    type: String,
    unique: true,
    default: "",
    trim: true,
  },
  section: {
    type: String,
    default: "",
    trim: true,
  },
  semester: {
    type: String,
    default: "",
    trim: true,
  },
});
mongoose.model("Course", CourseSchema);
