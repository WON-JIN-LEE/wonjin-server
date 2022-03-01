require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User } = require("../models/index");

module.exports = async (req, res, next) => {
  console.log(req.cookies);

  const { mytoken } = req.cookies;
  try {
    if (!mytoken) {
      res.locals.loggedin = false;
      next();
    }
    const [tokenType, tokenValue] = mytoken.split(" ");

    if (tokenType !== "Bearer") {
      res.locals.loggedin = false;
      next();
    }

    //  토큰 검사
    const { userId } = jwt.verify(tokenValue, process.env.TOKEN_SECRET_KEY);
    const user = await User.findOne({
      where: { userId },
    });

    // 우리 회원이 아니라면 로그인 GO
    if (!user) {
      res.locals.loggedin = false;
      next();
    }

    res.locals.user = user.dataValues;
    res.locals.loggedin = true;
    next();
  } catch (error) {
    res.locals.loggedin = false;
    next();
  }
};
