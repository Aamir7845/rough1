const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
  quantity: Number,
});
const Cart = mongoose.model("carts", cartSchema);
module.exports = Cart;
