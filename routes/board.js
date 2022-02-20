const express = require("express");
const authMiddleware = require("../middlewares/auth-middleware");


const { Op } = require("sequelize");
const { Board } = require("../models/index");

const router = express.Router();

// 전체 게시글 목록 조회 API
router.get("/", async (req, res) => {
  const posts = await Board.findAll();

  res.json({ posts });
});

// 게시글 상세 조회 API
router.get("/:postId", async (req, res) => {
  const postId = Number(req.params.postId);
  if (!postId) {
    return res
      .status(400)
      .json({ msg: false, errorMessage: "요청이 올바르지 않습니다." });
  }
  const post = await Board.findOne({ where: { postId } });

  res.json({ post });
});

// // 게시글 추가 API
router.post("/", authMiddleware,async (req, res) => {
  const { nickname, post_img, post_content } = req.body;

  if (!nickname || !post_img || !post_content) {
    return res
      .status(400)
      .json({ msg: false, errorMessage: "내용을 입력해주세요." });
  }

  await Board.create({
    userId: nickname,
    img: post_img,
    content: post_content,
  });

  res.status(201).send({ msg: true });
});

// 게시글 수정 API
router.put("/:postId", authMiddleware,async (req, res) => {
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
    { img: post_img, content:post_content },
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
router.get("/:postId/like", authMiddleware, async (req, res) => {
     const postId = Number(req.params.postId);
     if (!postId) {
       return res
         .status(400)
         .json({ msg: false, like_check: false });
     }
    
    res.json({ msg: true, like_check: true });
});

module.exports = router;
