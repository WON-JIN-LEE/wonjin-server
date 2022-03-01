const { Board, Like, User } = require("../models");


const getBoards = async (req, res) => {
  const postsList = await Board.findAll({
    include: [
      {
        model: User,
        required: false,
        attributes: ["userId", "nickname"],
      },
      {
        model: Like,
        required: false,
        attributes: ["userId"],
        include: [
          {
            model: User,
            required: false,
            attributes: ["nickname"],
          },
        ],
      },
    ],
    order: [["updatedAt", "DESC"]],
  });

  const posts = postsList.map((ele) => {
    const post = {
      post_id: ele["postId"],
      userId: ele["userId"],
      post_content: ele["content"],
      post_img: ele["img"],
      img_position: ele["img_position"],
      nickname: ele["User"]["nickname"],
      post_like: ele["Likes"].length,
      like_list: ele["Likes"].map((obj) => obj["User"].nickname),
      createdAt: ele["createdAt"],
      upload_date: ele["updatedAt"],
    };

    return post;
  });
  res.json({ posts });
};

const getDetailBoard = async (req, res) => {
  const postId = Number(req.params.postId);
  if (!postId) {
    return res
      .status(400)
      .json({ msg: false, errorMessage: "요청이 올바르지 않습니다." });
  }
  const onePost = await Board.findOne({
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
        attributes: ["userId", "postId"],
        include: [
          {
            model: User,
            required: false,
            attributes: ["nickname"],
          },
        ],
      },
    ],
  });

  if (!onePost) {
    return res
      .status(400)
      .json({ msg: false, errorMessage: "없는 게시글 입니다." });
  }

  const post = {
    post_id: post["postId"],
    userId: post["userId"],
    post_content: post["content"],
    post_img: post["img"],
    img_position: post["img_position"],
    nickname: post["User"]["nickname"],
    post_like: post["Likes"].length,
    like_list: post["Likes"].map((obj) => obj["User"].nickname),
    createdAt: post["createdAt"],
    upload_date: post["updatedAt"],
  };

  res.status(200).json({ post });
};

const insertBoard = async (req, res) => {
  const { img_position, post_img, post_content } = req.body;
  const userId = res.locals.user.userId;

  if (!img_position || !post_img || !post_content) {
    return res
      .status(400)
      .json({ msg: false, errorMessage: "내용을 입력해주세요." });
  }

  await Board.create({
    userId: userId,
    img_position: img_position,
    img: post_img,
    content: post_content,
  });

  res.status(201).send({ msg: true });
};

const updateBoard = async (req, res) => {
  const postId = Number(req.params.postId);
  if (!postId) {
    return res
      .status(400)
      .json({ msg: false, errorMessage: "요청이 올바르지 않습니다." });
  }
  const { post_img, img_position, post_content } = req.body;

  const esistsBoard = await Board.findOne({ where: { postId } });
  if (!esistsBoard) {
    return res
      .status(400)
      .json({ msg: false, errorMessage: "게시글이 존재하지 않습니다." });
  }

  const temp = await Board.update(
    { img: post_img, img_position, content: post_content },
    { where: { postId } }
  );
  console.log(temp);
  res.status(200).json({ msg: true });
};

const deleteBoard = async (req, res) => {
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
};


module.exports = {
  getBoards,
  getDetailBoard,
  insertBoard,
  updateBoard,
  deleteBoard,
};
