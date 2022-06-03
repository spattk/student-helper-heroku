import React from "react";
import { Card } from "semantic-ui-react";

const Professor = (props) => {
  return (
    <Card style={{ maxWidth: "250px", border: "1px solid #193D62" }}>
      <Card.Content style={{ backgroundColor: "#E6E6E6" }}>
        <Card.Header>{props.name}</Card.Header>
        <Card.Meta style={{ textTransform: "capitalize" }}>
          {props.designation}
        </Card.Meta>
        <Card.Description>
          <div>
            <b>Username:</b> {props.username} <br />
            <b>Email </b>: {props.email} <br />
            <b>Phone </b>: {props.phone} <br />
            <b>Dept </b>: {props.department} <br />
          </div>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default Professor;
