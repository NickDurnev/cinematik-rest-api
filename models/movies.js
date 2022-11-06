const { Schema, model } = require("mongoose");

const movieSchema = new Schema(
  {
    idbID: { type: Number, unique: true },
    userID: String,
    category: String,
    poster_path: String,
    title: {
      type: String,
      required: [true, "Set title for movie"],
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

const Movie = model("movies", movieSchema);

module.exports = Movie;
