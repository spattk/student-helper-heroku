import React, { useEffect, useState } from "react";
import {
  Button, Card,
  Container, Form, Grid, Header, Icon, Modal
} from "semantic-ui-react";
import "../css/App.css";
import Footer from "./Footer";
import MenuHeader from "./MenuHeader";
import Student from "./Student";
import VerticalNavigation from "./VerticalNavigation";

const Students = (props) => {
  const [allStudents, setAllStudents] = useState([]);

  const getAllStudents = async () => {
    try {
      const response = await fetch("http://localhost:5001/users/students");
      const jsonData = await response.json();
      setAllStudents(jsonData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  const [open, setOpen] = React.useState(false);
  const [formState, setFormState] = useState({
    formId: "",
    formName: "",
    formPassword: "",
    formEmail: "",
    formFName: "",
    formLName: "",
    formPhone: "",
    formRole: "Student",
    formAuthToken: "",
    formDepartment: "",
  });
  const submit = () => {
    fetch(`/users`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formState.formName,
        password: formState.formPassword,
        email: formState.formEmail,
        first_name: formState.formFName,
        last_name: formState.formLName,
        phone: formState.formPhone,
        role: formState.formRole,
        department: formState.formDepartment,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        getAllStudents();
      });
    setOpen(false);
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <Container fluid={true}>
      <MenuHeader token={props.token} setToken={props.setToken} />
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <VerticalNavigation />
          </Grid.Column>
          <Grid.Column width={13}>
            <div>
              <Modal
                closeIcon
                open={open}
                trigger={
                  <Button
                    style={{
                      float: "right",
                      marginTop: "10px",
                      marginRight: "10px",
                      backgroundColor: "#193D62",
                      color: "white",
                    }}
                  >
                    Add Student
                  </Button>
                }
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
              >
                <Header content="Add New Student" />
                <Modal.Content scrolling>
                  <Form>
                    <Form.Field>
                      <label>Username</label>
                      <input
                        name="formName"
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
                        value={formState.formPassword}
                        onChange={handleChange}
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
                  </Form>
                </Modal.Content>
                <Modal.Actions>
                  <Button color="green" onClick={submit}>
                    <Icon name="checkmark" /> Submit
                  </Button>
                </Modal.Actions>
              </Modal>
              <div
                style={{
                  textAlign: "center",
                  padding: "10px",
                  marginTop: "10px",
                  textAlign: "center",
                  border: "1px solid black",
                  marginLeft: "10px",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                <h2>Registered Students</h2>
              </div>
              <div style={{ margin: "10px", marginBottom: "70px" }}>
                <Card.Group>
                  {allStudents.map((student) => (
                    <Student
                      key={student.user_id}
                      name={student.first_name + " " + student.last_name}
                      username={student.username}
                      email={student.email}
                      phone={student.phone}
                      designation={student.role}
                      department={student.department}
                    />
                  ))}
                </Card.Group>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Footer></Footer>
    </Container>
  );
};

export default Students;
