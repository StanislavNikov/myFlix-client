import React from "react";
import PropTypes from "prop-types";
import { Row, Button } from "react-bootstrap";

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Row className="genre-view justify-content-md-center">
        <div className="genre-name">
          <span className="label">Name: </span>
          <span className="value">{genre.Name}</span>
        </div>
        <div className="genre-definition">
          <span className="label">Definition: </span>
          <span className="value">{genre.Definition}</span>
        </div>

        <Button
          onClick={() => {
            onBackClick();
          }}
        >
          Back
        </Button>
      </Row>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Definition: PropTypes.string.isRequired,
  }).isRequired,

  onBackClick: PropTypes.func.isRequired,
};
