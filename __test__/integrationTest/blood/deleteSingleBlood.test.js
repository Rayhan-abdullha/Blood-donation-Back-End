const { verifyToken } = require("../../../src/lib/token");
const Blood = require("../../../src/models/Blood");
const { TestDBConntection } = require("../../utils/DB");
const { user, blood } = require("../../utils/seed");
const server = require("../../utils/server");

// db connection for test code. after the finished test, this function will clear db data and close db
TestDBConntection();

// register routes
describe("GET /api/v1/bloods/:id", () => {
  const id = "6503308cd64533c41dd94d3f";
  it("Should be throw 404 not found error", async () => {
    const authUser = await server.post("/api/v1/auth/register").send(user);
    const res = await server
      .delete(`/api/v1/bloods/${id}`)
      .set("Authorization", `Bearer ${authUser.body.data.token}`);
    expect(res.statusCode).toBe(404);
  });

  it("Should be delete blood", async () => {
    const authUser = await server.post("/api/v1/auth/register").send(user);
    const verifyUser = verifyToken({ token: authUser.body.data.token });
    const newBlood = new Blood({ ...blood, author: verifyUser.id });
    await newBlood.save();
    const res = await server
      .delete(`/api/v1/bloods/${newBlood.id}`)
      .set("Authorization", `Bearer ${authUser.body.data.token}`);
    expect(res.statusCode).toBe(200);
  });
});