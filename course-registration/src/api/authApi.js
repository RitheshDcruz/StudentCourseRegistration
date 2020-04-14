import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/read_cookie/";
const signInUrl = process.env.API_URL + "/signin/";
const signOutUrl = process.env.API_URL + "/signout/";

import axios from "axios";
export function getReadCookie() {
  return axios.get("/read_cookie");
}

export function postLogin(loginData) {
  return axios
    .post(signInUrl, loginData)
    .then(response => {
      console.log("response in postLogin axios " + JSON.stringify(response));

      return response;
    })
    .catch(error => {
      console.log(error);
    });
}

export function getSignOut() {
  return axios
    .get(signOutUrl)
    .then(response => {
      console.log("response in getSignOut axios " + JSON.stringify(response));

      return response;
    })
    .catch(error => {
      console.log(error);
    });
}
export function getCourses() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}
