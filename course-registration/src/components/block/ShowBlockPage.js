import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { getBlock } from "../../api/blockApi";
//import { useParams } from "react-router";
import { withRouter, useParams } from "react-router-dom";

function ShowBlocksPage(props) {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      getBlock(props.match.params.blockid)
        .then(response => {
          if (response.data !== undefined) {
            setBlocks(response.data);
            console.log("saved..........." + JSON.stringify(response.data));
          }
          console.log("saved " + JSON.stringify(response));
        })
        .catch(error => {
          console.log("-------------------------"+error);
        });
    };

    fetchData();
  }, []);

  return (
    <div>
      <ListGroup>
       
          <ListGroup.Item key={blocks._id} action>
            Block Name : {blocks.blockName}
            {"\n    "}
            <br></br>
            Block Stream : {blocks.blockStream}
            {"\n    "}
            <br></br>
            Block Courses: ...
          </ListGroup.Item>
       
      </ListGroup>
    </div>
  );
}

export default withRouter(ShowBlocksPage);
