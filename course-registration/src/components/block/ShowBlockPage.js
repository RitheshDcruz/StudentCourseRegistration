import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { getBlock } from "../../api/blockApi";
//import { useParams } from "react-router";
import { withRouter, useParams } from "react-router-dom";

function ShowBlocksPage(props) {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log(props.match.params.blockid);
      console.log("##################################");
      getBlock(props.match.params.blockid)
        .then(response => {
          if (response.data !== undefined) {
            setBlocks(response.data.blocks);
            console.log("saved " + JSON.stringify(response.data));
          }
        })
        .catch(error => {
          console.log(error);
        });
    };

    fetchData();
  }, []);

  return (
    <div>
      <ListGroup>
        {blocks.map((item, idx) => (
          <ListGroup.Item key={item._id} action>
            Block Name : {item.blockName}
            {"    "}
            || Block Stream : {item.blockStream}
            {"    "}
            Block Courses: ...
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default withRouter(ShowBlocksPage);
