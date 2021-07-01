const knex = require("../db/connection");

const list = () => {
  return knex('theaters').select('*');
}


module.exports = {
  list,
}