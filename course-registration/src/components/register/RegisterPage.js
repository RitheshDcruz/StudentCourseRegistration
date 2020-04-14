import React, { useEffect, useState } from "react";
import { saveStudent } from "../../api/studentApi";
import TextInput from "../common/TextInput";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//this register page whew thw sutdent registers
const RegisterPage = ({ history, ...props }) => {
  const [student, setStudent] = useState({});

  useEffect(() => {
    console.log("useEffect");
    setStudent({ ...props.student });
    console.log("useEffect");
  }, [props.student]);

  function handleChange(event) {
    console.log("handleChange");
    const { name, value } = event.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  }

  function handleSave(event) {
    console.log("handleSave");
    event.preventDefault();
    console.log(student.firstName);

    saveStudent(student)
      .then((response) => {
        console.log("saved " + response);
        if (response.data !== undefined) {
          history.push("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <form onSubmit={handleSave}>
      <h2>Add Student</h2>
      <TextInput
        name="studentNumber"
        label="Student Number :"
        onChange={handleChange}
        // value={student.firstName}
      />
      <TextInput
        name="address"
        label="Address :"
        onChange={handleChange}
        // value={student.firstName}
      />
      <TextInput
        name="city"
        label="City :"
        onChange={handleChange}
        // value={student.firstName}
      />
      <TextInput
        name="phoneNumber"
        label="Phone Number :"
        onChange={handleChange}
        // value={student.firstName}
      />
      <TextInput
        name="program"
        label="Program :"
        onChange={handleChange}
        // value={student.firstName}
      />
      <TextInput
        name="firstName"
        label="First Name :"
        onChange={handleChange}
        // value={student.firstName}
      />
      <TextInput
        name="lastName"
        label="LastName :"
        onChange={handleChange}
        // value={student.LastName}
      />
      <TextInput
        name="email"
        label="Email :"
        onChange={handleChange}
        //  value={student.email}
      />
      <TextInput
        name="password"
        label="Password :"
        onChange={handleChange}
        //  value={student.passeword}
      />

      <button type="submit" className="btn btn-primary">
        {"Save"}
      </button>
    </form>
  );
};

RegisterPage.propTypes = {
  student: PropTypes.object,
  saveStudent: PropTypes.func,
  history: PropTypes.object,
};
function mapStateToProps(state) {
  return {};
}
const mapDispatchToProps = {
  saveStudent,
};
export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
