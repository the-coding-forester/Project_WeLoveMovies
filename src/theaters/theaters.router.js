const { Router } = require("express");
const controller = require('./theaters.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

const router = Router();

//Route for ('/theaters)
//Only GET method allowed
router
  .route('/')
  .get(controller.list)
  .all(methodNotAllowed)

module.exports = router;