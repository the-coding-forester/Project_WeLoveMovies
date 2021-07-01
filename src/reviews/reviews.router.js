const { Router } = require("express");
const controller = require('./reviews.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

const router = Router();

//Route for ('/reviews/:reviewId')
//Methods GET, UPDATE, and DELETE supported
router
  .route("/:reviewId")
  .get(controller.read)
  .delete(controller.destroy)
  .put(controller.update)
  .all(methodNotAllowed)


module.exports = router;