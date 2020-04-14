const Student = require("mongoose").model("Student");
const Course = require("mongoose").model("Course");
const Block = require("mongoose").model("Block");
//getAllStudents() = require("./students.server.controller");

const mongoose = require("mongoose");

exports.getAllBlocks = function(req, res, next) {
  //find the Blocks then its comments using Promise mechanism of Mongoose
  Block.find({}, (err, courses) => {
    if (err) {
      return getErrorMessage(err);
    } else {
      res.status(200).json(courses);
    }
  });
};

exports.getBlockById = function(req, res, next) {
  console.log(req.params.courseid)
  Block.findOne({ _id: req.params.courseid }, (err, course) => {
    if (err) {
      return getErrorMessage(err);
    } else {
      //
      res.status(200).json(course);
    }
  });
};

exports.deleteBlock = function(req, res, next) {
  const rawcourseid = req.path.split("/")[2];
  //find the student then its comments using Promise mechanism of Mongoose
  Block.remove(
    { _id: mongoose.Types.ObjectId(rawcourseid) },
    (err, block) => {
      if (err) {
        return getErrorMessage(err);
      }

      return res.status(200).json(block);
    }
  );
};

//{ fruits: { $in: [ "apples", "oranges" ] }

exports.addBlock = function(req, res, next) {
  console.log(req.params.studentId);
  console.log(JSON.stringify(req.body));
  console.log("######" + req.body.blockName);

  Block.create(
    {
      _id: mongoose.Types.ObjectId(),
      blockName:req.body.blockName,
      blockStream: req.body.blockStream


    },
    (err, course) => {
      if (err) {
        console.log(err);
      }

    }
  );
};
exports.updateBlock = function(req, res, next) {
  // Use the 'User' static 'findOne' method to retrieve a specific user
  const rawcourseid = req.path.split("/")[2];
  console.log(req.body);

  Block.findByIdAndUpdate(rawcourseid, req.body, function(err, block) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      // Set the 'req.user' property

      console.log(Block);

      return res.status(200).json(block);
    }
  });
};

exports.addCourseToBlock = function(req, res, next){


  Block.findByIdAndUpdate(
    mongoose.Types.ObjectId(req.params.blockId),
    { $push: { blockCourses: Course.findById(req.params.courseid) } },
    { safe: true, upsert: true },
    function(err, model) {
      if (err) {
        console.log(err);
      } else {
        return res.status(200).send({ screen: "main page" });
      }
    }
  );
}
