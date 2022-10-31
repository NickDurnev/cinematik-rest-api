const createError = require("http-errors");
const { movieService } = require("../service");

const {
  getFavoritesMovies,
  getWatchedMovies,
  addFavorite,
  addWatched,
  removeFavorite,
  removeWatched,
} = movieService;

const getFavorites = async (req, res, next) => {
  const { page, limit = 10 } = req.query;
  const { userID } = req.params;
  let skip = 0;
  page > 1 ? (skip = (page - 1) * limit) : (skip = 0);
  const movies = await getFavoritesMovies(
    userID,
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

const getWatched = async (req, res, next) => {
  const { page, limit = 10 } = req.query;
  const { userID } = req.params;
  let skip = 0;
  page > 1 ? (skip = (page - 1) * limit) : (skip = 0);
  const movies = await getWatchedMovies(
    userID,
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

const createFavoriteMovie = async (req, res, next) => {
  const { userID } = req.params;
  const data = req.body;
  const movie = await addFavorite(data, userID);
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

const createWatchedMovie = async (req, res, next) => {
  const { userID } = req.params;
  const data = req.body;
  const movie = await addWatched(data, userID);
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

const removeFavoriteMovie = async (req, res, next) => {
  const { movieID } = req.params;
  const movie = await removeFavorite(movieID);
  if (movie) {
    res.json({
      status: "success",
      message: "Movie was deleted",
    });
  } else {
    next();
  }
};

const removeWatchedMovie = async (req, res, next) => {
  const { movieID } = req.params;
  const movie = await removeWatched(movieID);
  if (movie) {
    res.json({
      status: "success",
      message: "Movie was deleted",
    });
  } else {
    next();
  }
};

module.exports = {
  getFavorites,
  getWatched,
  createFavoriteMovie,
  createWatchedMovie,
  removeFavoriteMovie,
  removeWatchedMovie,
};
