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

describe("Boards test 코드", () => {
  test("GET /post/:postId 없는 게시글 상세 조회 실패 Status 400", async () => {
    const res = await request(app).get(`/post/2`);
    expect(res.status).toStrictEqual(400);
  });

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

  test("GET /post 전체 글 조회 Status 200", async () => {
    const res = await request(app).get("/post");
    expect(res.status).toStrictEqual(200);
  });

  test("PUT /post/:postId 게시글 수정 Succes status 200", async () => {
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

  test("GET /post/:postId 게시글 상세 조회 Status 200", async () => {
    const res = await request(app).get(`/post/1`);
    expect(res.status).toStrictEqual(200);
  });

  test("DELETE /post/:postId 게시글 삭제 Succes status 200", async () => {
    const res = await request(app)
      .delete(`/post/1`)
      .set("authorization", `Bearer ${mytoken}`);
    expect(res.status).toStrictEqual(200);
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
