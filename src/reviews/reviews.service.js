const knex = require("../db/connection");

//Delete a single review by ID
const destroy = (reviewId) => {
  return knex('reviews')
    .where({ review_id: reviewId })
    .del();
}

//Return a single review by ID
//Needed for the reviewExists middleware
const read = (reviewId) => {
  return knex('reviews')
    .select('*')
    .where({ review_id: reviewId })
    .first();
}

//Update a single review by ID
const update = async (updatedReview) => {
  await knex('reviews as r')
    .where({ "r.review_id": updatedReview.review_id })
    .update(updatedReview)
  return knex("reviews as r")
    .join('critics as c', 'c.critic_id', 'r.critic_id')
    .select('*', 'c.created_at as critic_created', 'c.updated_at as critic_updated')
    .where({ "r.review_id": updatedReview.review_id })
}


module.exports = {
  read,
  destroy,
  update,
};