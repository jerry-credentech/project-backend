const Card = require("../models/card");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getCardById = (req, res, next, id) => {
  Card.findById(id).exec((err, prod) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    req.card = prod;
    next();
  });
};

//Create a new Card(New Document)
exports.createCard = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem with the Image",
      });
    }
    //Setting Restrictions
    let card = Card(fields);
    //Handle the file Here.
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size is greater than 3mb",
        });
      }
      card.photo.data = fs.readFileSync(file.photo.path);
      card.photo.contentType = file.photo.type;
    }
    //Saving it to the DB
    card.save((err, card) => {
      if (err) {
          console.log(err);
        return res.status(400).json({
          error: "not able to save to db",
        });
      }
      res.json(card);
    });
  });
};

exports.getCard = (req, res) => {
  req.card.photo = undefined;
  return res.json(req.card);
};

exports.photo = (req, res, next) => {
  if (req.card.photo.data) {
    res.set("Content-Type", req.card.photo.contentType);
    return res.send(req.card.photo.data);
  }
  next();
};

exports.deleteCard = (req, res) => {
  let card = req.card;
  card.remove((err, card) => {
    if (err) {
      res.status(400).json({
        error: err,
      });
    }
    res.json({
      message: "Deletetion Was a success",
      card,
    });
  });
};

exports.updateCard = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }

    //Updation of the Card.
    let card = req.card;
    card = _.extend(card, fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!",
        });
      }
      card.photo.data = fs.readFileSync(file.photo.path);
      card.photo.contentType = file.photo.type;
    }

    //save to the DB
    card.save((err, card) => {
      if (err) {
        res.status(400).json({
          error: "Updation of the Card failed",
        });
      }
      res.json(card);
    });
  });
};

exports.getAllCards = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  Card.find()
    .select("-photo")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, cards) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(cards);
    });
};
