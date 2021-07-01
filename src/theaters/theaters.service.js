const knex = require("../db/connection");

const list = () => {
  return knex('theaters as t')
    .select('*')
}

const listMoviesShowingAtTheater = (theaterId) => {
  return knex('movies as m')
    .join('movies_theaters as mt', 'm.movie_id', 'mt.movie_id')
    .select('m.*')
    .where({ 'mt.is_showing': true, 'mt.theater_id': theaterId })
    .groupBy('m.title')
}


module.exports = {
  list,
  listMoviesShowingAtTheater
}