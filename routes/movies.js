const express = require("express");
const { errorHandler } = require("../middlewares");
const { ctrMovies } = require("../controllers");
const { movieValidation } = require("../middlewares");
const router = express.Router();

const { validationMiddleware } = movieValidation;

const {
  getFavorites,
  getWatched,
  getFavoritesbyIDBId,
  createFavoriteMovie,
  createWatchedMovie,
  removeFavoriteMovie,
  removeWatchedMovie,
} = ctrMovies;

router.get("/favorites/:userID", errorHandler(getFavorites));

router.get("/watched/:userID", errorHandler(getWatched));

router.get("/favorites/:userID/:movieID", errorHandler(getFavoritesbyIDBId));

router.get("/watched/:userID/:movieID", errorHandler(createWatchedMovie));

router.post(
  "/favorites/:userID",
  validationMiddleware,
  errorHandler(createFavoriteMovie)
);

router.post(
  "/watched/:userID",
  validationMiddleware,
  errorHandler(createWatchedMovie)
);

router.delete("/favorites/:userID/:movieID", errorHandler(removeFavoriteMovie));

router.delete("/watched/:movieID", errorHandler(removeWatchedMovie));

module.exports = router;
