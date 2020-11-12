import React, { Component } from "react";
import request from "../Helpers/request";
import styled from "styled-components";

import Loader from "../Components/Loader";

const Pharagraph = styled.p`
  margin-left: 100px;
  font-size: 30px;
`;

class Reviews extends Component {
  state = {
    reviews: [],
    loading: false,
    error: null,
  };
  componentDidMount() {
    this.setState({ loading: true });
    request
      .getReviews(this.props.match.params.movieId)
      .then((res) => this.setState({ reviews: res.data.results }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }
  render() {
    const { reviews, loading, error } = this.state;
    return (
      <div>
        {error && <p>Oops, somesing wrong: {error.message}</p>}
        {loading && <Loader />}
        {this.state.reviews &&
          reviews.map((review) => {
            return (
              <li key={review.id}>
                <p>author: {review.author}</p>
                <p>Review: {review.content}</p>
              </li>
            );
          })}
        {this.state.reviews && (
          <Pharagraph>Sorry, but there no reviews.</Pharagraph>
        )}
      </div>
    );
  }
}

export default Reviews;
