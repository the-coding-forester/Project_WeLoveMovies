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

//Route for ('/:movieId')
const read = async (req, res, next) => {
  const data = res.local.movie;
  res.json({ data: data[0] });
}

//Route for ('/:movieId/theaters')
const getTheatersShowingMovie = async (req, res, next) => {
  const { movieId } = req.params;
  const data = await service.getTheatersShowingMovie(movieId);
  res.json({ data: data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  getTheatersShowingMovie: [asyncErrorBoundary(movieExists), asyncErrorBoundary(getTheatersShowingMovie)]
};