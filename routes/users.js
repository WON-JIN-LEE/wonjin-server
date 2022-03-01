const express = require("express");

const router = express.Router();
const loggedMiddleware = require("../middlewares/loggedMiddleware");
const controls = require("../controllers");

router.get("/register", loggedMiddleware, controls.checkLogin);

router.get("/login", loggedMiddleware, controls.checkLogin);

router.post("/register", controls.userSignUp);

router.post("/login", controls.userSignIn);

module.exports = router;
