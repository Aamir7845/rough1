const Brand = require("./../db/brand");
const User = require("./../db/user");
const Product = require("./../db/product");
const Category = require("./../db/category");
const bcrypt = require("bcrypt");
async function seedData() {
  var userCount = await User.countDocuments();
  if (userCount == 0) {
    let userModel = {
      name: "admin",
      password: "12345",
      email: "admin@test.com",
    };
    const hashPassword = await bcrypt.hash(userModel.password, 10);
    let user = new User({
      name: userModel.name,
      email: userModel.email,
      password: hashPassword,
      isAdmin: true,
    });
    await user.save();
    console.log("user inserted");
  }

  var categoryCount = await Category.countDocuments();
  if (categoryCount == 0) {
    Category.insertMany([
      {
        name: "Category 1",
      },
      {
        name: "Category 2",
      },
    ]);

    console.log("category inserted");
  }

  var brandCount = await Brand.countDocuments();
  if (brandCount == 0) {
    Brand.insertMany([
      {
        name: "Brand 1",
      },
      {
        name: "Brand 2",
      },
    ]);

    console.log("brand inserted");
  }

  var productCount = await Product.countDocuments();
  if (productCount == 0) {
    var categoryId = (await Category.findOne()).toObject()._id;
    var brandId = (await Brand.findOne()).toObject()._id;
    Product.insertMany([
      {
        name: "Product 1",
        shortDescription:
          "Product 1 shortDescription shortDescription shortDescription",
        description:
          "Product 1 Description Description Description Product 1 Description Description Description",
        price: 500,
        discount: 10,
        images: [
          "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/j/a/b/-original-imah83eztbdcsknu.jpeg?q=70&crop=false",
        ],
        categoryId: categoryId,
        brandId: brandId,
        isFeatured: true,
        isNewProduct: true,
      },
      {
        name: "Product 2",
        shortDescription:
          "Product 2 shortDescription shortDescription shortDescription",
        description:
          "Product 2 Description Description Description Product 2 Description Description Description",
        price: 900,
        discount: 20,
        images: [
          "https://rukminim2.flixcart.com/image/416/416/xif0q/cases-covers/back-cover/i/f/o/ipky-mtog055g-kwine-case-original-imah87fwnhrqmg3b.jpeg?q=70&crop=false",
        ],
        categoryId: categoryId,
        brandId: brandId,
        isFeatured: true,
        isNewProduct: true,
      },
      {
        name: "Product 3",
        shortDescription:
          "Product 3 shortDescription shortDescription shortDescription",
        description:
          "Product 3 Description Description Description Product 3 Description Description Description",
        price: 500,
        discount: 0,
        images: [
          "https://rukminim2.flixcart.com/image/416/416/xif0q/cases-covers/back-cover/j/l/e/nn-candy-rd-12-5g-5-flipkart-smartbuy-original-imah895yqm2z7quh.jpeg?q=70&crop=false",
        ],
        categoryId: categoryId,
        brandId: brandId,
        isFeatured: true,
        isNewProduct: true,
      },
      {
        name: "Product 4",
        shortDescription:
          "Product 4 shortDescription shortDescription shortDescription",
        description:
          "Product 4 Description Description Description Product 4 Description Description Description",
        price: 500,
        discount: 0,
        images: [
          "https://rukminim2.flixcart.com/image/832/832/kdrpksw0-0/shirt/5/n/r/40-441001732med-grey-john-players-original-imafuhzjamfkfret.jpeg?q=70&crop=false",
        ],
        categoryId: categoryId,
        brandId: brandId,
        isFeatured: true,
        isNewProduct: true,
      },
    ]);

    console.log("product inserted");
  }
}

module.exports = seedData;
