const Volunteer = require("../../models/Volunteer");
const { errors } = require("../../utils");
const User = require("../../models/User");
const {
  notFound,
  authorizetionError,
  BadRequest,
} = require("../../utils/errors");

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

const findSingle = async (id) => {
  if (!id) {
    throw notFound("Id not Found");
  }
  const volunteer = await Volunteer.findById(id).populate({
    path: "author",
    select: ["name", "role"],
  });
  return {
    ...volunteer._doc,
    id: volunteer.id,
  };
};

const deleteVolunteer = async (id) => {
  if (!id) {
    throw errors.BadRequest("Id is Required");
  }
  const volunteer = await Volunteer.findById(id);

  if (!volunteer) {
    throw errors.BadRequest("Bad Request");
  }

  if (volunteer.status !== "pending") {
    throw errors.authorizetionError();
  }
  return await Volunteer.findByIdAndDelete(id);
};

const count = async () => {
  return await Volunteer.count();
};
module.exports = {
  volunteerRequest,
  findAll,
  count,
  findSingle,
  deleteVolunteer,
};
