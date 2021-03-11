const { body } = require("express-validator");

const checkAlphaNumeric = val => {
  const regex = /^[a-zA-Z0-9_]+$/;
  const result = val.match(regex);
  return result !== null;
}


const signupValidationRules = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email field cannot be empty")
      .bail()
      .isEmail()
      .withMessage("The input is not a valid email."),

    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username field cannot be empty")
      .bail()
      .custom(checkAlphaNumeric)
      .withMessage("Username can only have alphabets and numbers and underscore"),

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
