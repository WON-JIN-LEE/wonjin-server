const express = require("express");
const moment = require("moment");

const Posts = require("../schemas/sch_posts");
const Comments = require("../schemas/sch_comments");

const router = express.Router();

// 전체 게시글 목록 조회 API
router.get("/post", async (req, res) => {
    const posts = await Posts
        .find()
        .sort({date: -1});
    res.json({posts});
});

// 게시글 상세 조회 API
router.get("/posts/:postId", async (req, res) => {
    const {postId} = req.params;
    const [posts] = await Posts.find({post_id: Number(postId)});

    res.json({posts});
});

// 게시글 추가 API
router.post("/post", async (req, res) => {
    const {nickname, post_img, post_content} = req.body;

    if (nickname === "" || post_content === "") {
        return res
            .status(400)
            .json({msg: false, errorMessage: "내용을 입력해주세요."});
    }

    await Posts.create({nickname, post_img, post_content});

    res
        .status(201)
        .send({msg: true});
});

// 게시글 수정 API
router.put("/posts/:postId", async (req, res) => {
    const {postId} = req.params;
    const {post_img, post_content} = req.body;

    const esistsPosts = await Posts.find({post_id: Number(postId)});

    if (!esistsPosts.length) {
        return res
            .status(400)
            .json({msg: false, errorMessage: "게시글이 존재하지 않습니다."});
    }

    await Posts.updateOne({post_id: Number(postId)}, {$set: {post_img,
    content}
    });

    res.json({msg: true});
});

// 게시글 삭제 API
router.delete("/posts/:postId", async (req, res) => {
    const {postId} = req.params;

    await Posts.deleteOne({ post_id: Number(postId) });
    
    
    res.json({msg: true});
});
