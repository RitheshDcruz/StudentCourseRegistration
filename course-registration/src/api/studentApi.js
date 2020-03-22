import { handleResponse, handleError } from "./apiUtils";
import axios from "axios";
const baseUrl = process.env.API_URL + "/students/";
const courseUrl = process.env.API_URL + "/course/";
export function getStudents() {
  return axios
    .get(baseUrl)
    .then(response => {
      console.log("response in axios getStudents " + JSON.stringify(response));
      return response;
    })
    .catch(error => {
      console.log(error);
    });
}
export function getStudent(id) {
  return axios
    .get(baseUrl + id)
    .then(response => {
      console.log("response in axios  getStudent" + JSON.stringify(response));
      return response;
    })
    .catch(error => {
      console.log(error);
    });
}

export function getCoursesStudents(courseid) {
  return axios
    .get(courseUrl + "students/" + courseid)
    .then(response => {
      console.log("response in axios  getStudent" + JSON.stringify(response));
      return response;
    })
    .catch(error => {
      console.log(error);
    });
}

export function getStudentCourses(id) {
  return axios
    .get(baseUrl + id + "/" + "courses")
    .then(response => {
      console.log("response in axios " + JSON.stringify(response));

      return response;
    })
    .catch(error => {
      console.log(error);
    });
}

export function deleteStudentApi(id) {
  return axios
    .delete(baseUrl + id + "/")
    .then(response => {
      console.log("response in axios " + JSON.stringify(response));

      return response;
    })
    .catch(error => {
      console.log(error);
    });
}

export function saveStudent(student) {
  return axios
    .post(baseUrl, student)
    .then(response => {
      console.log("response in axios " + JSON.stringify(response));

      return response;
    })
    .catch(error => {
      console.log(error);
    });
}
export function updateStudent(student, id) {
  return axios
    .put(baseUrl + id + "/", student)
    .then(response => {
      console.log("response in axios " + JSON.stringify(response));

      return response;
    })
    .catch(error => {
      console.log(error);
    });
}

export function deleteCourse(courseId) {
  return fetch(baseUrl + courseId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
