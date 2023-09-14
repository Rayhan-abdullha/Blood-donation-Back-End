const searvice = require("../../../../lib/volunteer");
const createVolunteer = async (req, res, next) => {
  const cover = req.body.cover ?? "";
  const study = req.body.study ?? "";
  const bio = req.body.bio ?? "";
  const nationalIdNo = req.body.nationalIdNo ?? "";
  const { occupation, age, gender, bloodGroup, phone, address } = req.validData;

  try {
    const volunteer = await searvice.volunteerRequest({
      author: req?.user,
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

    const response = {
      code: 201,
      message: "Volunteer request has been sent",
      data: {
        id: volunteer.id,
        name: volunteer?.author?.name ?? "coder",
        status: volunteer.status,
        createdAt: volunteer.createdAt,
        updatedAt: volunteer.updatedAt,
        link: `/volunteers/${volunteer.id}`,
      },
      links: {
        self: `${req.path}${volunteer.id}`,
        delete: `${req.path}${volunteer.id}`,
      },
    };
    return res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = createVolunteer;
