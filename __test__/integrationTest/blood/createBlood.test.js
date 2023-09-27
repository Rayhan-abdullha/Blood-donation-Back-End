const { TestDBConntection } = require("../../utils/DB");
const { user, blood1, blood } = require("../../utils/seed");
const server = require("../../utils/server");

// db connection for test code. after the finished test, this function will clear db data and close db
TestDBConntection();

// register routes
describe("POST /api/v1/bloods", () => {
  it("Should be create a new blood", async () => {
    const authUser = await server.post("/api/v1/auth/register").send(user);
    const res = await server
      .post("/api/v1/bloods")
      .set("Authorization", `Bearer ${authUser.body.data.token}`)
      .send(blood);
    expect(res.statusCode).toBe(201);
  });

  it("Should throw 401 error", async () => {
    const res = await server.post("/api/v1/bloods").send(blood);
    expect(res.statusCode).toBe(401);
  });

  it("Should be throw 400 error", async () => {
    const authUser = await server.post("/api/v1/auth/register").send(user);
    const res = await server
      .post("/api/v1/bloods")
      .set("Authorization", `Bearer ${authUser.body.data.token}`)
      .send(blood1);
    expect(res.statusCode).toBe(400);
  });
});
