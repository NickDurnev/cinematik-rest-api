const createError = require("http-errors");
const { movieService } = require("../service");

const { getMoviesByUserID, getMovieByID, createMovie, deleteMovie } =
  movieService;

const getMovies = async (req, res, next) => {
  const { page, limit = 10, category } = req.query;
  const { userID } = req.params;
  let skip = 0;
  page > 1 ? (skip = (page - 1) * limit) : (skip = 0);
  const movies = await getMoviesByUserID(
    userID,
    category,
    parseInt(skip),
    parseInt(limit)
  );
  if (movies.length === 0) {
    res.json({
      status: "success",
      code: 200,
      data: { movies: [] },
      message: "Movies ended",
    });
    return;
  }
  if (!movies) {
    next();
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      movies,
    },
    page,
    limit,
  });
};

const getMoviebyIDBId = async (req, res, next) => {
  const { category } = req.query;
  const { userID, movieID } = req.params;
  const movie = await getMovieByID(userID, movieID, category);
  if (movie) {
    res.json({
      status: "success",
      data: { id: movie._id },
      message: `Movie is in ${category}`,
    });
  } else {
    next();
  }
};

const addMovie = async (req, res, next) => {
  const { category } = req.query;
  const { userID } = req.params;
  const data = req.body;
  const movie = await createMovie(userID, data, category);
  if (movie) {
    res.status(201).json({
      status: "success",
      data: {
        movie,
      },
    });
  } else {
    next(createError(409, "Already exists"));
  }
};

const removeMovie = async (req, res, next) => {
  const { userID, movieID } = req.params;
  const movie = await deleteMovie(userID, movieID);
  if (movie) {
    res.json({
      status: "success",
      data: { id: movie._id },
      message: "Movie was deleted",
    });
  } else {
    next();
  }
};

module.exports = {
  getMovies,
  getMoviebyIDBId,
  addMovie,
  removeMovie,
};
