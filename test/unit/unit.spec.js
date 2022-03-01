const logedMiddleware = require("../../middlewares/loggedMiddleware");

const res = {
  locals: jest.fn(() => (isLoggedIn = false)),
  status: jest.fn(() => res),
  json: jest.fn(() => res),
  send: jest.fn(),
};

describe("logedMiddleware test", () => {
  test("잘못된 토큰 에러", async () => {
    const next = jest.fn();

    const req = {
      headers: {
        cookie:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0MSIsImlhdCI6MTY0NTU4ODkwOX0.e7MAZZ3dC_uVWdPJx08b9nzX6k8sZLz0MCOcsKR7sU",
      },
    };
    logedMiddleware(req, res, next);
    expect(next).toBeCalledTimes(1);
  });

  test("토큰 타입 없음", async () => {
    const next = jest.fn();

    const req = {
      headers: {
        cookie:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0MSIsImlhdCI6MTY0NTU4ODkwOX0.Re7MAZZ3dC_uVWdPJx08b9nzX6k8sZLz0MCOcsKR7sU",
      },
    };
    logedMiddleware(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
  });

  test("logedMiddleware test", async () => {
    const next = jest.fn();

    const req = {
      headers: {
        cookie:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0MSIsImlhdCI6MTY0NTU4ODkwOX0.Re7MAZZ3dC_uVWdPJx08b9nzX6k8sZLz0MCOcsKR7sU",
      },
    };
    logedMiddleware(req, res, next);
    expect(next).toBeCalledTimes(1);
  });
});
