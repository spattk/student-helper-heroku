import React, { Component } from "react";
import { Menu, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default class MenuExampleVerticalPointing extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Container >
        <Menu pointing vertical style={{backgroundColor:'#F07C41', border: "0.5px solid #193D62"}}>
          <Link to="/dashboard">
            <Menu.Item
              name="dashboard"
              active={activeItem === "dashboard"}
              onClick={this.handleItemClick}
              style={{color:"white", fontWeight:"bold", fontSize:'15px', border: "0.5px solid #193D62"}}
            />
          </Link>

          <Link to="/projects">
            <Menu.Item
              name="projects"
              active={activeItem === "projects"}
              onClick={this.handleItemClick}
              style={{color:"white", fontWeight:"bold", border: "0.5px solid #193D62"}}
            />
          </Link>

          <Link to="/groups">
            <Menu.Item
              name="groups"
              active={activeItem === "groups"}
              onClick={this.handleItemClick}
              style={{color:"white", fontWeight:"bold", border: "0.5px solid #193D62"}}
            />
          </Link>

          <Link to="/students">
            <Menu.Item
              name="students"
              active={activeItem === "students"}
              onClick={this.handleItemClick}
              style={{color:"white", fontWeight:"bold", border: "0.5px solid #193D62"}}
            />
          </Link>
          
          <Link to="/professors">
            <Menu.Item
              name="professors"
              active={activeItem === "professors"}
              onClick={this.handleItemClick}
              style={{color:"white", fontWeight:"bold", border: "0.5px solid #193D62"}}
            />
          </Link>

          <Link to="/users">
            <Menu.Item
              name="users"
              active={activeItem === "users"}
              onClick={this.handleItemClick}
              style={{color:"white", fontWeight:"bold", border: "0.5px solid #193D62"}}
            />
          </Link>

        </Menu>
      </Container>
    );
  }
}
