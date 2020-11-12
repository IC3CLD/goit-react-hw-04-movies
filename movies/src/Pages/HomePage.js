import React, { Component } from "react";
import { Link } from "react-router-dom";
import request from "../Helpers/request";
import styled from "styled-components";

import Loader from "../Components/Loader";

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
`;

const ListItem = styled.li`
  width: 400px;
  text-align: center;
  margin: 30px;
  margin-top: 0;
`;

const StyledLink = styled(Link)`
  color: black;
  text-transform: uppercase;
  text-decoration: none;
  padding: 20px;
  font-size: 20px;

`;

const Paragraph = styled.p`
margin: 0;
`;


class HomePage extends Component {
  state = {
    movies: [],
    loading: false,
    error: null,
  };
  componentDidMount() {
    this.setState({ loading: true });
    request
      .showPopular()
      .then((res) => this.setState({ movies: res }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }
  render() {
    const { movies, loading, error } = this.state;
    return (
      <List>
        {error && <p>Oops, somesing wrong: {error.message}</p>}
        {loading && <Loader />}
        {movies.length > 0 &&
          movies.map((movie) => {
            const poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            return (
              <ListItem key={movie.id}>
                <StyledLink to={`/movies/${movie.id}`}>
                  <img src={poster} alt={movie.title} />
                  <Paragraph>{movie.title}</Paragraph>
                </StyledLink>
              </ListItem>
            );
          })}
      </List>
    );
  }
}

export default HomePage;
