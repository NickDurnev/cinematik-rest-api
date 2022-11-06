const express = require("express");
const { errorHandler } = require("../middlewares");
const { ctrMovies } = require("../controllers");
const { movieValidation } = require("../middlewares");
const router = express.Router();

const { validationMiddleware } = movieValidation;

const { getMovies, getMoviebyIDBId, addMovie, removeMovie } = ctrMovies;

router.get("/:userID", errorHandler(getMovies));

router.get("/:userID/:movieID", errorHandler(getMoviebyIDBId));

router.post("/:userID", validationMiddleware, errorHandler(addMovie));

router.delete("/:userID/:movieID", errorHandler(removeMovie));

module.exports = router;
