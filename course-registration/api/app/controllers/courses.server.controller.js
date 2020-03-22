const Student = require("mongoose").model("Student");
const Course = require("mongoose").model("Course");
//getAllStudents() = require("./students.server.controller");

const mongoose = require("mongoose");

exports.getAllCourses = function(req, res, next) {
  //find the student then its comments using Promise mechanism of Mongoose
  Course.find({}, (err, courses) => {
    if (err) {
      return getErrorMessage(err);
    } else {
      //

      res.status(200).json(courses);
    }
  });
};

exports.getCourse = function(req, res, next) {
  Course.findOne({ _id: req.params.courseid }, (err, course) => {
    if (err) {
      return getErrorMessage(err);
    } else {
      //
      res.status(200).json(course);
    }
  });
};

exports.deleteCourse = function(req, res, next) {
  const rawcourseid = req.path.split("/")[2];
  //find the student then its comments using Promise mechanism of Mongoose
  Course.remove(
    { _id: mongoose.Types.ObjectId(rawcourseid) },
    (err, course) => {
      if (err) {
        return getErrorMessage(err);
      }

      return res.status(200).json(course);
    }
  );
};

//{ fruits: { $in: [ "apples", "oranges" ] }

exports.addCourse = function(req, res, next) {
  console.log(req.params.studentId);
  console.log(JSON.stringify(req.body));
  console.log("######" + req.body.courseName);

  Course.create(
    {
      _id: mongoose.Types.ObjectId(),
      courseName: req.body.courseName,
      courseCode: req.body.courseCode,
      section: req.body.section,
      semester: req.body.semester
    },
    (err, course) => {
      if (err) {
        console.log(err);
      }

      //
      else {
        console.log("inside student in addcourse");
        console.log(course._id);

        Student.findByIdAndUpdate(
          mongoose.Types.ObjectId(req.params.studentId),
          { $push: { courses: course } },
          { safe: true, upsert: true },
          function(err, model) {
            if (err) {
              console.log(err);
            } else {
              return res.status(200).send({ screen: "main page" });
            }
          }
        );

        console.log("inside student in addcourse");
        return res;
      }
    }
  );
};

exports.updateCourse = function(req, res, next) {
  // Use the 'User' static 'findOne' method to retrieve a specific user
  const rawcourseid = req.path.split("/")[2];
  console.log(req.body);

  Course.findByIdAndUpdate(rawcourseid, req.body, function(err, course) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      // Set the 'req.user' property

      console.log(course);

      return res.status(200).json(course);
    }
  });
};
exports.deleteCommentsById = function(req, res, next) {
  const commentid = req.path.split("/")[2];
  const rawstudentid = req.path.split("/")[3];
  //find the student then its comments using Promise mechanism of Mongoose
  Comment.remove(
    { _id: mongoose.Types.ObjectId(commentid) },
    (err, comments) => {
      if (err) {
        return getErrorMessage(err);
      }
    }
  );

  Comment.find(
    { student: mongoose.Types.ObjectId(rawstudentid) },
    (err, comments) => {
      if (err) {
        return getErrorMessage(err);
      }
      //

      res.render("listcomments", {
        title: "Comment by student",
        comments: comments,
        rawstudentid: rawstudentid
      });
    }
  );
};
