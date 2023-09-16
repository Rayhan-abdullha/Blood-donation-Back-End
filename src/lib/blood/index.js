const Blood = require("../../models/Blood");
const defaults = require("../../config");
const { errors } = require("../../utils");
const { findUserByID } = require("../user");

const User = require("../../models/User");

const createBlood = async ({
  title,
  body,
  author,
  nationalID,
  place,
  phone,
  patientInfo,
}) => {
  const blood = new Blood({
    title,
    author: author.id,
    body,
    nationalID,
    place,
    phone,
    patientInfo,
  });

  const user = await findUserByID(blood?.author);
  if (!user) {
    throw errors.authorizetionError();
  }
  user.blood.push(blood._doc._id);
  await blood.save();
  await user.save();

  return {
    ...blood._doc,
    id: blood.id,
    author: { id: user.id, name: user.name },
  };
};

const findAll = async ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  search = defaults.search,
}) => {
  const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;
  let bloods = await Blood.find({ status: { $eq: "pending" } })
    .populate({
      path: "author",
      select: "name",
    })
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);

  bloods = bloods.filter((item) => {
    if (item?.author?.name?.includes(search)) {
      return item._doc;
    }
  });
  return { data: bloods, count: bloods.length };
};

const deleteBlood = async ({ id, user = {} }) => {
  if (!id) {
    throw errors.BadRequest("Id is Required");
  }
  const blood = await Blood.findById(id);

  if (!blood) {
    throw errors.notFound();
  }
  let finduser = await User.findById(blood.author.toString());
  let bloods = finduser?.blood?.filter((item) => item.toString() !== id);
  finduser.blood = [...bloods];

  if (user?.role?.includes("admin")) {
    await Blood.findByIdAndDelete(id);
    return await finduser.save();
  } else if (blood.status !== "pending") {
    throw errors.authorizetionError();
  }
  await Blood.findByIdAndDelete(id);
  await finduser.save();
  return;
};

const findBloodsByUserId = async ({ id, path }) => {
  if (!id) {
    throw errors.BadRequest("Id is Required");
  }
  const bloods = await Blood.find({ author: id });

  if (bloods.length === 0) {
    throw errors.notFound("Empty Blood Request List");
  }

  const data = bloods.map((item) => {
    item = item._doc;
    return {
      id: item._id,
      patientName: item.patientInfo.name,
      title: item.title,
      body: item.body,
      bloodGroup: item.bloodGroup,
      status: item.status,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      link: `/bloods/${item._id}`,
    };
  });
  return data;
};

const checkOwnerShip = async ({ resourceId = "", user, userId = "" }) => {
  try {
    if (user?.role.includes("admin")) {
      return true;
    }

    if (userId) {
      if (userId === user?.id) {
        return true;
      } else {
        return false;
      }
    }

    if (resourceId) {
      const blood = await Blood.findById(resourceId);
      if (!blood) {
        return errors.notFound();
      }

      if (blood._doc?.author.toString() === user?.id) {
        return true;
      } else {
        return false;
      }
    }
  } catch (err) {
    return errors.BadRequest();
  }
};

const count = async ({ search }) => {
  let bloods = await Blood.find({
    status: { $eq: "pending" },
  }).populate({
    path: "author",
    select: "name",
  });

  const data = bloods.filter((item) => {
    if (item.author.name.includes(search)) {
      return item._doc;
    }
  });
  return data.length;
};

module.exports = {
  createBlood,
  findAll,
  deleteBlood,
  count,
  findBloodsByUserId,
  checkOwnerShip,
};
