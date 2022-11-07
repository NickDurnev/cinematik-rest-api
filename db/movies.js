const { Movie } = require("../models");

const findByUserID = async (userID, category, skip, limit) =>
  await Movie.find({ userID: userID, category: category })
    .skip(skip)
    .limit(limit);

const findMovieByIDBId = async (userID, movieID) =>
  await Movie.findOne({
    userId: userID,
    idbID: movieID,
  });

const findMovieByIDBIdAndCategory = async (userID, movieID, category) =>
  await Movie.findOne({ userId: userID, idbID: movieID, category: category });

const updateMovieCategory = async (userID, movieID, category) =>
  await Movie.findOneAndUpdate(
    {
      userId: userID,
      idbID: movieID,
    },
    { $set: { category: category } },
    { new: true }
  );

const addMovie = async (userID, data, category) =>
  await Movie.create({ userID: userID, category: category, ...data });

const removeMovieByID = async (userID, movieID) =>
  await Movie.findByIdAndRemove({
    userId: userID,
    _id: movieID,
    status: "favorite",
  });

module.exports = {
  findByUserID,
  findMovieByIDBId,
  findMovieByIDBIdAndCategory,
  addMovie,
  removeMovieByID,
  updateMovieCategory,
};
