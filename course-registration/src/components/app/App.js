import "./App.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import React from "react";
import { Route, Switch, Router } from "react-router-dom";
import HomePage from "../home/HomePage";
import Header from "../common/Header";
import PageNotFound from "./PageNotFound";
import LoginPage from "../login/login";

import RegisterPage from "../register/RegisterPage";
import EditStudent from "../students/EditStudent";
import ViewAllStudentsPage from "../students/ViewAllStudentsPage";
import ViewAllCoursesPage from "../course/ViewAllCoursesPage";
import ShowCoursesStudentPage from "../course/ShowCoursesStudentPage";

import EditCourse from "../course/EditCourse";
import ShowCoursesPage from "../course/ShowCoursesPage";

import EditBlock from "../block/EditBlock";
import ViewAllBlocksPage from "../block/ViewAllBlocksPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShowBlockPage from "../block/ShowBlockPage";

function App() {
  return (
    <>
      <div className="container-fluid">
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />

          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/viewallstudents" component={ViewAllStudentsPage} />
          <Route
            path="/showcoursesstudent/:courseid"
            component={ShowCoursesStudentPage}
          />
          <Route
            path="/showblocksdetails/:blockid"
            component={ShowBlockPage}
          />

          <Route path="/viewallcourses" component={ViewAllCoursesPage} />
          <Route path="/editcourse/:courseid" component={EditCourse} />
          <Route path="/editstudent/:studentid" component={EditStudent} />
          <Route path="/showcourses/:studentid" component={ShowCoursesPage} />

          <Route path="/viewallblocks" component={ViewAllBlocksPage} />
          <Route path="/editblock/:blockid" component={EditBlock} />
          <Route component={PageNotFound} />
        </Switch>
        <ToastContainer autoClose={3000} hideProgressBar />
      </div>
    </>
  );
}

export default App;
