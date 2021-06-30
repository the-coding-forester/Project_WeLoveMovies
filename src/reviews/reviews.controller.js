const service = require('./reviews.service');
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

//MIDDLEWARE

//Route for ('/reviews/:reviewId)
const destroy = async (req, res, next) => {
  const { reviewId } = req.params;
  await service.destroy(reviewId);
  res.sendStatus(204)
}





module.exports = {
  destroy: [
    asyncErrorBoundary(destroy)
  ]
};