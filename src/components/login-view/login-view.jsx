import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import axios from "axios";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://myflixxxdb.herokuapp.com/login", {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((error) => {
        console.log("no such user", error);
      });
    /* console.log('--------', password); */
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    /* props.onLoggedIn(username); */
  };

  return (
    <Form>
      <Form.Group controlId='formUsername'>
        <Form.Label>
          Username:
          <Form.Control
            type='text'
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Label>
      </Form.Group>

      <Form.Group controlId='formPassword'>
        <Form.Label>
          Password:
          <Form.Control
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Label>
      </Form.Group>

      <Button variant='primary' type='submit' onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}
