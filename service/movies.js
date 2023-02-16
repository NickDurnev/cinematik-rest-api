const { dbMovies } = require("../db");
const isValid = require("mongoose").Types.ObjectId.isValid;

const {
  findByUserID,
  findMovieByIDBId,
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

const getMovieByID = async (userID, movieID) => {
  const movie = await findMovieByIDBId(userID, movieID);
  if (!movie) {
    return false;
  }
  return movie;
};

const createMovie = async (userID, data, category) => {
  const { idbID } = data;
  const movie = await findMovieByIDBId(userID, idbID);
  console.log(movie);
  if (!movie) {
    return await addMovie(userID, data, category);
  }
  if (movie?.category !== category) {
    return await updateMovieCategory(userID, idbID, category);
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
