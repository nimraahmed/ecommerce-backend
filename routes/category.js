const router = require("express").Router();
const Category = require("../models/Categories");
const adminAuth = require("../validation/adminAuth");

//create category
router.post("/create", adminAuth, async (req, res) => {
  const category = new Category({
    name: req.body.name,
  });

  //prevent duplication in category name
  const categoryExists = await Category.findOne({ name: req.body.name });
  if (!categoryExists) {
    try {
      const savedCategory = await category.save();
      res.send("Category added!");
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(400).send("Category already exists!");
  }
});

//read
router.get("/all", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.json(error);
  }
});

//get individual id
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.json(category);
  } catch (error) {
    res.status(400).send(error);
  }
});

//delete
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    const delCat = await category.remove();
    res.status(200).send(`Category successfully deleted ${delCat}`);
  } catch (error) {
    res.send(error);
  }
});

//update
// router.put("/:id", async (req, res) => {
//   try {
//     const category = await req.body;
//     const update = new Category(category);
//     const updatedCat = await update.save();
//     res.send(updatedCat);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

module.exports = router;
