import React from "react";
import "../src/css/App.css";
import Login from "./components/Login";
import Views from "./components/Views";
import useToken from "./useToken";

function App() {
  const { token, setToken } = useToken({});
  if (token == undefined || (token != undefined && token.auth == true)) {
    return <Login setToken={setToken} />;
  }
  return <Views token={token} setToken={setToken} />;
}

export default App;
