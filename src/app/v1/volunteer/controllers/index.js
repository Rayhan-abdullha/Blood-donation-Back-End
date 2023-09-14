const createVolunteer = require("./createVolunteer");
const findAllVolunters = require("./findAllVolunteers");
const findSingleVolunteer = require("./findSingleVolunteer");
const deleteVolunterRequest = require("./deleteVolunterRequest");
const updateVolunteer = require("./updateVolunteerUsingPatch");
module.exports = {
  createVolunteer,
  findAllVolunters,
  findSingleVolunteer,
  deleteVolunterRequest,
  updateVolunteer,
};
