import React from "react";
import { Container, Grid } from "semantic-ui-react";
import "../css/App.css";
import Footer from "./Footer";
import MenuHeader from "./MenuHeader";
import RecentProjects from "./RecentProjects";
import VerticalNavigation from "./VerticalNavigation";

function Projects(props) {
  return (
    <Container fluid={true}>
      <MenuHeader token={props.token} setToken={props.setToken} />
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <VerticalNavigation />
          </Grid.Column>
          <Grid.Column width={13}>
            <RecentProjects />
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Footer></Footer>
    </Container>
  );
}

export default Projects;
