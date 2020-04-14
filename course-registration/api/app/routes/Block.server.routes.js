const courses = require("../../app/controllers/courses.server.controller");
const students = require("../../app/controllers/students.server.controller");
const Blocks = require("../../app/controllers/block.server.controller");

// Define the routes module' method
module.exports = function(app) {
  app.route("/blocks").get(Blocks.getAllBlocks)
     .post(Blocks.addBlock);
  app
    .route("/block/:blockid")
    .get(Blocks.getBlockById)
    .put(Blocks.updateBlock)
    .delete(Blocks.deleteBlock);
    app
    .route("/block/:blockID/:courseID")
    .put(Blocks.addCourseToBlock)
    
};
