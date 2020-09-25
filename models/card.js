const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const cardSchema = new mongoose.Schema(
    {
      documentid: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
      },
    //   description: {
    //     type: String,
    //     trim: true,
    //     maxlength: 2000,
    //   },
    //   price: {
    //     type: Number,
    //     maxlength: 32,
    //     trim: true,
    //   },
    //   category: {
    //     type: ObjectId,
    //     ref: "Category",
    //     required: true,
    //   },
      photo: {
        data: Buffer,
        contentType: String,
      },
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("Card", cardSchema);
  