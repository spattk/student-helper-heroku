import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Kanban from "./Kanban";
import Profesors from "./Professors";
import Projects from "./Projects";
import Students from "./Students";
import Users from "./Users";

const Views = (props) => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Dashboard token={props.token} setToken={props.setToken} />}
      />
      <Route
        path="dashboard"
        element={<Dashboard token={props.token} setToken={props.setToken} />}
      />
      <Route
        path="students"
        element={<Students token={props.token} setToken={props.setToken} />}
      />
      <Route
        path="professors"
        element={<Profesors token={props.token} setToken={props.setToken} />}
      />
      <Route
        path="users"
        element={<Users token={props.token} setToken={props.setToken} />}
      />
      <Route
        path="projects"
        element={<Projects token={props.token} setToken={props.setToken} />}
      />
      <Route
        path="kanban/:id"
        element={<Kanban token={props.token} setToken={props.setToken} />}
      />
      {/* <Route path="login" element={<Login setToken={setToken} />} /> */}
    </Routes>
  );
};

export default Views;
