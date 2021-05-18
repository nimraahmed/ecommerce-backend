const router = require("express").Router();
const verify = require("./verifyToken");

router.get("/", verify, (req, res) => {
  res.json({
    products: {
      product: "product 1",
      description: "private route",
    },
  });
});

module.exports = router;
