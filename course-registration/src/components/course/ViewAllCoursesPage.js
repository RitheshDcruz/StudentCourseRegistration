import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { getAllCourses } from "../../api/courseApi";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { withRouter, useHistory } from "react-router-dom";

function ViewAllCoursesPage(props) {
  const [courses, setCourses] = useState([]);
  const { history } = props;

  useEffect(() => {
    const fetchData = async () => {
      getAllCourses()
        .then(response => {
          if (response.data !== undefined) {
            setCourses(response.data);
            console.log("saved " + JSON.stringify(response.data));
          }
        })
        .catch(error => {
          console.log(error);
        });
    };

    fetchData();
  }, []);

  const showDetail = id => {
    console.log(id);
    history.push({
      pathname: "/showcoursesstudent/" + id
    });
  };
  return (
    <div>
      <Jumbotron>
        <ListGroup>
          {courses.map((item, idx) => (
            <>
              <ListGroup.Item
                key={item._id}
                action
                onClick={() => showDetail(item._id)}
              >
                {item.courseName} &nbsp;
              </ListGroup.Item>
            </>
          ))}
        </ListGroup>
      </Jumbotron>
    </div>
  );
}

export default withRouter(ViewAllCoursesPage);
