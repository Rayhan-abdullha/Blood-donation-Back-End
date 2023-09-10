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

module.exports = {
  createBlood,
};
