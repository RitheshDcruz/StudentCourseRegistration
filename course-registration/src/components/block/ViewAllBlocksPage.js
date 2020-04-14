import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { getAllBlocks } from "../../api/blockApi";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { withRouter, useHistory } from "react-router-dom";

function ViewAllBlockPage(props) {
  const [blocks, setBlocks] = useState([]);
  const { history } = props;

  useEffect(() => {
    const fetchData = async () => {
      getAllBlocks()
        .then(response => {
          if (response.data !== undefined) {
            setBlocks(response.data);
            console.log("saved " + JSON.stringify(response.data));
          }
        })
        .catch(error => {
          console.log(error);
        });
    };

    fetchData();
  }, []);

  const showDetail = id => {
    console.log(id);
    history.push({
      pathname: "/showblocksdetails/" + id
    });
  };
  return (
    <div>
      <Jumbotron>
        <ListGroup>
          {blocks.map((item, idx) => (
            <>
              <ListGroup.Item
                key={item._id}
                action
                onClick={() => showDetail(item._id)}
              >
                {item.blockName} | {item.blockStream} &nbsp;
              </ListGroup.Item>
            </>
          ))}
        </ListGroup>
      </Jumbotron>
    </div>
  );
}

export default withRouter(ViewAllBlockPage);
