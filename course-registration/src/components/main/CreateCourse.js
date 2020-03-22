import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";
import React, { useState } from "react";
import { saveStudentCourse } from "../../api/courseApi";

function CreateCourse(props) {
  const { userid, screen, setScreen, setCourse } = props;

  console.log("props.screen", props.screen);
  const [course, setNewCourse] = useState({
    courseName: "",
    courseCode: "",
    section: "",
    semester: ""
  });

  const saveCourse = e => {
    e.preventDefault();
    const data = {
      courseName: course.courseName,
      courseCode: course.courseCode,
      section: course.section,
      semester: course.semester
    };
    //
    saveStudentCourse(course, userid)
      .then(result => {
        console.log("results from saveStudentCourse", result);
        //props.history.push("/showarticle/" + result.data._id);
        if (result.data.screen !== undefined) {
          console.log("from saveStudentCourse");
          setCourse("");
          setScreen(result.data.screen);
        }
      })
      .catch(error => {});
  };
  //
  const onChange = e => {
    e.persist();
    setNewCourse({ ...course, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2> Create an Course </h2>

      <Jumbotron>
        <Form onSubmit={saveCourse}>
          <Form.Group>
            <Form.Label> Course Name</Form.Label>
            <Form.Control
              type="text"
              name="courseName"
              id="title"
              value={course.courseName}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label> Course Code</Form.Label>
            <Form.Control
              type="text"
              name="courseCode"
              id="content"
              value={course.courseCode}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label> Section</Form.Label>
            <Form.Control
              type="text"
              name="section"
              id="content"
              value={course.section}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label> Semester</Form.Label>
            <Form.Control
              type="text"
              name="semester"
              id="content"
              value={course.semester}
              onChange={onChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Save Course
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(CreateCourse);
