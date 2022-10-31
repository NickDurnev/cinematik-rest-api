const { FavoriteMovies, WatchedMovies } = require("../models");

const findFavoritesByUserID = async (id, skip, limit) =>
  await FavoriteMovies.find({ userID: id }).skip(skip).limit(limit);

const findWatchedByUserID = async (id, skip, limit) =>
  await WatchedMovies.find({ userID: id }).skip(skip).limit(limit);

const findFavoriteByTitle = async (title) =>
  await FavoriteMovies.findOne({ title: title });

const findWatchedByTitle = async (title) =>
  await WatchedMovies.findOne({ title: title });

const addFavoriteMovie = async (movie, id) =>
  await FavoriteMovies.create({ userID: id, ...movie });

const addWatchedMovie = async (movie, id) =>
  await WatchedMovies.create({ userID: id, ...movie });

const removeFavoriteByID = async (movieID) =>
  await FavoriteMovies.findByIdAndRemove({ _id: movieID });

const removeWatchedByID = async (movieID) =>
  await WatchedMovies.findByIdAndRemove({ _id: movieID });

module.exports = {
  findFavoritesByUserID,
  findWatchedByUserID,
  findFavoriteByTitle,
  findWatchedByTitle,
  addFavoriteMovie,
  addWatchedMovie,
  removeFavoriteByID,
  removeWatchedByID,
};
