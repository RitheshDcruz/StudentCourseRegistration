import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { getStudentCourses } from "../../api/studentApi";
import { deleteCourseApi } from "../../api/courseApi";

import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { withRouter, useHistory } from "react-router-dom";
import ShowCoursesPage from "../course/ShowCoursesPage";

function ShowStudentCourses(props) {
  const { ShowAllCourses, setShowcourse } = props;
  const [showstudentcourses, setShowstudentcourses] = useState("");
  const [courses, setcourses] = useState([]);
  const { history, userid } = props;
  useEffect(() => {
    const fetchData = async () => {
      console.log("history" + JSON.stringify(history));
      console.log("userid" + userid);

      getStudentCourses(userid)
        .then(response => {
          if (response.data !== undefined) {
            setcourses(response.data.courses);
            console.log("saved " + JSON.stringify(response.data));
          }
        })
        .catch(error => {
          console.log(error);
        });
    };

    fetchData();
  }, [showstudentcourses]);

  const editCourse = id => {
    console.log(history.path);

    history.push("/editcourse/" + id);
  };

  const deleteCourse = id => {
    deleteCourseApi(id)
      .then(response => {
        if (response.status === 200) {
          // setShowcourse("y");
          // ShowAllCourses();
          if (showstudentcourses === "") {
            setShowstudentcourses("y");
          } else {
            setShowstudentcourses("");
          }

          // history.push({
          //   pathname: "/viewallcourses"
          // });
          console.log("saved " + JSON.stringify(response.data));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <Jumbotron>
        <ListGroup>
          {courses.map((item, idx) => (
            <>
              <ListGroup.Item key={item._id} action>
                Course Name :{item.courseName} &nbsp;| Course Code :
                {item.courseCode} &nbsp;
                <Button
                  action
                  type="button"
                  variant="danger"
                  onClick={() => {
                    deleteCourse(item._id);
                  }}
                >
                  Delete
                </Button>
                &nbsp;
              </ListGroup.Item>
              <Button
                type="button"
                action
                variant="primary"
                onClick={() => {
                  editCourse(item._id);
                }}
              >
                Edit
              </Button>
            </>
          ))}
        </ListGroup>
      </Jumbotron>
    </div>
  );
}

export default withRouter(ShowStudentCourses);
