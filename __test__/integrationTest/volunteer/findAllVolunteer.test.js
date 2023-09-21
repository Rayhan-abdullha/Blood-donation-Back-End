const { TestDBConntection } = require("../../utils/DB");
const server = require("../../utils/server");

// db connection for test code. after the finished test, this function will clear db data and close db
TestDBConntection();

// register routes
describe("GET /api/v1/volunteers", () => {
  it("Should be returns volunteer list", async () => {
    const res = await server.get("/api/v1/volunteers");
    expect(res.statusCode).toBe(200);
  });
});
