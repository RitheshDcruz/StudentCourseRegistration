import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { getStudents, deleteStudentApi } from "../../api/studentApi";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { withRouter, useHistory } from "react-router-dom";

function ViewAllStudentsPage(props) {
  const [students, setstudents] = useState([]);
  const { history } = props;
  useEffect(() => {
    const fetchData = async () => {
      getStudents()
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

  const editStudent = id => {
    console.log(history.path);

    history.push("/editstudent/" + id);
  };

  const deleteStudent = id => {
    deleteStudentApi(id)
      .then(response => {
        if (response.data !== undefined) {
          history.push({
            pathname: "/viewallstudents"
          });
          console.log("saved " + JSON.stringify(response.data));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const showDetail = id => {
    history.push({
      pathname: "/showcourses/" + id
    });
  };
  return (
    <div>
      <Jumbotron>
        <ListGroup>
          {students.map((item, idx) => (
            <>
              <ListGroup.Item
                key={item._id}
                action
                onClick={() => {
                  showDetail(item._id);
                }}
              >
                {item.email} &nbsp;
                <Button
                  action
                  type="button"
                  variant="danger"
                  onClick={() => {
                    deleteStudent(item._id);
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
                  editStudent(item._id);
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

export default withRouter(ViewAllStudentsPage);
