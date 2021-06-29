const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//MIDDLEWARE

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

module.exports = {
  list: asyncErrorBoundary(list),
  read
};