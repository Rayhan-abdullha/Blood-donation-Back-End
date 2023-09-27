const volunteerSeavice = require("../../../../lib/volunteer");
const findSingleVolunteer = async (req, res, next) => {
  const { id } = req.params;
  try {
    const volunteer = await volunteerSeavice.findSingle({
      id,
      admin: req.admin,
      authUser: req.authUser,
    });
    const response = {
      code: 200,
      data: {
        id: volunteer.id,
        name: volunteer?.author?.name,
        age: volunteer.age,
        status: volunteer.status,
        bloodGroup: volunteer.bloodGroup,
        gender: volunteer.gender,
        donateCount: volunteer.donateCount,
        study: volunteer.study,
        cover: volunteer.cover,
        address: volunteer.address,
        donateBlood: volunteer.donateBlood,
      },
      link: `/volunteers/${volunteer.id}`,
    };
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = findSingleVolunteer;
