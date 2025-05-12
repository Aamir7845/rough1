const Product = require("./../db/product");
const mongoose = require("mongoose");

async function addProduct(model) {
  let product = new Product({
    ...model,
  });
  await product.save();
  return product.toObject();
}

async function updateProduct(id, model) {
  await Product.findByIdAndUpdate(id, model);
}
async function deleteProduct(id) {
  await Product.findByIdAndDelete(id);
}

async function getAllProducts() {
  let products = await Product.find();
  return products.map((x) => x.toObject());
}

async function getProduct(id) {
  let product = await Product.findById(id);
  return product.toObject();
}

async function getNewProducts() {
  let newProducts = await Product.find({
    isNewProduct: true,
  });
  return newProducts.map((x) => x.toObject());
}

async function getFeaturedProducts() {
  let featuredProducts = await Product.find({
    isFeatured: true,
  });
  return featuredProducts.map((x) => x.toObject());
}

async function getProductForListing(
  searchTerm,
  categoryId,
  page,
  pageSize,
  sortBy,
  sortOrder,
  brandId
) {
  if (!sortBy) {
    sortBy = "price";
  }
  if (!sortOrder) {
    sortOrder = -1;
  }
  let queryFilter = {};
  if (searchTerm) {
    queryFilter.$or = [
      {
        name: { $regex: ".*" + searchTerm + ".*" },
      },
      {
        shortDescription: { $regex: ".*" + searchTerm + ".*" },
      },
    ];
  }
  if (categoryId) {
    queryFilter.categoryId = categoryId;
  }
  if (brandId) {
    queryFilter.brandId = brandId;
  }
  console.log("queryFilter", queryFilter);
  const products = await Product.find(queryFilter)
    .sort({
      [sortBy]: +sortOrder,
    })
    .skip((+page - 1) * +pageSize)
    .limit(+pageSize);
  return products.map((x) => x.toObject());
}
module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  getNewProducts,
  getFeaturedProducts,
  getProductForListing,
};
