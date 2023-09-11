const Blood = require("../../models/Blood");

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

const count = async () => {
  return await Blood.count();
};

module.exports = {
  createBlood,
  findAll,
  count,
};
