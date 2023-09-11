const bloodSearvices = require("../../../../lib/blood");

const findUserBloods = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const bloods = await bloodSearvices.findBloodsByUserId(userId);

    const data = bloods.map((item) => {
      return {
        id: item.id,
        patientName: item.patientInfo.name,
        title: item.title,
        body: item.body,
        bloodGroup: item.bloodGroup,
        status: item.status,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      };
    });

    res.status(200).json({ code: 200, data });
  } catch (err) {
    next(err);
  }
};
module.exports = findUserBloods;
