import React, { useState } from "react";

import { Button, Form, Group, Label } from "react-bootstrap";
import axios from "axios";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr("Username required!");
      isReq = false;
    } else if (username.length < 3) {
      setUsernameErr("Username must be at least 3 characters long!");
      isReq = false;
    }

    if (!password) {
      setPasswordErr("Password required!");
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr("Password must be at least 6 characters long!");
      isRreq = false;
    }
    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
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
    }
  };

  return (
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>
          Username:
          <Form.Control
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {/* code added here to display validation error */}
          {usernameErr && <p>{usernameErr}</p>}
        </Form.Label>
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>
          Password:
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* code added here to display validation error */}
          {passwordErr && <p>{passwordErr}</p>}
        </Form.Label>
      </Form.Group>

      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}
