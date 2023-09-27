const mongoose = require("mongoose");
const { TestDBConntection } = require("../../utils/DB");
const server = require("../../utils/server");
const { user, user1, loginData, loginData1 } = require("../../utils/seed");

// db connection for test code. after the finished test, this function will clear db data and close db
TestDBConntection();

// register routes
describe("POST /api/v1/auth/login", () => {
  it("Should be login", async () => {
    await server.post("/api/v1/auth/register").send(user);
    const res = await server.post("/api/v1/auth/login").send(loginData);
    expect(res.statusCode).toBe(200);
  });

  it("Should be throw 400 error", async () => {
    const res = await server.post("/api/v1/auth/login").send(loginData1);
    expect(res.statusCode).toBe(400);
  });
});
