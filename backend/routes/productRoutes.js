const express = require('express');
const { addProduct, updateProduct, deleteProduct, getAllProduct } = require('../Controller/productController');
const { isAuthenticated } = require('../middleware/auth');

const router  = express.Router();

router.route("/add-product").post(isAuthenticated,addProduct);
router.route("/update-product/:id").put(isAuthenticated,updateProduct);
router.route("/delete-product/:id").delete(isAuthenticated,deleteProduct);
router.route("/get-product").get(isAuthenticated,getAllProduct)
module.exports  = router