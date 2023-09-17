const User = require("../../models/User");
const Blood = require("../../models/Blood");
const Volunteer = require("../../models/Volunteer");
const defaults = require("../../config");
const { errors, hasing } = require("../../utils");
const {
  singleUserDataTransForom,
  updatedUserDataTransFormation,
} = require("../../app/v1/user/utils");

const findUsers = async ({
  admin = false,
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  search = defaults.search,
}) => {
  if (!admin) {
    throw authorizetionError();
  }
  const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;

  const fileter = {
    name: {
      $regex: search,
      $options: "i",
    },
  };
  let users = await User.find(fileter)
    .populate({ path: "volunteer" })
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);
  return users;
};

const findUserInfo = async (id) => {
  if (!id) {
    throw errors.BadRequest("Id is Required");
  }
  let user = await User.findById(id).populate({ path: "volunteer" });

  if (!user) {
    throw errors.notFound();
  }

  user = { ...user._doc, id: user.id };
  user = singleUserDataTransForom({ user });

  return user;
};

const deleteUser = async ({ id }) => {
  if (!id) {
    throw errors.BadRequest();
  }
  const user = await User.findById(id);

  console.log(user);

  if (!user) {
    throw errors.notFound();
  }

  // const volunteer = await Volunteer(user.volunteer._id);
  // const bloods = await Blood();

  // if (volunteer) {
  //   await Volunteer.findByIdAndDelete(user.volunteer._id);
  // }

  // await User.findByIdAndDelete(id);

  return;
};

const updatedInfo = async (
  id,
  {
    name,
    email,
    password,
    cover,
    occupation,
    age,
    gender,
    study,
    bloodGroup,
    picture,
    nationalId,
    address,
  }
) => {
  if (!id) {
    throw errors.BadRequest("Id is Required");
  }

  let user = await User.findById(id);

  if (!user) {
    throw errors.notFound();
  }

  // user update
  user.name = name ?? user.name;
  if (email) {
    const existUser = await findUserByEmail(email);
    if (existUser) {
      throw errors.BadRequest("Email already Exist");
    }
    user.email = email;
  }

  if (password) {
    console.log(password);
    const hash = await hasing.generatehash(password);
    console.log(hash);
    user.password = hash;
  }
  await user.save();

  // updated volunteer

  if (user.volunteer) {
    const volunteer = await Volunteer.findById(user.volunteer.toString());
    if (volunteer) {
      (volunteer.cover = cover ?? volunteer.cover),
        (volunteer.occupation = occupation ?? volunteer.occupation),
        (volunteer.age = age ?? volunteer.age),
        (volunteer.gender = gender ?? volunteer.gender),
        (volunteer.study = study ?? volunteer.study),
        (volunteer.bloodGroup = bloodGroup ?? volunteer.bloodGroup),
        (volunteer.picture = picture ?? volunteer.picture),
        (volunteer.nationalId = nationalId ?? volunteer.nationalId);

      if (address) {
        volunteer.address = {
          country: "Bangladesh",
          division: address.division || volunteer.division,
          dist: address.dist || volunteer.dist,
          upazila: address.upazila || volunteer.upazila,
          currentAddress: address.currentAddress || volunteer.currentAddress,
          streetAddress: address.streetAddress || volunteer.streetAddress,
        };
      }
      await volunteer.save();
      return { ...user._doc, id: user.id, ...volunteer._doc };
    }
  }
  return { ...user._doc, id: user.id };
};

const updatePass = async (id, { password }) => {
  if (!id) {
    throw errors.BadRequest("Id is Required");
  }

  const user = await User.findById(id);
  if (!user) {
    throw errors.notFound("User not Found");
  }

  if (password) {
    const hash = await hasing.generatehash(password);
    user.password = hash;
  } else {
    user.password = user.password;
  }

  await user.save();
  return {
    id: user.id,
    password: user.password,
  };
};

const userOwnership = async ({ user = {}, resourceId = "" }) => {
  if (user.role.includes("admin")) {
    return true;
  }

  if (resourceId) {
    const authUser = await User.findById(resourceId);
    if (authUser) {
      if (user.id === authUser.id) {
        return true;
      } else false;
    }
  }

  return false;
};

const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user ? user : false;
};

const findUserByID = async (id) => {
  const user = await User.findById(id);
  return user ? user : false;
};

const existUser = async (email) => {
  const user = await findUserByEmail(email);
  return user ? true : false;
};

const createUser = async ({ name, email, password, cover = "" }) => {
  const user = new User({ name, email, password, cover });
  await user.save();
  return { ...user._doc, id: user.id };
};

const count = async ({ search }) => {
  const fileter = {
    name: {
      $regex: search,
      $options: "i",
    },
  };
  let users = await User.find(fileter);
  return users.length;
};
module.exports = {
  findUserByEmail,
  existUser,
  createUser,
  findUsers,
  findUserByID,
  count,
  findUserInfo,
  userOwnership,
  deleteUser,
  updatedInfo,
  updatePass,
};
