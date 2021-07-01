const service = require('./theaters.service');
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

//MIDDLEWARE
//Route for ('/theaters)

const list = async (req, res) => {
  const data = await service.list();
  const updatedData = data.map(async (theater) => {
    return {
      ...theater,
      'movies': await service.listMoviesShowingAtTheater(theater.theater_id)
    }
  })
  const finalData = Promise.all(updatedData)
  res.json({ data: await finalData });
}

module.exports = {
  list: asyncErrorBoundary(list)
}