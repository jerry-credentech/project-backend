const express = require("express");

var router = express.Router();
const { check } = require("express-validator");
const { signin, signout, signup, isSignedIn } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name").isLength({ min: 3 }).withMessage("Name is too small!"),
    check("email").isEmail().withMessage("Email not valid"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password Should have minimum of 6 characters"),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("Email not valid"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password should not be empty"),
  ],
  signin
);

router.get("/signout", signout);
router.get("/testRoute", isSignedIn, (req, res) => {
  res.send("A Protected Route");
});

module.exports = router;
