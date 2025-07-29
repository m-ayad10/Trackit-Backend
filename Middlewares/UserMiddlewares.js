const Joi = require("joi");

const loginValidation = (req, res, next) => {
  try {
    const Schema = Joi.object({
       email: Joi.string().email().required().messages({
        "string.empty": "Email is required",
        "string.email": "Invalid email",
      }),
      password: Joi.string().required().min(6).max(20).messages({
        "string.empty": "Password is required",
        "string.min": "Password must be atleast 6 characters",
        "string.max": "Password should not exceed 20 character",
      }),
    });
    const { error } = Schema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: "Bad Request", success: false, error });
    }
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", success: false, error });
  }
};

const signUpValidation = (req, res, next) => {
  try {
    const Schema = Joi.object({
      email: Joi.string().email().required().messages({
        "string.empty": "Email is required",
        "string.email": "Invalid email",
      }),
      password: Joi.string().required().min(6).max(20).messages({
        "string.empty": "Password is required",
        "string.min": "Password must be atleast 6 characters",
        "string.max": "Password should not exceed 20 character",
      }),
    });    
    const { error } = Schema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: "Bad Request", success: false, error });
    }
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", success: false, error });
  }
};

module.exports = { loginValidation, signUpValidation };
