import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Button,
  Form,
  FormControl,
  FormGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserData } from "./user-data";
import { ErrorBoundary } from "../error-boundary/error-boundary";

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthdate: null,
      favouriteMovies: [],
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    const Username = localStorage.getItem("user");
    console.log(Username);
    axios
      .get(`https://myflixxxdb.herokuapp.com/users/${Username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        console.log(response.data);
        // Assign the result to the state
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthdate: response.data.Birthdate,
          favouriteMovies: response.data["Favourite movies"],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { Username, Email, Birthdate, favouriteMovies } = this.state;
    const { movies } = this.props;

    let birthdateLocal = { Birthdate };
    console.log(birthdateLocal.toString());

    return (
      <Container className="mt-5">
        <Row>
          <Col xs={12} sm={6}>
            <Card bg="danger" text="light">
              <Card.Header className="align-self-center">
                Account Information
              </Card.Header>
              <Card.Body className="p-1 m-0">
                ==========PROFILE DATA==========
              </Card.Body>
              <Card.Text className="p-1">Username: {Username}</Card.Text>
              <Card.Text className="p-1">Email: {Email}</Card.Text>
              <FormGroup>
                <Form.Label className="p-1 h3">Birthdate:</Form.Label>
                <Container className="d-flex flex-column justify-content-center p-1">
                  <FormControl
                    className="custom-form-label"
                    type="LocalDateTime"
                    name="Birthdate"
                    value={Birthdate}
                    disabled
                  ></FormControl>
                </Container>
              </FormGroup>
            </Card>
          </Col>
          <Col>
            <div>Favourite movies: {favouriteMovies}</div>
          </Col>
        </Row>
      </Container>
    );
  }
}

// =======================================================
{
  /* <div className="movie-img">
          <img src={movie.ImageURL} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div> */
}
