import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card className="movie-card flex-fill">
        <a href={movie.ImageURL} target="_blank">
          <Card.Img className="movie-img" variant="top" src={movie.ImageURL} />
        </a>

        <Card.Body className="d-flex flex-column movie-card-col">
          <Card.Title className="movie-title">{movie.Title}</Card.Title>
          <Card.Text className="movie-description">
            {movie.Description}
          </Card.Text>

          <Link className="mt-auto" to={`/movies/${movie._id}`}>
            <Button className="text-decoration-none p-0 mt-auto" variant="link">
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
