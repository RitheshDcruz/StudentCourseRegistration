import { handleResponse, handleError } from "./apiUtils";
import axios from "axios";
const baseUrl = process.env.API_URL;
const studentsUrl = baseUrl + "/students";
const coursesUrl = baseUrl + "/courses";
const courseUrl = baseUrl + "/course";

export function getAllCourses() {
  return axios
    .get(coursesUrl)
    .then(response => {
      console.log("response in axios " + JSON.stringify(response));

      return response;
    })
    .catch(error => {
      console.log(error);
    });
}
export function getCourse(id) {
  return axios
    .get(courseUrl + "/" + id)
    .then(response => {
      console.log("response in axios " + JSON.stringify(response.data));

      return response;
    })
    .catch(error => {
      console.log(error);
    });
}

export function deleteCourseApi(id) {
  return axios
    .delete(courseUrl + "/" + id)
    .then(response => {
      console.log(
        "response in axios  deleteCourseApi" + JSON.stringify(response)
      );

      return response;
    })
    .catch(error => {
      console.log(error);
    });
}
export function updateCourse(course, id) {
  return axios
    .put(coursesUrl + "/" + id, course)
    .then(response => {
      console.log("response in axios  updateCourse" + JSON.stringify(response));

      return response;
    })
    .catch(error => {
      console.log(error);
    });
}
export function saveStudentCourse(course, id) {
  return axios
    .post(studentsUrl + "/" + id + "/course", course)
    .then(response => {
      console.log("response in axios " + JSON.stringify(response));

      return response;
    })
    .catch(error => {
      console.log(error);
    });
}
