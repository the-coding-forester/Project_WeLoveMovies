const knex = require("../db/connection");

//Delete a single review by ID
const destroy = (reviewId) => {
  return knex('reviews')
    .where({ review_id: reviewId })
    .del();
}






module.exports = {
  destroy,
};