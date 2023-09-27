const { generateToken, verifyToken } = require("../../../src/lib/token");
const Blood = require("../../../src/models/Blood");
const User = require("../../../src/models/User");
const { TestDBConntection } = require("../../utils/DB");
const { user, blood, adminUser, payload } = require("../../utils/seed");
const server = require("../../utils/server");

// db connection for test code. after the finished test, this function will clear db data and close db
TestDBConntection();

// register routes
describe("PATCH /api/v1/bloods/:id/status", () => {
  const id = "asldfasldf23423947";
  it("Should be throw 404 error", async () => {
    const res = await server
      .patch(`/api/v1/bloods/${id}`)
      .send({ status: "done" });
    expect(res.statusCode).toBe(404);
  });

  it("Should be throw 403 error ", async () => {
    const authUser = await server.post("/api/v1/auth/register").send(user);
    const verifyUser = verifyToken({ token: authUser?.body?.data?.token });
    const createBlood = new Blood({ ...blood, author: verifyUser.id });
    await createBlood.save();
    const res = await server
      .patch(`/api/v1/bloods/${createBlood.id}/status`)
      .set("Authorization", `Bearer ${authUser.body.data.token}`)
      .send({ status: "done" });
    expect(res.statusCode).toBe(403);
  });

  it("Should be update a blood status", async () => {
    const authUser = new User(adminUser);
    await authUser.save();
    const token = generateToken({
      payload: {
        name: authUser.name,
        email: authUser.email,
        password: authUser.password,
        role: ["user", "admin"],
      },
    });
    const createBlood = new Blood({ ...blood, author: authUser.id });
    await createBlood.save();
    const res = await server
      .patch(`/api/v1/bloods/${createBlood.id}/status`)
      .set("Authorization", `Bearer ${token}`)
      .send({ status: "done" });
    expect(res.statusCode).toBe(200);
  });
});
