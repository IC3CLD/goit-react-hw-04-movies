import React, { Component } from "react";
import request from "../Helpers/request";
import styled from "styled-components";

import Loader from "../Components/Loader";

const Portret = styled.img`
  height: 200px;
`;

const Pharagraph = styled.p`
  margin-left: 100px;
  font-size: 30px;
`;

const Container = styled.ul`
  padding: 20px;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 250px;
  margin: 30px;
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
      <Container>
        {error && <p>Oops, somesing wrong: {error.message}</p>}
        {loading && <Loader />}
        {this.state.actors &&
          actors.map((actor) => {
            return (
              <ListItem key={actor.cast_id}>
                <Portret
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                      : `https://www.vorotnet.com.ua/catalog/view/theme/vorotnet-theme/image/notfound.png`
                  }
                  alt=""
                />
                <p>Name: {actor.name}</p>
                <p>Character: {actor.character}</p>
              </ListItem>
            );
          })}
        {this.state.actors.length > 0 ? (
          ``
        ) : (
          <Pharagraph>Sorry, but there no cast info.</Pharagraph>
        )}
      </Container>
    );
  }
}

export default Cast;
