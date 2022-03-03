require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../models/index');

module.exports = async (req, res, next) => {
    res.locals.isLoggedIn = false;

    try {
        const mytoken = `Bearer ${req.cookies.mytoken}`;

        const [tokenType, tokenValue] = mytoken.split(' ');

        //  토큰 검사
        const { userId } = jwt.verify(tokenValue, process.env.TOKEN_SECRET_KEY);
        const user = await User.findOne({
            where: { userId },
        });

        // 우리 회원이라면 로그인 X
        if (user) {
            res.locals.user = user.dataValues;
            res.locals.isLoggedIn = true;
            next();
        }
    } catch (error) {
        console.log(error);
        next();
    }
};
