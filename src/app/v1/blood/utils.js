const getTrasformData = ({ item = [], path = "/" }) => {
  const bloods = item?.map((blood) => {
    return {
      id: blood?.id,
      author: blood?.author,
      patientName: blood?.patientInfo?.name,
      place: blood?.place,
      status: blood?.status,
      link: `${path}`,
    };
  });
  return bloods;
};
module.exports = {
  getTrasformData,
};
