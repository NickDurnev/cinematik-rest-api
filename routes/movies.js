const express = require("express");
const { errorHandler } = require("../middlewares");
const { ctrMovies } = require("../controllers");
const router = express.Router();

const {
  getFavorites,
  getWatched,
  createFavoriteMovie,
  createWatchedMovie,
  removeFavoriteMovie,
  removeWatchedMovie,
} = ctrMovies;

router.get("/favorites/:userID", errorHandler(getFavorites));

router.get("/watched/:userID", errorHandler(getWatched));

router.post("/favorites/:userID", errorHandler(createFavoriteMovie));

router.post("/watched/:userID", errorHandler(createWatchedMovie));

router.delete("/favorites/:movieID", errorHandler(removeFavoriteMovie));

router.delete("/watched/:movieID", errorHandler(removeWatchedMovie));

module.exports = router;
