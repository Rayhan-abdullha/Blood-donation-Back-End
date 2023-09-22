const { TestDBConntection } = require("../../utils/DB");
const { user } = require("../../utils/seed");
const server = require("../../utils/server");

// db connection for test code. after the finished test, this function will clear db data and close db
TestDBConntection();

// register routes
describe("GET /api/v1/bloods", () => {
  it("Should get all of blood", async () => {
    const res = await server.get("/api/v1/bloods");
    expect(res.statusCode).toBe(200);
  });
});
