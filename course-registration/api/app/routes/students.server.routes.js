const students = require("../../app/controllers/students.server.controller");
const courses = require("../../app/controllers/courses.server.controller");

// Define the routes students module
module.exports = function (app) {
  app.route("/students").post(students.create).get(students.getAllStudents);

  app
    .route("/students/:studentid")
    .put(students.updateStudent)
    .get(students.getStudent)
    .delete(students.deleteStudent);
  app.post("/signin", students.authenticate);
  app.get("/signout", students.signout);
  app.route("/students/:studentId/course").post(courses.addCourse);
  app.route("/students/:studentId/courses").get(students.getCourses);

  app.param("studentId", students.studentByID);
};
