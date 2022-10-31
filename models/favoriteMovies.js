const { Schema, model } = require("mongoose");

const movieSchema = new Schema(
  {
    userID: String,
    poster_path: String,
    title: {
      type: String,
      required: [true, "Set title for movie"],
      unique: true,
    },
    vote_average: Number,
    genres: [
      {
        id: Number,
        name: String,
      },
    ],
    release_date: String,
    tagline: String,
    runtime: Number,
    overview: String,
    budget: Number,
  },
  { versionKey: false }
);

const favoriteMovie = model("favoriteMovies", movieSchema);

module.exports = favoriteMovie;
