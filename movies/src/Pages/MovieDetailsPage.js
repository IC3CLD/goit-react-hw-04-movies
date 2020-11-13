import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import request from "../Helpers/request";
import styled from "styled-components";

import Cast from "../Pages/Cast";
import Reviews from "../Pages/Reviews";
import Loader from "../Components/Loader";

const Container = styled.div`
  display: flex;
  padding: 20px;
  position: relative;
`;

const Button = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(35%, 120%);
  border-radius: 5px;
  outline: none;
  border: none;
  &:hover {
    background-color: #4caf50; /* Green */
    color: white;
  }
`;

const Interior = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
`;

const StyledLink = styled(Link)`
  color: blue;
  text-transform: uppercase;
  text-decoration: none;
  padding: 20px;
  font-size: 20px;
  margin-left: 100px;
  &:hover {
    color: black;
  }
`;

const Pharagraph = styled.p`
  font-size: 30px;
`;

class MovieDetailsPage extends Component {
  state = {
    movie: null,
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.setState({ loading: true });
    request
      .showById(this.props.match.params.movieId)
      .then((res) => this.setState({ movie: res.data }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  handleBack = () => {
    const { location, history } = this.props;
    if (location.state && location.state.from) {
      return this.props.history.push(this.props.location.state.from);
    } else if (history.location.state) {
      return this.props.history.push("/");
    }
    this.props.history.push("/movies");
  };

  handleChangeQuery = (query) => {
    const { history, location } = this.props;
    history.push({
      pathname: location.pathname,
      search: `query=${query}`,
    });
  };

  render() {
    const { movie, loading, error } = this.state;
    return (
      <div>
        {error && <p>Oops, somesing wrong: {error.message}</p>}
        {loading && <Loader />}
        {this.state.movie && (
          <>
            <Container>
              <Button type="button" onClick={this.handleBack}>
                Go back
              </Button>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt=""
              />
              <Interior>
                <h2>{movie.title}</h2>
                <Pharagraph>release date: {movie.release_date}</Pharagraph>
                <Pharagraph>Overview: {movie.overview}</Pharagraph>
                <Pharagraph>Popularity: {movie.popularity}</Pharagraph>
              </Interior>
            </Container>

            <StyledLink
              to={{
                pathname: `/movies/${movie.id}/cast`,
                state: { ...this.props.location.state },
              }}
            >
              cast
            </StyledLink>
            <StyledLink
              to={{
                pathname: `/movies/${movie.id}/reviews`,
                state: { ...this.props.location.state },
              }}
            >
              review
            </StyledLink>
            <Route
              path={`${this.props.match.path}/cast`}
              component={Cast}
            ></Route>
            <Route
              path={`${this.props.match.path}/reviews`}
              component={Reviews}
            ></Route>
          </>
        )}
      </div>
    );
  }
}

export default MovieDetailsPage;
