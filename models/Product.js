const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  img:
    {
      name: {
        type: String,
      },
      path: {
        type: String,
      },
      type: {
        type: String,
      },
    },
});

module.exports = mongoose.model("Product", productSchema);
