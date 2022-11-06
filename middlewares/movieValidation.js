const Joi = require("joi");

module.exports = {
  validationMiddleware: (req, res, next) => {
    const schema = Joi.object({
      idbID: Joi.number().required(),
      category: Joi.string(),
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
    const userSchema = Joi.object({
      userID: Joi.string().required(),
    });
    const validation = schema.validate(req.body);
    const userIDValidation = userSchema.validate(req.params);
    if (validation.error || userIDValidation.error) {
      console.log(validation.error);
      return res.status(400).json({ message: `${validation.error.message}` });
    }
    next();
  },
};
