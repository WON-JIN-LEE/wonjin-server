const { Like } = require('../models/index');

const updateLike = async (req, res) => {
    const postId = Number(req.params.postId);
    const userId = res.locals.user.userId;
    if (!postId) {
        return res
            .status(400)
            .json({ msg: '잘못된 요청입니다.', like_check: false });
    }

    const existsLike = await Like.findAll({ where: { userId, postId } });
    if (existsLike.length) {
        await Like.destroy({ where: { userId, postId } });
        return res
            .status(200)
            .json({ msg: '좋아요가 취소되었습니다.', like_check: false });
    } else {
        await Like.create({
            userId,
            postId,
            check: 1,
        });
        return res.json({ msg: '좋아요가 완료되었습니다.', like_check: true });
    }
};

module.exports = {
    updateLike,
};
