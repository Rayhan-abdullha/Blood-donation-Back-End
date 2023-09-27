const { generateToken } = require("../../../src/lib/token");
const User = require("../../../src/models/User");
const Volunteer = require("../../../src/models/Volunteer");
const { TestDBConntection } = require("../../utils/DB");
const { user, payload, volunteer } = require("../../utils/seed");
const server = require("../../utils/server");

// db connection for test code. after the finished test, this function will clear db data and close db
TestDBConntection();

// register routes
describe("GET /api/v1/volunteers/:id", () => {
  it("Should be delete", async () => {
    const user = new User(payload);
    const newVol = new Volunteer({ ...volunteer, author: user.id });
    await newVol.save();
    user.volunteer = newVol.id;
    await user.save();
    const token = generateToken({ payload });
    const res = await server
      .delete(`/api/v1/volunteers/${newVol._id.toString()}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});
