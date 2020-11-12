import axios from 'axios';

const key = '021bde57a39b08fd0dc3e25aefc5d3fc';

const url = `https://api.themoviedb.org`;

const showPopular = () => {
return axios(`${url}/3/movie/popular?api_key=${key}&language=en-US&page=1`).then(res => res.data.results)
};

const showById = (id) => {
    return axios(`${url}/3/movie/${id}?api_key=${key}`)
}

const showWithQuery = (query) => {
    return axios(`${url}/3/search/movie?api_key=${key}&query=${query}`)
}

const getActors = (id) => {
    return axios(`${url}/3/movie/${id}/credits?api_key=${key}`)
    
}

const getReviews = (id) => {
    return axios(`${url}/3/movie/${id}/reviews?api_key=${key}&language=en-US&page=1`)
    
}

const getFullMovieInfo = (id) => {
    return axios(`${url}/3/movie/${id}?api_key=${key}&language=en-US`)
    // зачем, если есть в запросе по id есть та же инфо?
}

export default {showPopular, showById, showWithQuery, getActors, getReviews, getFullMovieInfo};