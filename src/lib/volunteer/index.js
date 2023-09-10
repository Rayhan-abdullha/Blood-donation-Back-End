const Volunteer = require("../../models/Volunteer");
const User = require("../../models/User");

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

const findAll = async ({
  page,
  limit,
  sortType = "",
  sortBy = "",
  search = "",
}) => {
  const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;
  const volunteers = await Volunteer.find()
    .populate({
      path: "author",
      select: "name",
    })
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);

  const data = volunteers.filter((item) => {
    if (item.author.name.includes(search)) {
      return item;
    }
  });
  return data;
};

const count = async () => {
  return await Volunteer.count();
};

module.exports = {
  volunteerRequest,
  findAll,
  count,
};
