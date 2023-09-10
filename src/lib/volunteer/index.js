const Volunteer = require("../../models/Volunteer");

const volunteerRequest = async ({
  occupation,
  age,
  gender,
  bloodGroup,
  phone,
  address,
  cover = "",
  study = "",
  bio = "",
  nationalIdNo = "",
}) => {
  const volunteer = new Volunteer({
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

  await volunteer.save();
  return { ...volunteer._doc, id: volunteer.id };
};

module.exports = {
  volunteerRequest,
};
