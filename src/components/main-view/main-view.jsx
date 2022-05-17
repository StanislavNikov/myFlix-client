import React from "react";
import axios from "axios";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { NavbarMenu } from "../navbar/navbar";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";
import { UserUpdate } from "../profile-view/user-update";
import { ErrorBoundary } from "../error-boundary/error-boundary";

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

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData, loggedInStatus) {
    console.log(authData);
    console.log(loggedInStatus);
    this.setState({
      user: authData.user.Username,
      loggedInStatus: "LOGGED_IN!",
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
      loggedInStatus: "Not Logged In",
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

  render() {
    const { movies, selectedMovie, user, registered, loggedInStatus } =
      this.state;

    return (
      <Router>
        <NavbarMenu user={user} />
        <Container className="container-fluid" style={{ maxWidth: "100%" }}>
          <Row className="main-view justify-content-md-center d-flex flex-wrap m-0 p-0">
            <Route
              exact
              path="/"
              render={() => {
                if (!user) {
                  return (
                    <Col>
                      <h1>Status: {this.state.loggedInStatus}</h1>
                      <LoginView
                        onLoggedIn={(user, loggedInStatus) =>
                          this.onLoggedIn(user, loggedInStatus)
                        }
                      />
                    </Col>
                  );
                }
                if (movies.length === 0) {
                  console.log(user + "-------");
                  console.log(loggedInStatus);
                  return (
                    <div className="main-view">
                      <Button variant="dark" disabled>
                        <Spinner
                          as="span"
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        Loading...
                      </Button>
                    </div>
                  );
                }

                return movies.map((movie) => (
                  <Col md={3} className="col-sm d-flex" key={movie._id}>
                    <MovieCard movie={movie} />
                  </Col>
                ));
              }}
            />

            <Route
              path="/register"
              render={() => {
                if (user) return <Redirect to="/" />;
                return (
                  <Col lg={8} md={8}>
                    <RegistrationView />
                  </Col>
                );
              }}
            />

            <Route
              path="/movies/:movieId"
              render={({ match, history }) => {
                return (
                  <Col md={8}>
                    <MovieView
                      movie={movies.find(
                        (movie) => movie._id === match.params.movieId
                      )}
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

            <ErrorBoundary>
              <Route
                path={`/users/${user}`}
                render={({ match, history }) => {
                  if (!user) return <Redirect to="/" />;
                  return (
                    <Col>
                      <ProfileView
                        movies={movies}
                        user={user}
                        onBackClick={() => history.goBack()}
                      />
                    </Col>
                  );
                }}
              />
            </ErrorBoundary>

            <Route
              path={`/users-update/${user}`}
              render={({ match, history }) => {
                if (!user) return <Redirect to="/" />;
                return (
                  <Col>
                    <UserUpdate
                      user={user}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
          </Row>
        </Container>
      </Router>
    );
  }
}

console.log("=========");

// "jsxSingleQuote": true - NOT WORKING!!!

// =============================================================
{
  /*  <Button
              onClick={() => {
                this.onLoggedOut();
              }}
            >
              Logout
            </Button> */
}

// =============================================================

/*  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  } */

// =============================================================

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

// =============================================================

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

// =============================================================

/* onRegister(registered) {
    this.setState({
      registered: true,
    });
  }   
  <RegistrationView onRegister={(reg) => this.onRegister(reg)} />*/
