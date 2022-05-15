import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card>
        <Card.Img
          style={{ width: "15rem" }}
          variant="top"
          src={movie.ImageURL}
        />

        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>

          <Link to={`/movies/${movie._id}`}>
            <Button style={{ textDecoration: "none" }} variant="link">
              Open
            </Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

{
  /* <Button
onClick={() => {
  onMovieClick(movieData);
}}
variant="link"
>
Open
</Button> */
}
