const Course = require("mongoose").model("Course");
const Student = require("mongoose").model("Student");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../../config/config");
const jwtExpirySeconds = 300;
const jwtKey = config.secretKey;
const bcrypt = require("bcrypt");

exports.studentByID = function(req, res, next, id) {
  // Use the 'User' static 'findOne' method to retrieve a specific user
  Student.findOne(
    {
      _id: id
    },
    (err, student) => {
      if (err) {
        // Call the next middleware with an error message
        return next(err);
      } else {
        // Set the 'req.user' property
        req.student = student;
        console.log(student);

        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
        // Call the next middleware
        next();
      }
    }
  );
};
exports.getStudent = function(req, res) {
  // Use the 'response' object to send a JSON response
  const rawstudentid = req.path.split("/")[2];
  Student.findById(rawstudentid, req.body, function(err, student) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      // Set the 'req.user' property

      console.log(student);
      // Call the next middleware
      return res.status(200).json(student);
    }
  });
};
exports.updateStudent = function(req, res, next) {
  // Use the 'User' static 'findOne' method to retrieve a specific user
  const rawstudentid = req.path.split("/")[2];
  console.log(req.body);

  Student.findByIdAndUpdate(rawstudentid, req.body, function(err, student) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      // Set the 'req.user' property

      console.log(student);
      // Call the next middleware
      return res.status(200).json(student);
    }
  });
};
exports.authenticate = function(req, res, next) {
  // Get credentials from request
  console.log(req.body);
  const email = req.body.auth.email;
  const password = req.body.auth.password.trim();

  //find the user with given username using static method findOne
  Student.findOne({ email: email }, (err, student) => {
    if (err) {
      return next(err);
    } else {
      //compare passwords
      if (bcrypt.compareSync(password, student.password)) {
        // Create a new token with the user id in the payload
        // and which expires 300 seconds after issue
        const token = jwt.sign({ email: student.email }, jwtKey, {
          algorithm: "HS256",
          expiresIn: jwtExpirySeconds
        });
        console.log("token:", token);
        // set the cookie as the token string, with a similar max age as the token
        // here, the max age is in milliseconds
        res.cookie("token", token, {
          maxAge: jwtExpirySeconds * 1000,
          httpOnly: true
        });
        res.status(200).send({ screen: student.email, studentId: student._id });
        //
        //res.json({status:"success", message: "user found!!!", data:{user:
        //user, token:token}});

        req.student = student;
        //call the next middleware
        next();
      } else {
        res.json({
          status: "error",
          message: "Invalid Email/password!!!",
          data: null
        });
      }
    }
  });
};

exports.getCourses = function(req, res, next) {
  // Use the 'User' static 'findOne' method to retrieve a specific user

  Student.findOne({ _id: req.params.studentId })
    .populate({
      path: "courses",
      select: "courseName courseCode "
      // Get friends of friends - populate the 'friends' array for every friend
      //populate: { path: "friends" }
    })
    .exec((err, courses) => {
      if (err) {
        return res.status(400).send({
          message: getErrorMessage(err)
        });
      } else {
        console.log(JSON.stringify(courses));
        res.status(200).json(courses);
      }
    });
};

exports.create = function(req, res, next) {
  // Create a new 'student' model instance
  const student = new Student(req.body);

  // Set the student provider property

  // Try saving the new student document
  student.save(function(err, response) {
    if (err) throw err;

    res.json(response);
  });
};

exports.createCourse = function(req, res, next) {
  const course = new Course(req.body);
  console.log(comment.student);
  // Use the 'User' instance's 'save' method to save a new user document
  course.save(err => {
    if (err) {
      // Call the next middleware with an error message
      return next(err);
    } else {
      return {}; // Use the 'response' object to send a JSON response
    }
  });
};

exports.getAllStudents = function(req, res, next) {
  // Use the 'User' static 'find' method to retrieve the list of users
  Student.find({}, (err, students) => {
    if (err) {
      // Call the next middleware with an error message
      return next(err);
    } else {
      // Use the 'response' object to send a JSON response

      res.json(students);
    }
  });
};

exports.getCourseStudents = function(req, res, next) {
  const rawcourseid = req.path.split("/")[3];
  // Use the 'User' static 'find' method to retrieve the list of users
  Student.find(
    { courses: { $in: [mongoose.Types.ObjectId(rawcourseid)] } },
    (err, students) => {
      if (err) {
        // Call the next middleware with an error message
        return next(err);
      } else {
        // Use the 'response' object to send a JSON response

        res.json(students);
      }
    }
  );
};

exports.deleteStudent = function(req, res, next) {
  const rawstudentid = req.path.split("/")[2];
  //find the student then its comments using Promise mechanism of Mongoose
  Student.remove(
    { _id: mongoose.Types.ObjectId(rawstudentid) },
    (err, student) => {
      if (err) {
        return getErrorMessage(err);
      }
      return res.status(200).json(student);
    }
  );
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  return res.status("200").json({ message: "signed out" });
  // Redirect the user back to the main application page
  //res.redirect('/');
};
