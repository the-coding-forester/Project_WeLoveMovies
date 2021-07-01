const service = require('./reviews.service');
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

//MIDDLEWARE

//Validate that the review exists
const reviewExists = async (req, res, next) => {
  const { reviewId } = req.params;
  const review = await service.read(reviewId);
  if (review) {
    res.locals.review = review
    return next();
  };
  return next({
    status: 404,
    message: "Review cannot be found."
  });
};

//Deleting on route ('/reviews/:reviewId)
const destroy = async (req, res, next) => {
  const { reviewId } = req.params;
  await service.destroy(reviewId);
  res.sendStatus(204)
}

//GET on route ('/reviews/:reviewId')
const read = async (req, res, next) => {
  const data = res.locals.review;
  res.json({ data: data[0] });
}

//Validate update has valid fields


//PUT on route ('/reviews/:reviewId')
const update = async (req, res, next) => {
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id
  };
  const data = await service.update(updatedReview)
  const [updatedData] = data.map((review) => {
    return {
      "review_id": review.review_id,
      "content": review.content,
      "score": review.score,
      "created_at": review.created_at,
      "updated_at": review.updated_at,
      "critic_id": review.critic_id,
      "movie_id": review.movie_id,
      "critic": {
        "critic_id": review.critic_id,
        "preferred_name": review.preferred_name,
        "surname": review.surname,
        "organization_name": review.organization_name,
        "created_at": review.critic_created,
        "updated_at": review.critic_updated
      }
    }
  })
  res.json({ data: updatedData });
  //res.json({ data });
}



module.exports = {
  read: [
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(read)
  ],
  destroy: [
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(destroy)
  ],
  update: [
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(update)
  ]
};