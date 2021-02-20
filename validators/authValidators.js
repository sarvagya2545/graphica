const { body } = require("express-validator");

const signupValidationRules = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email field cannot be empty")
      .bail()
      .isEmail()
      .withMessage("The input is not a valid email."),

    body("password")
      .trim()
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long."),

    body("confirmPassword")
      .trim()
      .exists()
      .custom((val, { req }) => val === req.body.password)
      .withMessage("Confirm password field must match password field"),
  ];
};

const loginValidationRules = () => {
  return [
    body("email")
    .trim()
    .notEmpty()
    .withMessage("Email field cannot be empty")
    .bail()
    .isEmail()
    .withMessage("The input is not a valid email."),

    body("password")
      .trim()
      .notEmpty()
      .withMessage("Please enter your password."),
  ];
};

module.exports = {
  loginValidationRules,
  signupValidationRules,
};
