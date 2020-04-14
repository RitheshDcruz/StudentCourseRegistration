const courses = require("../../app/controllers/courses.server.controller");
const students = require("../../app/controllers/students.server.controller");

// Define the routes courses
module.exports = function (app) {
  app.route("/courses").get(courses.getAllCourses);
  app
    .route("/course/:courseid")
    .get(courses.getCourse)
    .put(courses.updateCourse)
    .delete(courses.deleteCourse);

  app.route("/course/students/:courseid").get(students.getCourseStudents);
};
