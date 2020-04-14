//import CreateArticle from "./CreateArticle";
import React, { useState } from "react";
import { getSignOut } from "../../api/authApi";
import CreateCourse from "./CreateCourse";
import CreateBlock from "./CreateBlock";
import ShowStudentCourses from "./ShowStudentCourses";
import { withRouter } from "react-router-dom";

//

//
function Main(props) {
  // read the info from props, coming from the ancestor component
  const { screen, setScreen, userid } = props;
  // return a stateful value and funcion to update it
  //const [data, setData] = useState();
  //
  const [course, setCourse] = useState("");
  const [block, setBlock] = useState("");
  const [showblock, setShowblock] = useState("");
  const [showcourse, setShowcourse] = useState("");
  // called when user clicks on Logout button
  // to clear the cookie and set the screen state variable
  // back to its initial state.
  const deleteCookie = async () => {
    try {
      await getSignOut()
        .then(response => {
          console.log(JSON.stringify(response));
          if (response.status === 200) {
            setScreen("auth");
          }
        })
        .catch(error => console.log(error));
    } catch (e) {
      console.log(e);
    }
  };
  // called when user clicks on Get Data button
  // end-point demonstrates another example for the use
  // of cookie specific response from the server.
  // const getData = async () => {
  //   try {
  //     const res = await axios.get("/welcome");
  //     console.log(res.data);
  //     setData(res.data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  //
  const createCourse = () => {
    console.log("in createcourse");
    setCourse("y");
    setShowcourse("");
  };
  const ShowAllCourses = () => {
    console.log("in ShowAllCourses");
    setCourse("");
    setShowcourse("y");
  };

  const createBlock = () => {
    console.log("in createcourse");
    setBlock("y");
    setShowblock("");
  };
  const ShowAllBlocks = () => {
    console.log("in ShowAllCourses");
    setBlock("");
    setShowblock("y");
  };
  //
  return (
    <div className="App">
      {course !== "y" ? (
        <div>
          <p>{screen}</p>

          <button onClick={ShowAllCourses}>Show All Courses </button>
          <button onClick={createCourse}>Create Course</button>
          <button onClick={deleteCookie}>Log out</button>
        </div>
      ) : (
        <CreateCourse
          screen={screen}
          setScreen={setScreen}
          setCourse={setCourse}
          userid={userid}
        />
      )}
      {showcourse === "y" && (
        <ShowStudentCourses
          userid={userid}
          ShowAllCourses={ShowAllCourses}
          setShowcourse={setShowcourse}
        />
      )}
      {block !== "y" ? (
        <div>
          <button onClick={ShowAllBlocks}>Show All BLocks </button>
          <button onClick={createBlock}>Create Block</button>
        </div>
      ) : (
        <CreateBlock
          screen={screen}
          setScreen={setScreen}
          setBlock={setBlock}
          userid={userid}
        />
      )}
      
      {showblock === "y" && (
        <ShowStudentCourses
          userid={userid}
          ShowAllBlocks={ShowAllBlocks}
          setShowblock={setShowblock}
        />
      )}
    </div>
  );
}

//
export default withRouter(Main);
