import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  Container,
  Grid,
  Header,
  Icon,
  Modal,
  Form,
} from "semantic-ui-react";
import "../css/App.css";
import Footer from "./Footer";
import MenuHeader from "./MenuHeader";
import StoryCard from "./StoryCard";
import VerticalNavigation from "./VerticalNavigation";

const Kanban = (props) => {
  const styles = [
    {
      backgroundColor: "#f8ad9d",
    },
    {
      backgroundColor: "#f6bd60",
    },
    {
      backgroundColor: "#2ec4b6",
    },
    {
      backgroundColor: "#0077b6",
    },
  ];

  let { id } = useParams();
  const [project, setProject] = useState([]);
  const [projectStories, setProjectStories] = useState([]);
  const [todoStories, setTodoStories] = useState([]);
  const [devStories, setDevStories] = useState([]);
  const [reviewStories, setReviewStories] = useState([]);
  const [releasedStories, setReleasedStories] = useState([]);
  const [allDevelopers, setAllDevelopers] = useState([]);

  const getProjectDetails = async () => {
    try {
      const projectResponse = await fetch(
        `/projects/${id}`
      );
      const projectJsonData = await projectResponse.json();
      setProject(projectJsonData);
      let allDevelopersArray = [];
      const allDevelopersResponse = await fetch(
        `/projects/${id}/developers`
      );
      const allDevelopersResponseJson = await allDevelopersResponse.json();
      allDevelopersArray.push("update-dev");
      for (let i = 0; i < allDevelopersResponseJson.length; i++) {
        allDevelopersArray.push(allDevelopersResponseJson[i].developer_name);
      }
      setAllDevelopers(allDevelopersArray);

      const projectStoriesResponse = await fetch(
        `/projects/${id}/stories`
      );
      const storyJsonData = await projectStoriesResponse.json();
      setProjectStories(storyJsonData);
      let temp = [];
      setProjectStories((state) => {
        temp = state.filter((story) => story.status === "TODO");
        setTodoStories(temp);

        temp = state.filter((story) => story.status === "IN_PROGRESS");
        setDevStories(temp);

        temp = state.filter((story) => story.status === "IN_REVIEW");
        setReviewStories(temp);

        temp = state.filter((story) => story.status === "COMPLETED");
        setReleasedStories(temp);

        return state;
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProjectDetails();
  }, [id]);

  const [open, setOpen] = React.useState(false);
  const [formState, setFormState] = useState({
    formName: "",
    formDesc: "",
    formPoints: "",
    formStatus: "",
    formDeveloper: "",
  });
  const submit = () => {
    fetch("/stories", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        story_name: formState.formName,
        story_description: formState.formDesc,
        story_points: formState.formPoints,
        status: formState.formStatus,
        project_id: id,
        developer_id: formState.formDeveloper,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        getProjectDetails();
        setFormState({
          formName: "",
          formDesc: "",
          formPoints: "",
          formStatus: "",
          formDeveloper: "",
        });
      });
    setOpen(false);
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <Container fluid={true}>
      <MenuHeader token={props.token} setToken={props.setToken}  />
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <VerticalNavigation />
          </Grid.Column>
          <Grid.Column width={13}>
            <h2
              style={{
                marginTop: "10px",
                textAlign: "center",
                border: "1px solid black",
                marginLeft: "-20px",
                marginRight: "10px",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              {project.project_name} Kanban Board
              <Modal
                closeIcon
                open={open}
                trigger={
                  <Button
                    style={{
                      float: "right",
                      backgroundColor: "#193D62",
                      color: "white",
                    }}
                  >
                    Add Story
                  </Button>
                }
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
              >
                <Header content="Add New Story" />
                <Modal.Content scrolling>
                  <Form>
                    <Form.Field>
                      <label>Name</label>
                      <input
                        name="formName"
                        placeholder="Name"
                        value={formState.formName}
                        onChange={handleChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Description</label>
                      <input
                        name="formDesc"
                        placeholder="Description"
                        value={formState.formDesc}
                        onChange={handleChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Points</label>
                      <input
                        name="formPoints"
                        placeholder="Points"
                        value={formState.formPoints}
                        onChange={handleChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Status</label>
                      <input
                        name="formStatus"
                        placeholder="Status"
                        value={formState.formStatus}
                        onChange={handleChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Developer ID</label>
                      <input
                        name="formDeveloper"
                        placeholder="Developer ID"
                        value={formState.formDeveloper}
                        onChange={handleChange}
                      />
                    </Form.Field>
                  </Form>
                </Modal.Content>
                <Modal.Actions>
                  <Button color="green" onClick={submit}>
                    <Icon name="checkmark" /> Submit
                  </Button>
                </Modal.Actions>
              </Modal>
            </h2>

            <Grid>
              <Grid.Row>
                <Grid.Column width={4}>
                  <h4 style={{ textAlign: "center" }}>TODO</h4>
                  <Card.Group
                    style={{ border: "1px solid grey", borderRadius: "10px" }}
                  >
                    {todoStories.map((story, index) => (
                      <StoryCard
                        key={story.story_id}
                        content={story.story_description}
                        card_style={styles[0]}
                        developer_name={story.developer}
                        story_points={story.story_points}
                        story_id={story.story_id}
                        update_story_handler={getProjectDetails}
                        bg_color={styles[0].backgroundColor}
                        text_color="black"
                        all_developers={allDevelopers}
                      />
                    ))}
                    {/* <StoryCard
                      content="Add auto-generated IDs to DB in the insert APIs"
                      card_style={styles[0]}
                    /> */}

                    {/* <StoryCard
                      content="Kanban board story create API"
                      card_style={styles[0]}
                    />

                    <StoryCard
                      content="/project/:p_id/stories API"
                      card_style={styles[0]}
                    />

                    <StoryCard
                      content="Swagger Documentation API integration"
                      card_style={styles[0]}
                    />

                    <StoryCard
                      content="Github latest commit fetch API"
                      card_style={styles[0]}
                    /> */}
                  </Card.Group>
                </Grid.Column>
                <Grid.Column width={4}>
                  <h4 style={{ textAlign: "center" }}>IN_PROGRESS</h4>
                  <Card.Group
                    style={{ border: "1px solid grey", borderRadius: "10px" }}
                  >
                    {devStories.map((story, index) => (
                      <StoryCard
                        key={story.story_id}
                        content={story.story_description}
                        card_style={styles[1]}
                        developer_name={story.developer}
                        story_points={story.story_points}
                        story_id={story.story_id}
                        update_story_handler={getProjectDetails}
                        bg_color={styles[1].backgroundColor}
                        text_color="black"
                        all_developers={allDevelopers}
                      />
                    ))}

                    {/* <StoryCard
                      content="Integration of project ID with the Kanban Board"
                      card_style={styles[1]}
                    />

                    <StoryCard
                      content="Login and Authentication flow with setting up of session"
                      card_style={styles[1]}
                    />

                    <StoryCard
                      content="Hyperlink and control flow within the text."
                      card_style={styles[1]}
                    /> */}
                  </Card.Group>
                </Grid.Column>
                <Grid.Column width={4}>
                  <h4 style={{ textAlign: "center" }}>IN_REVIEW</h4>
                  <Card.Group
                    style={{ border: "1px solid grey", borderRadius: "10px" }}
                  >
                    {reviewStories.map((story, index) => (
                      <StoryCard
                        key={story.story_id}
                        content={story.story_description}
                        card_style={styles[2]}
                        text_style={{ color: "white" }}
                        developer_name={story.developer}
                        story_points={story.story_points}
                        story_id={story.story_id}
                        update_story_handler={getProjectDetails}
                        bg_color={styles[2].backgroundColor}
                        text_color="white"
                        all_developers={allDevelopers}
                      />
                    ))}

                    {/* <StoryCard
                      content="Kanban board UI including Dev, StoryID, Story Points"
                      card_style={styles[2]}
                      text_style={{ color: "white" }}
                    />

                    <StoryCard
                      content="Create stories API"
                      card_style={styles[2]}
                      text_style={{ color: "white" }}
                    />

                    <StoryCard
                      content="Update story status API (TODO -> DEV)"
                      card_style={styles[2]}
                      text_style={{ color: "white" }}
                    /> */}
                  </Card.Group>
                </Grid.Column>
                <Grid.Column width={4}>
                  <h4 style={{ textAlign: "center" }}>COMPLETED</h4>
                  <Card.Group
                    style={{ border: "1px solid grey", borderRadius: "10px" }}
                  >
                    {releasedStories.map((story, index) => (
                      <StoryCard
                        key={story.story_id}
                        content={story.story_description}
                        card_style={styles[3]}
                        text_style={{ color: "white" }}
                        developer_name={story.developer}
                        story_points={story.story_points}
                        story_id={story.story_id}
                        update_story_handler={getProjectDetails}
                        bg_color={styles[3].backgroundColor}
                        text_color="white"
                        all_developers={allDevelopers}
                      />
                    ))}

                    {/* <StoryCard
                      content="Client Side Routing"
                      card_style={styles[3]}
                      text_style={{ color: "white" }}
                    />

                    <StoryCard
                      content="Kanban board base UI"
                      card_style={styles[3]}
                      text_style={{ color: "white" }}
                    />

                    <StoryCard
                      content="GET APIs with Postman v2.1 Collections"
                      card_style={styles[3]}
                      text_style={{ color: "white" }}
                    /> */}
                  </Card.Group>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Footer></Footer>
    </Container>
  );
};

export default Kanban;
