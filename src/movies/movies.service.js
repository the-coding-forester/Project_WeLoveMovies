const knex = require("../db/connection");


//List all movies in the database
const list = () => {
  return knex('movies').select('*');
}

//List all movies where is showing is true
//Will need to connect movies table and movies_theaters table
const listMoviesIsShowingTrue = () => {
  return knex('movies as m')
    .join('movies_theaters as mt', 'm.movie_id', 'mt.movie_id')
    .select('m.*')
    .where({ 'mt.is_showing': true })
    .groupBy('m.title')
}

//Return a single movie by ID
const read = (movieId) => {
  return knex('movies')
    .select('*')
    .where({ movie_id: movieId })
}

//List of theaters that are showing the movie with the given movie id
//Will need to connect movies table, movies_theaters table, and the theaters table
const getTheatersShowingMovie = (movieId) => {
  return knex('movies as m')
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("t.*", "mt.is_showing", "m.movie_id")
    .where({ "mt.is_showing": true, "mt.movie_id": movieId })
}

//This route should return all the `reviews` for the movie, including all the `critic` details added to a `critic` key of the review.
const getMovieReviewsWithCritics = async (movieId) => {
  return knex('reviews as r')
    .join('critics as c', 'c.critic_id', 'r.critic_id')
    .select('*', 'c.created_at as critic_created', 'c.updated_at as critic_updated')
    .where({ 'movie_id': movieId })
}


module.exports = {
  list,
  listMoviesIsShowingTrue,
  read,
  getTheatersShowingMovie,
  getMovieReviewsWithCritics
};