const express = require("express");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { User } = require("../models/index");
const router = express.Router();
require("dotenv").config();
const joi = require("joi");
const authMiddleware = require("../middlewares/authMiddleware");
const logedMiddleware = require("../middlewares/logedMiddleware");

const chkSchema = joi.object({
  nickchk: joi.string().alphanum().min(3).max(30).required(),
  password: joi.string().min(4).required(),
});

router.get("/register", logedMiddleware, async (req, res) => {
  const { loggedin } = res.locals;
  if (loggedin) {
    res.json({ msg: "이미 로그인된 사용자입니다." });
  }
});

router.get("/login", logedMiddleware, async (req, res) => {
  const { loggedin } = res.locals;
  if (loggedin) {
    res.json({ msg: "이미 로그인된 사용자입니다." });
  }
});

// 회원가입 api
router.post("/register", async (req, res) => {
  const { user_id, nickname, user_pw, pw_check } = req.body;
  console.log(user_id, nickname, user_pw, pw_check);
  try {
    await chkSchema.validateAsync({
      nickchk: nickname,
      password: user_pw,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      msg: "닉네임은 최소 3자 이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9)로 구성해야합니다. 비밀번호는 최소 4자 이상이어야 합니다.",
    });
  }

  const existUsers = await User.findAll({
    where: {
      [Op.or]: [{ userId: user_id }, { nickname }],
    },
  });

  if (existUsers.length) {
    return res.status(400).json({
      msg: "이미 가입된 이메일 또는 닉네임이 있습니다.",
    });
  }

  if (user_pw.includes(nickname)) {
    return res.status(400).json({
      msg: "비밀번호에 닉네임과 같은 값이 포함되면 안됩니다.",
    });
  }

  if (user_pw !== pw_check) {
    return res.status(400).json({
      msg: "비밀번호가 일치하지 않습니다.",
    });
  }

  await User.create({ userId: user_id, nickname, password: user_pw });
  res.status(201).json({ msg: "가입이 완료되었습니다." });
});

// 로그인 api
router.post("/login", async (req, res) => {
  const { user_id, user_pw } = req.body;

  const user = await User.findOne({
    where: { userId: user_id, password: user_pw },
  });

  console.log(user);
  if (!user) {
    return res.status(400).json({
      msg: "아이디와 패스워드가 잘못되었습니다.",
    });
  }

  const token = jwt.sign(
    { userId: user.userId },
    process.env.TOKEN_SECRET_KEY,
    { expiresIn: "15m" }
  );
  console.log(token);
  res.status(201).json({ msg: true, mytoken: token, nickname: user.nickname });
});

// 로그아웃
router.delete("/logout", authMiddleware, async (req, res) => {
  res.clearCookie("mytoken");
  res.json({ msg: "로그아웃 되었습니다." });
});

module.exports = router;
