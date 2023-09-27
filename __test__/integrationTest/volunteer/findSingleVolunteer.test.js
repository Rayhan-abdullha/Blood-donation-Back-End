const { generateToken } = require("../../../src/lib/token");
const Volunteer = require("../../../src/models/Volunteer");
const { TestDBConntection } = require("../../utils/DB");
const { user, volunteer, volunteer3 } = require("../../utils/seed");
const server = require("../../utils/server");

// db connection for test code. after the finished test, this function will clear db data and close db
TestDBConntection();

// register routes
describe("GET /api/v1/volunteers/:id", () => {
  it("Should be thorw error 400, because this is castError", async () => {
    const id = "adfasldfjasdf";
    const res = await server.get(`/api/v1/volunteers/${id}`);
    expect(res.statusCode).toBe(400);
  });

  it("Should be thorw 404 error. because this id volunteer is not found", async () => {
    const id = "650bc4eb3128b7b8ad63ca63";
    const res = await server.get(`/api/v1/volunteers/${id}`);
    expect(res.statusCode).toBe(404);
  });
  it("Should be return a single volunteer", async () => {
    const vol = new Volunteer(volunteer3);
    await vol.save();
    const res = await server.get(`/api/v1/volunteers/${vol._id.toString()}`);
    expect(res.statusCode).toBe(200);
  });
});
