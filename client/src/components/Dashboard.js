import React from "react";
import { Container, Grid } from "semantic-ui-react";
import "../css/App.css";
import background from "../img/12226.jpeg";
import Footer from "./Footer";
import MenuHeader from "./MenuHeader";
import RecentProjects from "./RecentProjects";
import VerticalNavigation from "./VerticalNavigation";

function Dashboard(props) {
  return (
    <Container fluid={true}>
      <div style={{ backgroundImage: `url(${background})` }}>
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
      </div>
      <Footer></Footer>
    </Container>
  );
}

export default Dashboard;
