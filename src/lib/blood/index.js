const Blood = require("../../models/Blood");

const { errors } = require("../../utils");

const createBlood = async ({
  title,
  body,
  nationalID,
  place,
  phone,
  patientInfo,
}) => {
  console.log({ title, body, nationalID, place, phone, patientInfo });
  const blood = new Blood({
    title,
    body,
    nationalID,
    place,
    phone,
    patientInfo,
  });
  await blood.save();
  return { ...blood._doc, id: blood.id };
};

const findAll = async ({
  page,
  limit,
  sortType = "",
  sortBy = "",
  search = "",
}) => {
  const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;
  const bloods = await Blood.find({ status: { $eq: "pending" } })
    .populate({
      path: "author",
      select: "name",
    })
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);

  // const data = bloods.filter((item) => {
  //   if (item.author.name.includes(search)) {
  //     return item;
  //   }
  // });
  return bloods;
};

const deleteBlood = async (id) => {
  if (!id) {
    throw errors.BadRequest("Id is Required");
  }
  const blood = await Blood.findById(id);

  if (!blood) {
    throw errors.BadRequest("Bad Request");
  }

  if (blood.status !== "pending") {
    throw errors.authorizetionError();
  }
  return await Blood.findByIdAndDelete(id);
};

const findBloodsByUserId = async (id) => {
  if (!id) {
    throw errors.BadRequest("Id is Required");
  }
  const bloods = await Blood.find({ author: id });
  return bloods;
};

const count = async () => {
  return await Blood.count();
};

module.exports = {
  createBlood,
  findAll,
  count,
  deleteBlood,
  findBloodsByUserId,
};
