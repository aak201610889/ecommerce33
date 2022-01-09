const Products = require('../model/productModel');

const productCtrl = {
  getProducts: async(req, res) => {
    try {
      const products = await Products.find();
      res.json(products);
      }
    catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  },
  createProduct: async(req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        description,
        content,
        images,
        category,
      } = req.body;
      if (!images) return res.status(400).json({ msg: "no image upload" })
      const product = await Products.findOne({ product_id });
      if (product) return res.status(400).json({ msg: "product already exist" })
      const newProduct = new Products({
        product_id,title,price,description,content,images,category
      })
      await newProduct.save();
      res.json({msg:"product created"});
      }
    catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  },
  deleteProduct: async(req, res) => {
    try {
      await Products.findOneAndDelete({ product_id: req.params.id });
        res.json({msg:"product deleted"});
      }
    catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  },
  updateProduct: async(req, res) => {
    try {
      const {title, price, description, content, images, category } = req.body;
      if (!images) return res.status(400).json({ msg: "no image upload" })
      await Products.findOneAndUpdate({ _id:req.params.id }, {
        title, price, description, content, images, category
      });
      res.json({msg:"product updated"});
    }
    catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  }


};

module.exports = productCtrl;