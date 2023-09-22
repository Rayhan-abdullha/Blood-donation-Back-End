const campaignDataTransformation = ({ campaigns = [] }) => {
  const data = campaigns.map((item) => {
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      cover: item.cover,
      open: item.open,
      close: item.close,
      status: item.status,
      startDate: item.startDate,
      endDate: item.endDate,
      link: `/campaign/${item.id}`,
    };
  });
  return data;
};

module.exports = { campaignDataTransformation };
