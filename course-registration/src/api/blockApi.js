import { handleResponse, handleError } from "./apiUtils";
import axios from "axios";
const baseUrl = process.env.API_URL;
const studentsUrl = baseUrl + "/students";
const coursesUrl = baseUrl + "/courses";
const courseUrl = baseUrl + "/course";
const blocksUrl = baseUrl + "/blocks";
const blockUrl = baseUrl + "/block";

export function getAllBlocks() {
  return axios
    .get(blocksUrl)
    .then(response => {
      console.log("response in axios " + JSON.stringify(response));

      return response;
    })
    .catch(error => {
      console.log(error);
    });
}
export function getBlock(id) {
  return axios
    .get(blockUrl + "/" + id)
    .then(response => {
      console.log("response in axios " + JSON.stringify(response.data));

      return response;
    })
    .catch(error => {
      console.log(error);
    });
}

export function updateBloc(block, id) {
  return axios
    .put(blocksUrl + "/" + id, block)
    .then(response => {
      console.log("response in axios  updateCourse" + JSON.stringify(response));

      return response;
    })
    .catch(error => {
      console.log(error);
    });
}

export function deleteBlockApi(id) {
  return axios
    .delete(blockUrl + "/" + id)
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
export function updateBlock(block, id) {
  return axios
    .put(blockUrl + "/" + id, block)
    .then(response => {
      console.log("response in axios  updateCourse" + JSON.stringify(response));

      return response;
    })
    .catch(error => {
      console.log(error);
    });
}
export function saveblockCourse(blockid, courseid) {
  return axios
    .post(blockUrl + "/" + blockid + "/", courseid)
    .then(response => {
      console.log("response in axios " + JSON.stringify(response));

      return response;
    })
    .catch(error => {
      console.log(error);
    });
}

export function saveblock(block) {
  return axios
    .post(blocksUrl, block)
    .then(response => {
      console.log("response in axios " + JSON.stringify(response));

      return response;
    })
    .catch(error => {
      console.log(error);
    });
}
