import React, { Component } from "react";
import request from "../Helpers/request";
import styled from "styled-components";

import Loader from "../Components/Loader";

const Portret = styled.img`
  height: 200px;
`;

class Cast extends Component {
  state = {
    actors: [],
    loading: false,
    error: null,
  };
  componentDidMount() {
    this.setState({ loading: true });
    request
      .getActors(this.props.match.params.movieId)
      .then((res) => this.setState({ actors: res.data.cast }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }
  render() {
    const { actors, loading, error } = this.state;
    return (
      <div>
        {error && <p>Oops, somesing wrong: {error.message}</p>}
        {loading && <Loader />}
        {this.state.actors &&
          actors.map((actor) => {
            return (
              <li key={actor.cast_id}>
                {actor.profile_path && (
                  <Portret
                    src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                    alt=""
                  />
                )}

                <p>Name: {actor.name}</p>
                <p>Character: {actor.character}</p>
              </li>
            );
          })}
      </div>
    );
  }
}

export default Cast;
