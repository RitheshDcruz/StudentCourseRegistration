import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";
import React, { useState } from "react";
import { saveblock, saveblockCourse } from "../../api/blockApi";

function CreateBlock(props) {
  const { userid, screen, setScreen, setBlock } = props;

  console.log("props.screen", props.screen);
  const [block, setNewBlock] = useState({
    blockName: "",
    blockStream: ""
  });

  const saveBlock = e => {
    e.preventDefault();
    const data = {
      blockName: block.blockName,
      blockStream: block.blockStream
 
    };
    //
    saveblock(block)
      .then(result => {
        console.log("results from saveStudentCourse", result);
        //props.history.push("/showarticle/" + result.data._id);
        if (result.data.screen !== undefined) {
          console.log("from saveStudentCourse");
          setBlock("");
          setScreen(result.data.screen);
        }
      })
      .catch(error => {});
  };
  //
  const onChange = e => {
    e.persist();
    setNewBlock({ ...block, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2> Create a Block </h2>

      <Jumbotron>
        <Form onSubmit={saveBlock}>
          <Form.Group>
            <Form.Label> Block Name</Form.Label>
            <Form.Control
              type="text"
              name="blockName"
              id="blockName"
              value={block.blockName}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label> Block Stream</Form.Label>
            <Form.Control
              type="text"
              name="blockStream"
              id="blockStream"
              value={block.blockStream}
              onChange={onChange}
            />
          </Form.Group>
          

          <Button variant="primary" type="submit">
            Save Block
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(CreateBlock);
