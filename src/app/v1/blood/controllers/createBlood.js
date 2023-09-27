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
      author: req?.user,
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

    const response = {
      code: 201,
      message: "Blood Request has been sent",
      data: {
        id: blood?.id,
        title: blood?.title,
        body: blood?.body,
        author: blood?.author,
        patientName: blood?.patientInfo?.name,
        place: blood?.place,
        status: blood?.status,
        createdAt: blood?.createdAt,
        updatedAt: blood?.updatedAt,
        link: `${req.url}/${blood?.id}`,
      },
      links: {
        self: `${req.url}`,
        delete: `${req.url}/${blood?.id}}`,
        view: `${req.url}`,
      },
    };

    return res.status(201).json(response);
  } catch (err) {
    return res.status(err.status || 400).json(err.message);
  }
};
module.exports = createBloodRequest;
