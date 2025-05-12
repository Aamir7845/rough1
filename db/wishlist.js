const mongoose = require("mongoose");
const { Schema } = mongoose;
const wishListSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    productId:{ type: Schema.Types.ObjectId, ref: 'products' },
});
const Wishlist = mongoose.model("wishlists", wishListSchema);
module.exports = Wishlist;
