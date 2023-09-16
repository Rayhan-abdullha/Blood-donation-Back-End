const Volunteer = require("../../models/Volunteer");
const { errors } = require("../../utils");
const User = require("../../models/User");
const {
  notFound,
  authorizetionError,
  BadRequest,
} = require("../../utils/errors");

const volunteerRequest = async ({
  author = {},
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
    author: author.id,
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
  path = "/volunteer",
  page,
  limit,
  sortType = "",
  sortBy = "",
  search = "",
  admin = false,
}) => {
  const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;
  let volunteers = await Volunteer.find()
    .populate({
      path: "author",
      select: "name",
    })
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);

  if (!admin) {
    volunteers = volunteers.filter((item) => item.status !== "pending");
  }

  const filteredData = volunteers
    .filter((item) => item?.author?.name.includes(search))
    .map((item) => ({
      id: item.id,
      name: item.author.name,
      cover: item.cover,
      status: item.status,
      donateCount: item.donateCount,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      link: `${path}/${item.id}`,
    }));

  return filteredData;
};

const findSingle = async ({ id, admin = false }) => {
  if (!id) {
    throw errors.BadRequest("Id is Required");
  }
  const volunteer = await Volunteer.findById(id).populate({
    path: "author",
    select: ["name", "role"],
  });

  if (!volunteer) {
    throw errors.notFound();
  }

  if (
    (!admin && volunteer._doc.status === "pending") ||
    volunteer._doc.status === "block"
  ) {
    throw errors.authorizetionError();
  }
  return {
    ...volunteer._doc,
    id: volunteer.id,
  };
};

const deleteVolunteer = async ({ id, user = {} }) => {
  if (!id) {
    throw errors.BadRequest("Id is Required");
  }
  const volunteer = await Volunteer.findById(id);

  if (!volunteer) {
    throw errors.notFound("Bad Request");
  }

  if (user?.role.includes("admin")) {
    if (volunteer._doc.status !== "pending") {
      const userDel = await User.findById(volunteer.author.toString());
      userDel._doc.role.pop();
      await userDel.save();
    }
    return await Volunteer.findByIdAndDelete(id);
  }

  if (volunteer.status === "pending") {
    return await Volunteer.findByIdAndDelete(id);
  }
  throw errors.authorizetionError();
};

const volunteerOwnerShip = async ({ user = {}, resourceId = "" }) => {
  if (user?.role?.includes("admin")) {
    return true;
  }

  if (resourceId) {
    const findVolunteer = await Volunteer.findById(resourceId);
    if (user.id === findVolunteer._doc?.author.toString()) {
      return true;
    } else {
      return false;
    }
  }

  if (user?.role.includes("volunteer")) {
    return false;
  }
  const findVolunteer = await Volunteer.find({ author: { $eq: user.id } });

  if (findVolunteer.length) {
    return false;
  } else return true;
};

const updatedVolunteerStatus = async ({ id, status = "", admin = false }) => {
  if (!id) {
    throw errors.BadRequest("Id is Required");
  }
  const volunteer = await Volunteer.findById(id);

  if (!volunteer) {
    throw errors.notFound("Volunteer is not Found");
  }

  if (admin) {
    if (status === "") {
      status = volunteer._doc.status;
    }

    volunteer.status = status;
    await volunteer.save();

    const author = await User.findById(volunteer._doc.author.toString());
    if (status === "volunteer" && !author._doc.role.includes("volunteer")) {
      author._doc.role.push(status);
      author.volunteer = volunteer.id;
      await author.save();
    }

    return {
      id: volunteer.id,
      status: volunteer._doc.status,
      createdAt: volunteer._doc.createdAt,
      updatedAt: volunteer._doc.updatedAt,
    };
  } else {
    throw errors.authorizetionError();
  }
};

const count = async ({ search, admin = false }) => {
  const pipeline = [
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $unwind: "$author",
    },
    {
      $match: {
        "author.name": { $regex: search, $options: "i" },
      },
    },
  ];

  let volunteers = await Volunteer.aggregate(pipeline);

  if (!admin) {
    volunteers = volunteers.filter((item) => item.status !== "pending");
  }
  return volunteers.length;
};

module.exports = {
  volunteerRequest,
  findAll,
  count,
  findSingle,
  deleteVolunteer,
  volunteerOwnerShip,
  updatedVolunteerStatus,
};
