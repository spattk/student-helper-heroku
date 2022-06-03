import React, { useState } from "react";
import { Card, Icon } from "semantic-ui-react";
import "../css/App.css";

const StoryCard = (props) => {
  const [statusType, setStatusType] = useState([
    "<status>",
    "TODO",
    "IN_PROGRESS",
    "IN_REVIEW",
    "COMPLETED",
  ]);
  const [devLen, setDevLen] = useState(props.all_dev_len);
  const Status = statusType.map((Status) => Status);
  const handleStatusTypeChange = (e) => {
    let storyId = e.target.parentElement.id;
    let storyJsonData;
    let updatedStoryStatus = statusType[e.target.value];

    fetch(`/stories/${storyId}`).then((response) =>
      response.json().then((result) => {
        storyJsonData = result;
        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            story_name: storyJsonData.story_name,
            story_description: storyJsonData.story_description,
            story_points: storyJsonData.story_points,
            status: updatedStoryStatus,
          }),
        };
        fetch(`/stories/${storyId}`, requestOptions).then(
          (response) =>
            response.json().then((result) => {
              console.log(result);
              props.update_story_handler();
            })
        );
      })
    );
  };

  const [dev, setDev] = useState(props.all_developers);
  const Devs = dev.map((Dev) => Dev);
  const handleDevNameChange = (e) => {
    let storyId = e.target.id;
    let developerJsonData, storyJsonData, updatedDeveloperId;
    let updatedDevName = dev[e.target.value];
    console.log("storyId in " + storyId + " " + updatedDevName);

    fetch(`/developer/${updatedDevName}`).then(
      (response) =>
        response.json().then((result) => {
          developerJsonData = result;
          updatedDeveloperId = developerJsonData.developer_id;

          fetch(`/stories/${storyId}`).then((response) =>
            response.json().then((result2) => {
              storyJsonData = result2;
              console.log(storyJsonData);
              const requestOptions = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  developer_id: updatedDeveloperId,
                  project_id: storyJsonData.project_id,
                }),
              };
              console.log("updating dev " + storyId);
              console.log(requestOptions);
              fetch(
                `/stories/${storyId}/developer`,
                requestOptions
              ).then((response) =>
                response.json().then((result) => {
                  console.log(result);
                  props.update_story_handler();
                })
              );
            })
          );
        })
    );
  };

  return (
    <Card style={props.card_style}>
      <Card.Content style={props.text_style}>
        <Card.Description content={props.content} style={props.text_style} />
        <br />
        <Icon name="user" />

        {props.developer_name}

        <a
          style={
            (props.text_style,
            {
              position: "absolute",
              right: "55px",
              color: "white",
              border: "1px dashed black",
              padding: "3px",
              borderRadius: "5px",
            })
          }
        >
          KB-{props.story_id}
        </a>

        <a
          style={
            (props.text_style,
            {
              position: "absolute",
              right: "10px",
              color: "white",
              border: "1px dashed black",
              padding: "3px",
              borderRadius: "5px",
            })
          }
        >
          <Icon name="clock outline" />
          {props.story_points}
        </a>
      </Card.Content>

      <Card.Content extra>
        <a style={props.text_style}>
          <select
            style={{
              width: "45%",
              fontSize: "12px",
              padding: "7px",
              backgroundColor: props.bg_color,
              color: props.text_color,
            }}
            id={props.story_id}
            onChange={(e) => handleDevNameChange(e)}
          >
            {Devs.map((dev, key) => (
              <option key={key} value={key}>
                {dev}
              </option>
            ))}
          </select>
        </a>

        <div
          style={{ width: "50%", float: "right", fontSize: "13px" }}
          id={props.story_id}
        >
          <select
            onChange={(e) => handleStatusTypeChange(e)}
            style={{
              width: "100%",
              fontSize: "12px",
              padding: "7px",
              backgroundColor: props.bg_color,
              color: props.text_color,
            }}
          >
            {Status.map((status, key) => (
              <option key={key} value={key}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </Card.Content>
    </Card>
  );
};

export default StoryCard;
