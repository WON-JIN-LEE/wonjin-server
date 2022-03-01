const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

const controls = require("../controllers");


// 전체 게시글 목록 조회 API
router.get("/", controls.getBoards);

// 게시글 상세 조회 API
router.get("/:postId", controls.getDetailBoard);

// // 게시글 추가 API
router.post("/", authMiddleware, controls.insertBoard);

// 게시글 수정 API
router.put("/:postId", authMiddleware, controls.updateBoard);

// 게시글 삭제 API
router.delete("/:postId", authMiddleware, controls.deleteBoard);

// 좋아요 api
router.put("/:postId/like", authMiddleware, controls.updateLike);

module.exports = router;
