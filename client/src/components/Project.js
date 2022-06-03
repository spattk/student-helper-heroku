import React from "react";
import { Link } from "react-router-dom";
import { Button, Item } from "semantic-ui-react";

const Project = (props) => {
  return (
    <Item style={{ border: "1px solid #193D62", borderRadius: '12px', padding: "10px", color:"#193D62" }}>
      <Item.Image
        size="tiny"
        src="https://react.semantic-ui.com/images/wireframe/image.png"
      />

      <Item.Content style={{color:"#193D62"}}>
        <Item.Header as="a">{props.name}</Item.Header>
        <Item.Meta>Project Metadata</Item.Meta>
        <Item.Description>{props.description}</Item.Description>

        <Item.Extra>
          <Link to={`/kanban/${props.project_id}`}>
            <Button style={{backgroundColor:"#193D62", color:"white"}} >Kanban Board</Button>
          </Link>
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

export default Project;
