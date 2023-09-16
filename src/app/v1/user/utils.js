const getTransFormData = ({ data = [], path = "/" }) => {
  const tData = data?.map((item) => {
    item = { ...item._doc, id: item.id };
    return {
      id: item.id,
      name: item.name,
      cover: item.cover,
      role: item.role,
      link: `${path}/${item.id}`,
    };
  });
  return tData;
};
module.exports = { getTransFormData };
