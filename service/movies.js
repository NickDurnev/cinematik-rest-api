const { dbMovies } = require("../db");
const isValid = require("mongoose").Types.ObjectId.isValid;

const {
  findFavoritesByUserID,
  findWatchedByUserID,
  findFavoriteByMovieID,
  findWatchedByMovieID,
  addFavoriteMovie,
  addWatchedMovie,
  removeFavoriteByID,
  removeWatchedByID,
} = dbMovies;

const getFavoritesMovies = async (userID, skip, limit) => {
  const movies = await findFavoritesByUserID(userID, skip, limit);
  if (!movies) {
    return false;
  }
  return movies;
};

const getWatchedMovies = async (userID, skip, limit) => {
  const movies = await findWatchedByUserID(userID, skip, limit);
  if (!movies) {
    return false;
  }
  return movies;
};

const getFavoriteByID = async (userID, movieID) => {
  const movie = await findFavoriteByMovieID(userID, movieID);
  if (!movie) {
    return false;
  }
  return movie;
};

const addFavorite = async (userID, data) => {
  const movie = await findFavoriteByMovieID(userID, data.idbId);
  if (movie) {
    return false;
  }
  return await addFavoriteMovie(data, userID);
};

const addWatched = async (userID, data) => {
  const movie = await findWatchedByMovieID(userID, data.idbId);
  if (movie) {
    return false;
  }
  return await addWatchedMovie(data, userID);
};

const removeFavorite = async (userID, movieID) => {
  if (!isValid(movieID)) return false;
  return await removeFavoriteByID(userID, movieID);
};

const removeWatched = async (movieID) => {
  if (!isValid(movieID)) return false;
  return await removeWatchedByID(movieID);
};

module.exports = {
  getFavoritesMovies,
  getWatchedMovies,
  getFavoriteByID,
  addFavorite,
  addWatched,
  removeFavorite,
  removeWatched,
};
