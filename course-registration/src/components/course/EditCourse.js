import React, { useState, useEffect } from "react";
import { getCourse, updateCourse } from "../../api/courseApi";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";

function EditCourse(props) {
  const [course, setCourse] = useState({});

  //runs only once after the first render
  useEffect(() => {
    console.log("EditCourse");
    //call api
    const fetchData = async () => {
      getCourse(props.match.params.courseid)
        .then(response => {
          if (response.data !== undefined) {
            setCourse(response.data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    };

    fetchData();
  }, []);

  const updateCourse = e => {
    e.preventDefault();
    updateCourse(course, course._id)
      .then(response => {
        if (response.data !== undefined) {
          props.history.push("/viewallcourses");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  //runs when user enters a field
  const onChange = e => {
    e.persist();
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Jumbotron>
        <Form onSubmit={updateCourse}>
          <Form.Group>
            <Form.Label> Course Name</Form.Label>
            <Form.Control
              type="text"
              name="courseName"
              id="courseName"
              placeholder="Enter Course Name"
              value={course.courseName}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label> Semester</Form.Label>
            <Form.Control
              type="text"
              name="semester"
              id="semester"
              placeholder="Enter semeter"
              value={course.semester}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Section</Form.Label>
            <Form.Control
              type="text"
              name="section"
              id="section"
              placeholder="Enter Section"
              value={course.section}
              onChange={onChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(EditCourse);
