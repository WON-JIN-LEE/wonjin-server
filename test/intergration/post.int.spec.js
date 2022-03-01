require("dotenv").config();

const app = require("../../app");
const { sequelize } = require("../../models");
const request = require("supertest");
let mytoken = "";

beforeAll(async () => {
  await sequelize
    .sync({ force: false })
    .then(() => {
      console.log("Database connected.");
    })
    .catch((err) => {
      console.error(err);
    });
});

test("GET / Succes Status Code 200", async () => {
  const res = await request(app).get("/");
  expect(res.status).toStrictEqual(200);
});

describe("회원관리 test", () => {
  test("POST /register 회원가입 체크 Status 200", async () => {
    const res = await request(app).post("/register").send({
      user_id: "won5",
      nickname: "kokokokoko",
      user_pw: "won14",
      pw_check: "won14",
    });

    expect(res.status).toStrictEqual(201);
  });

  test("POST /login 로그인 체크 Status 200", async () => {
    const res = await request(app).post("/login").send({
      user_id: "won5",
      user_pw: "won14",
    });
    expect(res.status).toStrictEqual(201);
    mytoken = res.body.mytoken;
  });
});

describe("Boards 테스트 그룹", () => {
  test("GET /:postId/like 없는 게시글 상세 조회 실패 Status 400", async () => {
    const res = await request(app).get(`/post/2`);
    expect(res.status).toStrictEqual(400);
  });
  describe("게시글 INSERT 그룹", () => {
    test("POST /post 게시글 추가 Succes status 201", async () => {
      const res = await request(app)
        .post(`/post`)
        .set("authorization", `Bearer ${mytoken}`)
        .send({
          img_position: "left",
          post_img: "test/777.img",
          post_content: "테스트코드 test",
        });

      expect(res.status).toStrictEqual(201);
    });
    test("게시글 추가할 때 비어있는 데이터 있을 시 status 400", async () => {
      const res1 = await request(app)
        .post(`/post`)
        .set("authorization", `Bearer ${mytoken}`)
        .send({
          img_position: "",
          post_img: "test/777.img",
          post_content: "테스트코드 test",
        });
       const res2 = await request(app)
         .post(`/post`)
         .set("authorization", `Bearer ${mytoken}`)
         .send({
           img_position: "left",
           post_img: "",
           post_content: "테스트코드 test",
         });
       const res3 = await request(app)
         .post(`/post`)
         .set("authorization", `Bearer ${mytoken}`)
         .send({
           img_position: "left",
           post_img: "test/777.img",
           post_content: "",
         });

      expect(res1.status).toStrictEqual(400);
      expect(res2.status).toStrictEqual(400);
      expect(res3.status).toStrictEqual(400);
    });
  });
  describe("좋아요 테스트 그룹", () => {
    test("좋아요 잘못된 params 요청 status 400", async () => {
      const res = await request(app)
        .put(`/post/cart1/like`)
        .set("authorization", `Bearer ${mytoken}`);
      expect(res.status).toStrictEqual(400);
    });

    test("PUT /:postId/like 좋아요 추가 Succes status 200", async () => {
      const res = await request(app)
        .put(`/post/1/like`)
        .set("authorization", `Bearer ${mytoken}`);
      expect(res.status).toStrictEqual(200);
    });
    test("PUT /:postId/like 좋아요 취소 Succes status 200", async () => {
      const res = await request(app)
        .put(`/post/1/like`)
        .set("authorization", `Bearer ${mytoken}`);
      expect(res.status).toStrictEqual(200);
    });
  });

  test("GET /post 전체 글 조회 Status 200", async () => {
    const res = await request(app).get("/post");
    expect(res.status).toStrictEqual(200);
  });
  describe("게시글 수정 테스트 그룹", () => {
    test("PUT /:postId/like 게시글 수정 Succes status 200", async () => {
      const res = await request(app)
        .put(`/post/1`)
        .set("authorization", `Bearer ${mytoken}`)
        .send({
          img_position: "오른쪽",
          post_img: "수정.img",
          post_content: "수정 test",
        });

      expect(res.status).toStrictEqual(200);
    });
    test("게시글 수정 잘못된 요청 status 400", async () => {
      const res = await request(app)
        .put(`/post/false1`)
        .set("authorization", `Bearer ${mytoken}`)
        .send({
          img_position: "오른쪽",
          post_img: "수정.img",
          post_content: "수정 test",
        });

      expect(res.status).toStrictEqual(400);
    });
    test("존재하지 않는 게시글 수정 status 400", async () => {
      const res = await request(app)
        .put(`/post/9999`)
        .set("authorization", `Bearer ${mytoken}`)
        .send({
          img_position: "오른쪽",
          post_img: "수정.img",
          post_content: "수정 test",
        });

      expect(res.status).toStrictEqual(400);
    });
  });

  describe("게시글 상세조회 테스트 그룹", () => {
    test("GET /:postId/like 게시글 상세 조회 Status 200", async () => {
      const res = await request(app).get(`/post/1`);
      expect(res.status).toStrictEqual(200);
    });

    test("게시글 상세 조회 잘못된 요청Status 400", async () => {
      const res = await request(app).get(`/post/false1`);
      expect(res.status).toStrictEqual(400);
    });
    test("존재하지 않는 게시글 상세 조회 요청 Status 400", async () => {
      const res = await request(app).get(`/post/99999`);
      expect(res.status).toStrictEqual(400);
    });
  });

  describe("게시글 DELETE 테스트 그룹", () => {
    test("DELETE /:postId/like 게시글 삭제 Succes status 200", async () => {
      const res = await request(app)
        .delete(`/post/1`)
        .set("authorization", `Bearer ${mytoken}`);
      expect(res.status).toStrictEqual(200);
    });
  });
  test("잘못된 게시글 삭제 요청Status 400", async () => {
    const res = await request(app)
      .delete(`/post/false1`)
      .set("authorization", `Bearer ${mytoken}`);
    expect(res.status).toStrictEqual(400);
  });
  test("존재하지 않는 게시글 삭제 요청Status 400", async () => {
    const res = await request(app)
      .delete(`/post/9991`)
      .set("authorization", `Bearer ${mytoken}`);
    expect(res.status).toStrictEqual(400);
  });
});

afterAll(async () => {
  await sequelize
    .sync({ force: true })
    .then(() => {
      console.log("Database reset.");
    })
    .catch((err) => {
      console.error(err);
    });
});
