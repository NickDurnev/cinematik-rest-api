const { dbMovies } = require("../db");
const isValid = require("mongoose").Types.ObjectId.isValid;

const {
  findFavoritesByUserID,
  findWatchedByUserID,
  findFavoriteByTitle,
  findWatchedByTitle,
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

const addFavorite = async (data, userID) => {
  const movie = await findFavoriteByTitle(data.title);
  if (movie) {
    return false;
  }
  return await addFavoriteMovie(data, userID);
};

const addWatched = async (data, userID) => {
  const movie = await findWatchedByTitle(data.title);
  if (movie) {
    return false;
  }
  return await addWatchedMovie(data, userID);
};

const removeFavorite = async (movieID) => {
  if (!isValid(movieID)) return false;
  return await removeFavoriteByID(movieID);
};

const removeWatched = async (movieID) => {
  if (!isValid(movieID)) return false;
  return await removeWatchedByID(movieID);
};

module.exports = {
  getFavoritesMovies,
  getWatchedMovies,
  addFavorite,
  addWatched,
  removeFavorite,
  removeWatched,
};
