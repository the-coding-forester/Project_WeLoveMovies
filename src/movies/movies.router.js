const { Router } = require("express");
const controller = require("./movies.controller");
const methodNotAllowed = require('../errors/methodNotAllowed')

const router = Router();

//Route for ('/movies')
//Only the GET method is allowed
router
  .route("/")
  .get(controller.list)
  .all(methodNotAllowed)



module.exports = router;