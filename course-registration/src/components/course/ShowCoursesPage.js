import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { getStudentCourses } from "../../api/studentApi";
//import { useParams } from "react-router";
import { withRouter, useParams } from "react-router-dom";

function ShowCoursesPage(props) {
  const [courses, setCourses] = useState([]);

  //delete func
  // Customer.findOneAndUpdate(query, {$pull: {address: addressId}}, function(err, data){
  //   if(err) {
  //     return res.status(500).json({'error' : 'error in deleting address'});
  //   }

  //   res.json(data);

  // });
  useEffect(() => {
    const fetchData = async () => {
      console.log(props.match.params.studentid);
      getStudentCourses(props.match.params.studentid)
        .then(response => {
          if (response.data !== undefined) {
            setCourses(response.data.courses);
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
      <ListGroup>
        {courses.map((item, idx) => (
          <ListGroup.Item key={item._id} action>
            Course Name : {item.courseName}
            {"    "}
            || Course Code : {item.courseCode}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default withRouter(ShowCoursesPage);
