const searvice = require("../../../../lib/volunteer");
const Volunteer = require("../../../../models/Volunteer");

const createVolunteer = async (req, res, next) => {
  const cover = req.body.cover ?? "";
  const study = req.body.study ?? "";
  const bio = req.body.bio ?? "";
  const nationalIdNo = req.body.nationalIdNo ?? "";
  const { occupation, age, gender, bloodGroup, phone, address } = req.validData;

  try {
    const volunteer = await searvice.volunteerRequest({
      occupation,
      age,
      gender,
      bloodGroup,
      phone,
      address,
      cover,
      study,
      bio,
      nationalIdNo,
    });
    console.log("requested");
    return res.status(201).json(volunteer);
  } catch (err) {
    return res.status(400).json("error volunteer");
  }
};

module.exports = createVolunteer;
