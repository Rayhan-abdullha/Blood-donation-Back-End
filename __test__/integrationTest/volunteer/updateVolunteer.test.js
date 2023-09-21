const { generateToken } = require("../../../src/lib/token");
const User = require("../../../src/models/User");
const Volunteer = require("../../../src/models/Volunteer");
const { TestDBConntection } = require("../../utils/DB");
const { volunteer, updateVolunteer, payload } = require("../../utils/seed");
const server = require("../../utils/server");

TestDBConntection();

// register routes
describe("PATCH /api/v1/volunteers", () => {
  const authToken = generateToken({ payload });

  it("Should be updated by status", async () => {
    const user = new User({ ...payload });
    await user.save();
    const newVolunter = new Volunteer({ ...volunteer, author: user.id });
    await newVolunter.save();
    const updateV = await server
      .patch(`/api/v1/volunteers/${newVolunter._id.toString()}/status`)
      .set("Authorization", `Bearer ${authToken}`)
      .send(updateVolunteer);
    expect(updateV.statusCode).toBe(200);
  });

  it("Should be throw 404 error", async () => {
    const user = new User({ ...payload });
    await user.save();
    const newVolunter = new Volunteer({ ...volunteer, author: user.id });
    await newVolunter.save();
    const updateV = await server
      .patch(`/api/v1/volunteers/650bc4eb3128b7b8ad63ca63/status`)
      .set("Authorization", `Bearer ${authToken}`)
      .send(updateVolunteer);
    expect(updateV.statusCode).toBe(404);
  });
});
