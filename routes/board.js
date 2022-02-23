const express = require("express");
const authMiddleware = require("../middlewares/auth-middleware");

const { Op } = require("sequelize");
const { Board, Like, User } = require("../models/index");

const router = express.Router();

// 전체 게시글 목록 조회 API
router.get("/", async (req, res) => {
  const posts = await Board.findAll({
    include: [
      {
        model: User,
        required: false,
        attributes: ["userId", "nickname"],
      },
      {
        model: Like,
        required: false,
        attributes: ["userId", "postId"],
      },
    ],
  });
  console.log(posts);
  const posts_obj = posts.map((ele) => {
    const obj = {};

    obj["post_id"] = ele["postId"];
    obj["userId"] = ele["userId"];
    obj["post_content"] = ele["content"];
    obj["post_img"] = ele["img"];
    obj["nickname"] = ele["User"]["nickname"];
    obj["post_like"] = ele["Likes"].length;
    obj["createdAt"] = ele["createdAt"];
    obj["upload_date"] = ele["updatedAt"];
    return obj;
  });
  res.json({ posts: posts_obj });
});

// 게시글 상세 조회 API
router.get("/:postId", async (req, res) => {
  const postId = Number(req.params.postId);
  if (!postId) {
    return res
      .status(400)
      .json({ msg: false, errorMessage: "요청이 올바르지 않습니다." });
  }
  const post = await Board.findOne({
    where: { postId },
    include: [
      {
        model: User,
        required: false,
        attributes: ["userId", "nickname"],
      },
      {
        model: Like,
        required: false,
        attributes: ["userId", "postId"].count,
      },
    ],
  });

  const post_obj = {};

  post_obj["post_id"] = post["postId"];
  post_obj["userId"] = post["userId"];
  post_obj["post_content"] = post["content"];
  post_obj["post_img"] = post["img"];
  post_obj["nickname"] = post["User"]["nickname"];
  post_obj["post_like"] = post["Likes"].length;
  post_obj["createdAt"] = post["createdAt"];
  post_obj["upload_date"] = post["updatedAt"];

  res.json({ post: post_obj });
});

// // 게시글 추가 API
router.post("/", authMiddleware, async (req, res) => {
  const { user_id, post_img, post_content } = req.body;

  if (!user_id || !post_img || !post_content) {
    return res
      .status(400)
      .json({ msg: false, errorMessage: "내용을 입력해주세요." });
  }

  await Board.create({
    userId: user_id,
    img: post_img,
    content: post_content,
  });

  res.status(201).send({ msg: true });
});

// 게시글 수정 API
router.put("/:postId", authMiddleware, async (req, res) => {
  const postId = Number(req.params.postId);
  if (!postId) {
    return res
      .status(400)
      .json({ msg: false, errorMessage: "요청이 올바르지 않습니다." });
  }
  const { post_img, post_content } = req.body;

  const esistsBoard = await Board.findOne({ where: { postId } });
  if (!esistsBoard) {
    return res
      .status(400)
      .json({ msg: false, errorMessage: "게시글이 존재하지 않습니다." });
  }

  const temp = await Board.update(
    { img: post_img, content: post_content },
    { where: { postId } }
  );
  console.log(temp);
  res.json({ msg: true });
});

// 게시글 삭제 API
router.delete("/:postId", authMiddleware, async (req, res) => {
  const postId = Number(req.params.postId);
  if (!postId) {
    return res
      .status(400)
      .json({ msg: false, errorMessage: "요청이 올바르지 않습니다." });
  }

  const esistsBoard = await Board.findOne({ where: { postId } });
  if (!esistsBoard) {
    return res
      .status(400)
      .json({ msg: false, errorMessage: "게시글이 존재하지 않습니다." });
  }

  await Board.destroy({ where: { postId } });

  res.json({ msg: true });
});

// 좋아요 api
router.put("/:postId/like", authMiddleware, async (req, res) => {
  const postId = Number(req.params.postId);
  const userId = res.locals.user.userId;
  if (!postId) {
    return res
      .status(400)
      .json({ msg: "잘못된 요청입니다.", like_check: false });
  }

  const existsLike = await Like.findAll({ where: { userId, postId } });
  if (existsLike.length) {
    await Like.destroy({ where: { userId, postId } });
    return res
      .status(200)
      .json({ msg: "좋아요가 취소되었습니다.", like_check: false });
  } else {
    await Like.create({
      userId,
      postId,
      check: 1,
    });
    return res.json({ msg: "좋아요가 완료되었습니다.", like_check: true });
  }
});

module.exports = router;
