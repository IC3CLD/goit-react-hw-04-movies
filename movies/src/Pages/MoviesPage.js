import React, { Component } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import request from "../Helpers/request";
import styled from "styled-components";

import SearchForm from "../Components/SearchForm";
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

class MoviesPage extends Component {
  state = {
    movies: [],
    loading: false,
    error: null,
  };

  getRequest = (query) => {
    this.setState({ loading: true });
    request
      .showWithQuery(query)
      .then((res) => this.setState({ movies: res.data.results }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  componentDidMount() {
    const { query } = queryString.parse(this.props.location.search);
    if (query) {
      this.getRequest(query);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { query: prevSearchParam } = queryString.parse(
      prevProps.location.search
    );
    const { query: newSearchParam } = queryString.parse(
      this.props.location.search
    );
    if (prevSearchParam !== newSearchParam) {
      this.getRequest(newSearchParam);
    }
  }

  handleChangeQuery = (query) => {
    const { history, location } = this.props;
    history.push({
      pathname: location.pathname,
      search: `query=${query}`,
    });
  };

  render() {
    const { movies, loading, error } = this.state;
    return (
      <div>
        <SearchForm onSubmit={this.handleChangeQuery} />
        <List>
          {error && <p>Oops, somesing wrong: {error.message}</p>}
          {loading && <Loader />}
          {this.state.movies &&
            movies.map((movie) => {
              const poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
              return (
                <ListItem key={movie.id}>
                  <StyledLink
                    to={{
                      pathname: `/movies/${movie.id}`,
                      state: { from: this.props.location },
                    }}
                  >
                    <img src={poster} alt={movie.title} />
                    <Paragraph>{movie.title}</Paragraph>
                  </StyledLink>
                </ListItem>
              );
            })}
        </List>
      </div>
    );
  }
}

export default MoviesPage;
