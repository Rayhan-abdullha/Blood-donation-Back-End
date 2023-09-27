const { generateToken } = require("../../../src/lib/token");
const { TestDBConntection } = require("../../utils/DB");
const { volunteer, user, volunteer1 } = require("../../utils/seed");
const server = require("../../utils/server");

// db connection for test code. after the finished test, this function will clear db data and close db
TestDBConntection();

// register routes
describe("POST /api/v1/volunteers", () => {
  const payload = {
    name: "coder",
    email: "coder@gmail.com",
    role: ["user"],
  };
  const authToken = generateToken({ payload });

  it("Should be tow 401 error, because token is required, this is private route", async () => {
    await server.post("/api/v1/auth/register").send(user);
    const res = await server.post("/api/v1/volunteers").send(volunteer);
    expect(res.statusCode).toBe(401);
  });

  it("Should be throw 400 error", async () => {
    await server.post("/api/v1/auth/register").send(user);
    const res = await server
      .post("/api/v1/volunteers")
      .set("Authorization", `Bearer ${authToken}`)
      .send(volunteer1);
    expect(res.statusCode).toBe(400);
  });
  it("Should be create a new volunteer", async () => {
    await server.post("/api/v1/auth/register").send(user);
    const res = await server
      .post("/api/v1/volunteers")
      .set("Authorization", `Bearer ${authToken}`)
      .send(volunteer);
    expect(res.statusCode).toBe(201);
  });
});
