const { verifyToken } = require("../../../src/lib/token");
const Blood = require("../../../src/models/Blood");
const { TestDBConntection } = require("../../utils/DB");
const { user, blood } = require("../../utils/seed");
const server = require("../../utils/server");

// db connection for test code. after the finished test, this function will clear db data and close db
TestDBConntection();

// register routes
describe("GET /api/v1/user/:userId/bloods", () => {
  it("Should be find all of users blood by user id", async () => {
    const authUser = await server.post("/api/v1/auth/register").send(user);
    const verifyUser = verifyToken({ token: authUser.body.data.token });
    const res = await server
      .get(`/api/v1/users/${verifyUser.id}/bloods`)
      .set("Authorization", `Bearer ${authUser.body.data.token}`);
    expect(res.statusCode).toBe(200);
  });

  it("Should be throw 401 error", async () => {
    const id = "650da7dbec386ab4b543a28f";
    const res = await server.get(`/api/v1/users/${id}/bloods`);
    expect(res.statusCode).toBe(401);
  });
});
