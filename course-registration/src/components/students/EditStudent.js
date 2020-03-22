import React, { useState, useEffect } from "react";
import { getStudent, updateStudent } from "../../api/studentApi";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";

function EditStudent(props) {
  const [student, setStudent] = useState({
    // _id: "",
    // address: "",
    // city: "",
    // phoneNumber: "",
    // firstName: "",
    // lastName: ""
  });

  //runs only once after the first render
  useEffect(() => {
    console.log("EditStudent");
    //call api
    const fetchData = async () => {
      getStudent(props.match.params.studentid)
        .then(response => {
          if (response.data !== undefined) {
            setStudent(response.data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    };

    fetchData();
  }, []);

  const updateStudent = e => {
    e.preventDefault();
    updateStudent(student, student._id)
      .then(response => {
        if (response.data !== undefined) {
          props.history.push("/viewallstudents");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  //runs when user enters a field
  const onChange = e => {
    e.persist();
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Jumbotron>
        <Form onSubmit={() => updateStudent}>
          <Form.Group>
            <Form.Label> First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter first name"
              value={student.firstName}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label> Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter last name"
              value={student.lastName}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              id="address"
              rows="3"
              placeholder="Enter address"
              value={student.address}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="Enter Phone Number"
              value={student.phoneNumber}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              id="city"
              placeholder="Enter city"
              value={student.city}
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

export default withRouter(EditStudent);
