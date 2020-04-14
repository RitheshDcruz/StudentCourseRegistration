import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { getCoursesStudents } from "../../api/studentApi";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { withRouter, useHistory } from "react-router-dom";

function ShowCoursesStudentPage(props) {
  const [students, setstudents] = useState([]);
  const { history } = props;
  useEffect(() => {
    const fetchData = async () => {
      getCoursesStudents(props.match.params.courseid)
        .then(response => {
          if (response.data !== undefined) {
            setstudents(response.data);
            console.log("saved " + JSON.stringify(response.data));
          }
        })
        .catch(error => {
          console.log(error);
        });
    };

    fetchData();
  }, []);

  return (
    <div>
      <Jumbotron>
        <ListGroup>
          {students.map((item, idx) => (
            <ListGroup.Item key={item._id} action>
              {"Email :"} {item.email} &nbsp;| {"First Name :"}&nbsp;
              {item.firstName} &nbsp;|&nbsp; {"Last Name :"}&nbsp;
              {item.lastName} &nbsp;
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Jumbotron>
    </div>
  );
}

export default withRouter(ShowCoursesStudentPage);
