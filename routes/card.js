const express = require("express");
var router = express.Router();

const {
  getCardById,
  createCard,
  deleteCard,
  getCard,
  updateCard,
  photo,
  getAllCards,
} = require("../controllers/card");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//Get Parameters
router.param("userId", getUserById);
router.param("cardId", getCardById);

//Routes for the Card

//Create a new Card
router.post("/card/create/:userId", isSignedIn, isAuthenticated, createCard);

//getting a particular card and its image Uploaded.
router.get("/card/:cardId", getCard);
router.get("card/photo/:cardId", photo);

//updating the Card Route
router.put("/card/:cardId/:userId", isSignedIn, isAuthenticated, updateCard);
//Deleting the Card Route
router.delete("/card/:cardId/:userId", isSignedIn, isAuthenticated, deleteCard);
//Listing all the card the User has uploaded
router.get("/cards", getAllCards);

module.exports = router;
