import React, { useState } from "react";
import { Button, Container, Form, Grid } from "semantic-ui-react";
import "../css/App.css";
import "../css/Login.css";
import Footer from "./Footer";
import MenuHeader from "./MenuHeader";
import VerticalNavigation from "./VerticalNavigation";

async function loginUser(credentials) {
  return await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then((data) => data.json())
    .then((res) => res);
}

const Login = (props) => {
  // LOGIN
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [errorText, setErrorText] = useState();
  const [successText, setSuccessText] = useState();

  let isLogInSuccess = true;
  let isRegisterSuccess = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    console.log("login page");
    console.log(token);
    if (!token.auth) {
      isLogInSuccess = false;
      setErrorText("Invalid Username or Password !!!");
    } else {
      setErrorText(errorText);
      isLogInSuccess = true;
      localStorage.setItem("authToken", token.token);
    }
    props.setToken(token);
  };

  // REGISTER

  const handleRegister = async (e) => {
    console.log("register clicked");
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formState.formUsername,
        password: formState.formPassword,
        email: formState.formEmail,
        first_name: formState.formFName,
        last_name: formState.formLName,
        phone: formState.formPhone,
        role: formState.formRole,
        department: formState.formDepartment,
      }),
    };

    const response = await fetch("/users", requestOptions);
    const data = await response.json();
    if (data != undefined && data.user_id != undefined && data.user_id > 0) {
      setSuccessText("Registered Successfully !!!");
      setFormState({
        formUsername: "",
        formPassword: "",
        formEmail: "",
        formFName: "",
        formLName: "",
        formPhone: "",
        formRole: "",
        formDepartment: "",
      });
    } else {
      setSuccessText("Registration Failed!!");
    }
  };

  const [formState, setFormState] = useState({
    formUsername: "",
    formPassword: "",
    formEmail: "",
    formFName: "",
    formLName: "",
    formPhone: "",
    formRole: "",
    formDepartment: "",
  });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <Container fluid={true}>
      <div>
        <MenuHeader setToken={props.setToken} />
        <Grid>
          <Grid.Row>
            <Grid.Column width={3}>
              <VerticalNavigation />
            </Grid.Column>
            <Grid.Column width={6}>
              <h2
                style={{
                  marginTop: "10px",
                  textAlign: "center",
                  border: "1px solid black",
                  marginLeft: "10px",
                  marginRight: "10px",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                {" "}
                Login
              </h2>
              <Form
                style={{
                  padding: "20px",
                  border: "1px solid #193D62",
                  margin: "10px",
                  borderRadius: "10px",
                }}
              >
                <Form.Field>
                  <label>Username</label>
                  <input
                    placeholder="Username"
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <input
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                  />
                </Form.Field>
                <Button
                  type="submit"
                  style={{ backgroundColor: "#193D62", color: "white" }}
                  onClick={handleSubmit}
                >
                  Login
                </Button>

                {isLogInSuccess ? (
                  <Form.Field style={{ float: "right", padding: "8px" }}>
                    <label style={{ color: "red" }}>{errorText}</label>
                  </Form.Field>
                ) : (
                  <div></div>
                )}
              </Form>
            </Grid.Column>
            <Grid.Column width={1}></Grid.Column>
            <Grid.Column width={6} style={{ paddingBottom: "40px" }}>
              <h2
                style={{
                  marginTop: "10px",
                  textAlign: "center",
                  border: "1px solid black",
                  marginLeft: "10px",
                  marginRight: "10px",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                {" "}
                Register User
              </h2>
              <Form
                style={{
                  padding: "20px",
                  border: "1px solid #193D62",
                  margin: "10px",
                  borderRadius: "10px",
                }}
              >
                <Form.Field>
                  <label>First Name</label>
                  <input
                    name="formFName"
                    placeholder="First Name"
                    value={formState.formFName}
                    onChange={handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Last Name</label>
                  <input
                    name="formLName"
                    placeholder="Last Name"
                    value={formState.formLName}
                    onChange={handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Username</label>
                  <input
                    name="formUsername"
                    placeholder="Username"
                    value={formState.formName}
                    onChange={handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <input
                    name="formPassword"
                    placeholder="Password"
                    value={formState.formName}
                    onChange={handleChange}
                    type="password"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Email</label>
                  <input
                    name="formEmail"
                    placeholder="Email"
                    value={formState.formEmail}
                    onChange={handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Phone</label>
                  <input
                    name="formPhone"
                    placeholder="Phone"
                    value={formState.formPhone}
                    onChange={handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Role</label>
                  <input
                    name="formRole"
                    placeholder="Role"
                    value={formState.formRole}
                    onChange={handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Department</label>
                  <input
                    name="formDepartment"
                    placeholder="Department"
                    value={formState.formDepartment}
                    onChange={handleChange}
                  />
                </Form.Field>
                <Button
                  type="submit"
                  style={{ backgroundColor: "#193D62", color: "white" }}
                  onClick={handleRegister}
                >
                  Register
                </Button>
                {isRegisterSuccess ? (
                  <Form.Field style={{ float: "right", padding: "8px" }}>
                    <label style={{ color: "green" }}>{successText}</label>
                  </Form.Field>
                ) : (
                  <div></div>
                )}
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      <Footer></Footer>
    </Container>
  );
};

export default Login;
