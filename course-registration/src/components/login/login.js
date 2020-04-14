import TextInput from "../common/TextInput";
import Main from "../main/main";
import { Link, withRouter } from "react-router-dom";
import { postLogin, getReadCookie } from "../../api/authApi";
import React, { useState, useEffect } from "react";

//

const LoginPage = () => {
  //state variable for the screen, admin or user
  const [screen, setScreen] = useState("auth");
  //store input field data, user name and password
  const [email, setEmail] = useState();
  const [userid, setUserid] = useState();
  const [password, setPassword] = useState();

  const readCookie = async () => {
    console.log("--- in readCookie function ---");
    getReadCookie()
      .then(res => {
        if (res.data.screen !== undefined) {
          setScreen(res.data.screen);
          console.log(res.data.screen);
        }
      })
      .catch(error => {
        setScreen("auth");
        console.log(error);
      });
  };
  //

  const auth = async () => {
    console.log("calling auth");
    console.log(email);
    try {
      //make a get request to /authenticate end-point on the server
      const loginData = { auth: { email, password } };
      //call api
      const res = await postLogin(loginData);

      console.log(res.data.screen);
      //process the response
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        setUserid(res.data.studentId);
        console.log(res.data.screen);
      }
    } catch (e) {
      //print the error
      console.log(e);
    }
  };

  return (
    <>
      {screen === "auth" ? (
        <div>
          <label>Email : </label>
          <br />
          <input type="text" onChange={e => setEmail(e.target.value)} />
          <br />
          <label>Password: </label>
          <br />
          <input type="password" onChange={e => setPassword(e.target.value)} />
          <br />
          <button onClick={auth}>Login</button>
        </div>
      ) : (
        <Main screen={screen} setScreen={setScreen} userid={userid} />
      )}
    </>
  );
};

export default withRouter(LoginPage);

//
