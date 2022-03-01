// 📋 테스트 시나리오
// 토큰 에러 테스트 => 회원가입, 로그인 테스트

require("dotenv").config();
const app = require("../../app");
const { sequelize } = require("../../models");
const request = require("supertest");

let mytoken = "";
const postData = {
  img_position: "left",
  post_img: "it/777.img",
  post_content: "테스트코드 it",
};

// DB 연결
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


test("GET / 회원가입 페이지 Code 200", async () => {
  const res = await request(app).get("/register");
  expect(res.status).toStrictEqual(200);
});

test("GET / 로그인페이지 Code 200", async () => {
  const res = await request(app).get("/login");
  expect(res.status).toStrictEqual(200);
});

describe("회원가입, 로그인 테스트", () => {
  it("POST /register 회원가입 체크 Status 200", async () => {
    const res = await request(app).post("/register").send({
      user_id: "won1",
      nickname: "kokokokoko",
      user_pw: "won11",
      pw_check: "won11",
    });
    expect(res.status).toStrictEqual(201);
  });

  it("POST /login 로그인 성공 Status 201", async () => {
    const res = await request(app).post("/login").send({
      user_id: "won1",
      user_pw: "won11",
    });
    expect(res.status).toStrictEqual(201);
    mytoken = res.body.mytoken;
  });

  describe("토큰 에러 테스트", () => {
    it("POST /post token이 없을때 Succes status 401", async () => {
      const res = await request(app)
        .post(`/post`)
        .set("authorization", ``)
        .send(postData);
      expect(res.status).toStrictEqual(401);
    });

    it("tokenType 오류 Succes status 401", async () => {
      const res = await request(app)
        .post(`/post`)
        .set("authorization", `Basic ${mytoken}`)
        .send(postData);
      expect(res.status).toStrictEqual(401);
    });

    it("우리회원 토큰이 아닐 때 오류 Succes status 401", async () => {
      const invalidToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.5fRN2-ecsTQmI8ApQrA9gBV2dsde2etTzTAUtyXNCO1vqDJBE";
      const res = await request(app)
        .post(`/post`)
        .set("authorization", `Bearer ${invalidToken}`)
        .send(postData);
      expect(res.status).toStrictEqual(401);
    });
  });

  it("POST /logout 로그아웃 Status 200", async () => {
    const res = await request(app)
      .post("/logout")
      .set("authorization", `Bearer ${mytoken}`);
    expect(res.status).toStrictEqual(200);
  });
});

// DB 초기화
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
