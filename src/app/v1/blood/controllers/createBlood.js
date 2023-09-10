const bloodSearvices = require("../../../../lib/blood");

const createBloodRequest = async (req, res, next) => {
  const body = req.body.body ?? "";
  const nationalID = req.body.nationalID ?? "";
  const patientcover = req.body.patientInfo.cover ?? "";
  const patientNationalID = req.body.patientInfo.nationalID ?? "";

  const { title, place, phone, patientInfo } = req.validData;
  try {
    const blood = await bloodSearvices.createBlood({
      title,
      body,
      nationalID,
      place,
      phone,
      patientInfo: {
        ...patientInfo,
        nationalID: patientNationalID,
        cover: patientcover,
      },
    });

    res.status(201).json(blood);
  } catch (err) {
    res.status(400).json(err);
  }
};
module.exports = createBloodRequest;
