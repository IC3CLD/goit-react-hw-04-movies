import React, { Component } from "react";
import request from "../Helpers/request";
import styled from "styled-components";

import Loader from "../Components/Loader";

const Pharagraph = styled.p`
  margin-left: 100px;
  font-size: 30px;
`;

const Review = styled.p`
  font-size:20px;
`;

const Container = styled.ul`
  padding: 20px;
  list-style: none;
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
      <Container>
        {error && <p>Oops, somesing wrong: {error.message}</p>}
        {loading && <Loader />}
        {this.state.reviews &&
          reviews.map((review) => {
            return (
              <li key={review.id}>
                <Review>author: {review.author}</Review>
                <Review>Review: {review.content}</Review>
              </li>
            );
          })}
        {this.state.reviews.length>0 ? `` : (
          <Pharagraph>Sorry, but there no reviews.</Pharagraph>
        )}
      </Container>
    );
  }
}

export default Reviews;
