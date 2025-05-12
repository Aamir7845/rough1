const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  date: Date,
  items: Array(mongoose.Schema.Types.Mixed),
  paymentType: String,
  address: mongoose.Schema.Types.Mixed,
  status: String,
});
const Order = mongoose.model("orders", orderSchema);
module.exports = Order;
