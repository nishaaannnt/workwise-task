const express = require("express");
const router = express.Router();

router.get("/health-check",(req,res) => { res.send({message:"ok"})})

router.use("/product", require("./server/routes/product.route"))
router.use("/cart", require("./server/routes/cart.route"))

module.exports = router;