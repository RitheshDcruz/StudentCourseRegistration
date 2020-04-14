const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlockSchema = new Schema({
  blockName: {
    type: String,
    default:"",
    trim: true
  },
  blockStream: {
    type: String,
    default:"",
    trim: true
  },
  blockCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  }]
});

mongoose.model("Block", BlockSchema);
