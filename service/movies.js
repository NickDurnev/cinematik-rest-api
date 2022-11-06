const { dbMovies } = require("../db");
const isValid = require("mongoose").Types.ObjectId.isValid;

const {
  findByUserID,
  findMovieByIDBId,
  findMovieByIDBIdAndCategory,
  addMovie,
  removeMovieByID,
  updateMovieCategory,
} = dbMovies;

const getMoviesByUserID = async (userID, category, skip, limit) => {
  const movies = await findByUserID(userID, category, skip, limit);
  if (!movies) {
    return false;
  }
  return movies;
};

const getMovieByID = async (userID, movieID, category) => {
  const movie = await findMovieByIDBIdAndCategory(userID, movieID, category);
  if (!movie) {
    return false;
  }
  return movie;
};

const createMovie = async (userID, data, category) => {
  const { idbId } = data;
  const movie = await findMovieByIDBId(userID, idbId);
  if (!movie) {
    return await addMovie(userID, data, category);
  }
  if (movie?.category !== category) {
    return await updateMovieCategory(userID, idbId, category);
  }
  return false;
};

const deleteMovie = async (userID, movieID) => {
  if (!isValid(movieID)) return false;
  return await removeMovieByID(userID, movieID);
};

module.exports = {
  getMoviesByUserID,
  getMovieByID,
  createMovie,
  deleteMovie,
};
