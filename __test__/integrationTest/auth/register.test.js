const mongoose = require("mongoose");
const { TestDBConntection } = require("../../utils/DB");
const server = require("../../utils/server");
const { user, user1 } = require("../../utils/seed");

// db connection for test code. after the finished test, this function will clear db data and close db
TestDBConntection();

// register routes
describe("POST /api/v1/auth/register", () => {
  it("Should throw 400 error", async () => {
    const res = await server.post("/api/v1/auth/register").send(user1);
    expect(res.statusCode).toBe(400);
  });

  it("Should create a new user", async () => {
    const res = await server.post("/api/v1/auth/register").send(user);
    expect(res.statusCode).toBe(201);
  });

  it("Should throw 409 conflict error because user already exist", async () => {
    await server.post("/api/v1/auth/register").send(user);
    const res1 = await server.post("/api/v1/auth/register").send(user);
    expect(res1.statusCode).toBe(409);
  });
});
