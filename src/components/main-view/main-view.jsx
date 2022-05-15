import React from "react";
import axios from "axios";
import { Route, BrowserRouter as Router } from "react-router-dom";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { Col, Row, Button } from "react-bootstrap";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      loggedInStatus: "NOT_LOGGED_IN!",
      registered: false,
    };
  }

  /* componentDidMount() {
    axios
      .get("https://myflixxxdb.herokuapp.com/movies")
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("+++++++++");
  } */

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
      /* loggedInStatus: 'LOGGED_IN', */
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
  }

  getMovies(token) {
    axios
      .get("https://myflixxxdb.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /* onRegister(registered) {
    this.setState({
      registered: true,
    });
  }   
  <RegistrationView onRegister={(reg) => this.onRegister(reg)} />*/

  render() {
    const { movies, selectedMovie, user, registered, loggedInStatus } =
      this.state;

    if (!user) {
      return (
        <>
          <h1>Status: {this.state.loggedInStatus}</h1>
          <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
          <RegistrationView />
        </>
      );
    }

    if (movies.length === 0) return <div className="main-view">Loading...</div>;

    return (
      <Router>
        <Row className="main-view justify-content-md-center">
          <Route
            exact
            path="/"
            render={() => {
              return movies.map((movie) => (
                <Col md={3} key={movie._id}>
                  <MovieCard movie={movie} />
                </Col>
              ));
            }}
          />

          <Route
            path="/movies/:movieId"
            render={({ match, history }) => {
              return (
                <Col md={8}>
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path="/directors/:name"
            render={({ match, history }) => {
              if (movies.length === 0)
                return <div className="main-view">Loading...</div>;
              return (
                <Col md={8}>
                  <DirectorView
                    director={
                      movies.find(
                        (movie) => movie.Director.Name === match.params.name
                      ).Director
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path="/genres/:name"
            render={({ match, history }) => {
              if (movies.length === 0)
                return <div className="main-view">Loading...</div>;
              return (
                <Col md={8}>
                  <GenreView
                    genre={
                      movies.find(
                        (movie) => movie.Genre.Name === match.params.name
                      ).Genre
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Button
            onClick={() => {
              this.onLoggedOut();
            }}
          >
            Logout
          </Button>
        </Row>
      </Router>
    );
  }
}

console.log("=========");

// "jsxSingleQuote": true - NOT WORKING!!!

/*  <Router>
        <Row className="justify-content md-center main-view">
          <button
            onClick={() => {
              this.onLoggedOut();
            }}
          >
            Logout
          </button>
          {selectedMovie ? (
            <Col md={8}>
              <MovieView
                movieData={selectedMovie}
                onBackClick={(newSelectedMovie) => {
                  this.setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ) : (
            movies.map((movie) => (
              <Col md={3}>
                <MovieCard
                  key={movie.__id}
                  movieData={movie}
                  onMovieClick={(movie) => {
                    this.setSelectedMovie(movie);
                  }}
                />
              </Col>
            ))
          )}
        </Row>
      </Router> */
