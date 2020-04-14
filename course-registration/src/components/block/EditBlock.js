import React, { useState, useEffect } from "react";
import { getBlock,updateBloc } from "../../api/blockApi";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";

function EditBlock(props) {
  const [block, setBlock] = useState({});

  //runs only once after the first render
  useEffect(() => {
    console.log("EditBlock");
    //call api
    const fetchData = async () => {
      getBlock(props.match.params.blockid)
        .then(response => {
          if (response.data !== undefined) {
            setBlock(response.data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    };

    fetchData();
  }, []);

  const updateBlock = e => {
    e.preventDefault();
    updateBloc(block, block._id)
      .then(response => {
        if (response.data !== undefined) {
          props.history.push("/viewallcourses");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  //runs when user enters a field
  const onChange = e => {
    e.persist();
    setBlock({ ...block, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <Jumbotron>
        <Form onSubmit={updateBloc}>
          <Form.Group>
            <Form.Label>Block Name</Form.Label>
            <Form.Control
              type="text"
              name="blockName"
              id="blockName"
              placeholder="Enter block Name"
              value={block.blockName}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Block Stream</Form.Label>
            <Form.Control
              type="text"
              name="blockStream"
              id="blockStream"
              placeholder="Enter block Stream"
              value={block.blockStream}
              onChange={onChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(EditBlock);
