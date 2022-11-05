const { FavoriteMovies, WatchedMovies } = require("../models");

const findFavoritesByUserID = async (id, skip, limit) =>
  await FavoriteMovies.find({ userID: id }).skip(skip).limit(limit);

const findWatchedByUserID = async (id, skip, limit) =>
  await WatchedMovies.find({ userID: id }).skip(skip).limit(limit);

const findFavoriteByMovieID = async (userID, movieID) =>
  await FavoriteMovies.findOne({ userId: userID, idbId: movieID });

const findWatchedByMovieID = async (userID, movieID) =>
  await WatchedMovies.findOne({ userId: userID, idbId: movieID });

const addFavoriteMovie = async (movie, id) =>
  await FavoriteMovies.create({ userID: id, ...movie });

const addWatchedMovie = async (movie, id) =>
  await WatchedMovies.create({ userID: id, ...movie });

const removeFavoriteByID = async (userID, movieID) =>
  await FavoriteMovies.findByIdAndRemove({ userId: userID, _id: movieID });

const removeWatchedByID = async (movieID) =>
  await WatchedMovies.findByIdAndRemove({ _id: movieID });

module.exports = {
  findFavoritesByUserID,
  findWatchedByUserID,
  findFavoriteByMovieID,
  findWatchedByMovieID,
  addFavoriteMovie,
  addWatchedMovie,
  removeFavoriteByID,
  removeWatchedByID,
};
