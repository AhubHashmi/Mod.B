const express = require("express")
const router = express.Router()
const SignUpController = require("../controller/signUpController")
const LoginController = require("../controller/loginController")
import { getProductById, getProducts } from '../controller/product-controller.js';

router.post("/api/signUp",SignUpController.post)

router.post("/api/login",LoginController.post)

router.get('/products', getProducts);
router.get('/product/:id', getProductById);


module.exports = router