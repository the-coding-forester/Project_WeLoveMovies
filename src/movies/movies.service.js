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

module.exports = {
  list,
  listMoviesIsShowingTrue,
  read,
};