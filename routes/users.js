const express = require("express");

const router = express.Router();
const logedMiddleware = require("../middlewares/logedMiddleware");
const controls = require("../controllers");

router.get("/register", logedMiddleware, controls.checkLogin);

router.get("/login", logedMiddleware, controls.checkLogin);

router.post("/register", controls.userSignUp);

router.post("/login", controls.userSignIn);

module.exports = router;
