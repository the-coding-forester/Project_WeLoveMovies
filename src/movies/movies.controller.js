const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//MIDDLEWARE

//Validate that movie exists
const movieExists = async (req, res, next) => {
  const { movieId } = req.params;
  const data = await service.read(movieId);
  if (data.length) {
    res.locals.movie = data
    return next();
  };
  return next({
    status: 404,
    message: "Movie cannot be found."
  });
};

//Route for ('/')
const list = async (req, res) => {
  const { is_showing } = req.query;

  if (is_showing === 'true') {
    //if is showing is true then return the
    const data = await service.listMoviesIsShowingTrue();
    return res.json({ data });
  }
  //return all movies by default
  const data = await service.list();
  res.json({ data: data });
}

//Route for ('/movies/:movieId')
const read = async (req, res, next) => {
  const data = res.locals.movie;
  res.json({ data: data[0] });
}

//Route for ('/movies/:movieId/theaters')
const getTheatersShowingMovie = async (req, res, next) => {
  const { movieId } = req.params;
  const data = await service.getTheatersShowingMovie(movieId);
  res.json({ data: data });
}

//Route for ('/movies/:movieId/theaters')
//Restructure the data so that the critic data is in a nested object
const getMovieReviewsWithCritics = async (req, res, next) => {
  const { movieId } = req.params;
  const data = await service.getMovieReviewsWithCritics(movieId);
  const updatedData = data.map((review) => {
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
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(read)
  ],
  getTheatersShowingMovie: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(getTheatersShowingMovie)
  ],
  getMovieReviewsWithCritics: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(getMovieReviewsWithCritics)
  ]
};