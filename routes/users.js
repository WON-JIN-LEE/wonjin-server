const express = require("express");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { User } = require("../models/index");
const router = express.Router();
require("dotenv").config();


// 회원가입 api
router.post("/register", async (req, res) => {
  const { user_id, nickname, user_pw } = req.body;

  const existUsers = await User.findAll({
    where: {
      [Op.or]: [{ userId: user_id }, { nickname }],
    },
  });
  if (existUsers.length) {
    return res.status(400).send({
      msg: "이미 가입된 이메일 또는 닉네임이 있습니다.",
    });
  }

  await User.create({ userId: user_id, nickname, password: user_pw });
  res.status(201).send({ msg: "가입이 완료되었습니다." });
});

// 로그인 api
router.post("/login", async (req, res) => {
  const { user_id, user_pw } = req.body;

  const user = await User.findOne({
    where: { userId: user_id, password: user_pw },
  });

  if (!user) {
    return res.status(400).send({
      msg: "아이디와 패스워드가 잘못되었습니다.",
    });
  }

  const token = jwt.sign({ userId: user.userId }, process.env.TOKEN_SECRET_KEY);
  console.log(token);
  res.send({ msg: true, mytoken: token });
});

module.exports = router;