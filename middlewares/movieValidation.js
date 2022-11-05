const Joi = require("joi");

module.exports = {
  validationMiddleware: (req, res, next) => {
    const schema = Joi.object({
      idbId: Joi.number().required(),
      userId: Joi.string().required(),
      poster_path: Joi.string().allow(null, ""),
      title: Joi.string().required(),
      vote_average: Joi.number().allow(null, ""),
      genres: Joi.array().allow(null, ""),
      release_date: Joi.string().allow(null, ""),
      tagline: Joi.string().allow(null, ""),
      runtime: Joi.number().allow(null, ""),
      overview: Joi.string().allow(null, ""),
      budget: Joi.number().allow(null, ""),
    });
    const validation = schema.validate(req.body);
    if (validation.error) {
      console.log(validation.error);
      return res.status(400).json({ message: `${validation.error.message}` });
    }
    next();
  },
};
