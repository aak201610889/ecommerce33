const Category = require('../model/categoryModel');

const categoryCtrl = {
  getCategories: async (req, res) => { 
    try {
      const categories = await Category.find();
      res.json(categories);
    }
    catch (err) {
      res.status(500).json({msg:err.message});
      }
  },
  createCategory: async (req, res) => {
    try {
      //if user have role=1 ---> admin
      // only admin can create,delete and update category
      const { name } = req.body;
      const category = await Category.findOne({ name });
      if (category) {
        res.status(400).json({ msg: 'category already exist' });
      }
      const newCategory = new Category({ name });
      await newCategory.save();
      res.json({ msg: 'category created' });
    }
    
    catch (err) {
      res.status(500).json({msg:err.message});
    }
  },
  deleteCategory: async (req, res) => {
  
    try { 
      await Category.findByIdAndDelete(req.params.id);
      res.json({ msg: 'category deleted' });
    }
    catch (err) {
      res.status(500).json({msg:err.message});
    }
  },
  updateCategory: async (req, res) => {
  
    try { 
      const { name } = req.body;
      await Category.findByIdAndUpdate({ _id: req.params.id }, { name });
      res.json({ msg: 'category updated' });
    }
    catch (err) {
      res.status(500).json({msg:err.message});
    }
  }
};


module.exports = categoryCtrl;