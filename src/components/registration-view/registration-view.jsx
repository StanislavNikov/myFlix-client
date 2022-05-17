import React, { useState } from "react";
import axios from "axios";
import { Row, Col, Button, Container, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./registration-view.scss";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [Birthdate, setBirthdate] = useState("");
  const [values, setValues] = useState({
    usernameErr: "",
    passwordErr: "",
    emailErr: "",
  });

  const validate = () => {
    let isReq = true;
    if (!username) {
      setValues({ ...value, usernameErr: "username is required" });
      isReq = false;
    }
    if (!password) {
      setValues({ ...value, passwordErr: "password is required" });
      isReq = false;
    }
    if (!email) {
      setValues({ ...value, emailErr: "email is required" });
      isReq = false;
    }
    return isReq;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .post("https://myflixxxdb.herokuapp.com/users", {
          Username: username,
          Password: password,
          Email: email,
          Birthdate: Birthdate,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          alert("Registration successful! Please, login!");
          window.open("/", "_self"); // The second argument '_self' is necessary so that the page will open in the current tab
        })
        .catch((response) => {
          console.error(response);
          alert("Unable to register...");
        });
    }
    /* console.log("form submitted"); */
  };

  return (
    <Row className="mt-5">
      <Col md={12}>
        <Form>
          <h3>Sign Up</h3>
          <p></p>

          <Form.Group controlId="formUsername" className="reg-form-inputs">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {values.usernameErr && <p>{values.usernameErr}</p>}
          </Form.Group>

          <Form.Group controlId="formPassword" className="reg-form-inputs">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {values.passwordErr && <p>{values.passwordErr}</p>}
          </Form.Group>

          <Form.Group controlId="formEmail" className="reg-form-inputs">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {values.emailErr && <p>{values.emailErr}</p>}
          </Form.Group>

          <Form.Group controlId="formBirthdate" className="reg-form-inputs">
            <Form.Label>Birthdate:</Form.Label>
            <Form.Control
              type="date"
              name="Birthdate"
              value={Birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={handleRegister}>
            Register
          </Button>
          <p></p>
          <p>
            Already registered?&nbsp;
            <span>
              <Link style={{ textDecoration: "none" }} to={"/"}>
                Sign in
              </Link>
            </span>
            &nbsp;here!
          </p>
        </Form>
      </Col>
    </Row>
  );
}

// ==========================================================
// BRING BACK BIRTHDATE VALIDATION
RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
  }),
};

/* <form onSubmit={handleRegister}>
      <label>
        Username:
        <input
          type='text'
          value={username}
          placeholder='Username'
          onChange={(e) => {
            console.log("handle change", e);
            setUsername(e.target.value);
          }}
          required
        />
      </label>

      <label>
        Password:
        <input
          type='password'
          value={password}
          placeholder='Password'
          onChange={(e) => {
            console.log("handle change", e);
            setPassword(e.target.value);
          }}
          required
        />
      </label>

      <label>
        Email:
        <input
          type='email'
          value={email}
          placeholder='Email'
          onChange={(e) => {
            console.log("handle change", e);
            setEmail(e.target.value);
          }}
          required
        />
      </label>

      <label>
        Birthdate:
        <input
          type='date'
          value={birthdate}
          placeholder='Birthdate'
          onChange={(e) => {
            console.log("handle change", e);
            setBirthdate(e.target.value);
          }}
          required
        />
      </label>

      <button type='submit' onClick={handleRegister}>
        Register
      </button>
    </form>
  ); // fix prettier! */
