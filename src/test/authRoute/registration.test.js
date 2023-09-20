const mongoose = require("mongoose");
const connectDB = require("../../db/connectDB");
const request = require("supertest");
const app = require("../../app");

beforeEach(async () => {
  await connectDB();
});

afterEach(async () => {
  await mongoose.connection.close();
});
describe("GET /api/v1/auth/register", () => {
  it("should throw error", async () => {
    const res = await request(app).post("/api/v1/auth/register");
    expect(res.statusCode).toBe(400);
  });

  it("should create a new user", async () => {
    const seed = {
      name: "coder",
      email: "rayhan@gmail.com",
    };
    const res = await request(app).post("/api/v1/auth/register").send(seed);
    expect(res.statusCode).toBe(400);
  });
});
