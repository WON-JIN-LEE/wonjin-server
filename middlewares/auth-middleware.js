require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User } = require("../models/index");

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) { 
        return res.status(401).send({
          msg: "로그인 후 사용해주세요",
        });
    }
  const [tokenType, tokenValue] = authorization.split(" ");

  if (tokenType !== "Bearer") {
    return res.status(401).send({
      msg: "로그인 후 사용해주세요",
    });
  }

    try {
    //  토큰 검사
    const { userId } = jwt.verify(tokenValue, process.env.TOKEN_SECRET_KEY);
    User.findOne({
      where: { userId },
    }).then((user) => {
      res.locals.user = user.dataValues;
      next();
    }).catch(error=> console.log(error));
  } catch (error) {
    return res.status(401).send({
      msg: "로그인 후 사용해주세요",
    });
    }
    

};
