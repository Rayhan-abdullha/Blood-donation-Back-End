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

const singleUserDataTransForom = ({ user = {} }) => {
  const userData = {
    id: user.id,
    name: user.name,
    email: user.email,
    cover: user.cover,
    role: user.role,
  };

  const volunteerData = {
    id: user.volunteer._id,
    bloodGroup: user.volunteer.bloodGroup,
    occupation: user.volunteer.occupation,
    age: user.volunteer.age,
    gender: user.volunteer.gender,
    phone: user.volunteer.phone,
    status: user.volunteer.status,
    bio: user.volunteer.bio,
    study: user.volunteer.study,
    cover: user.volunteer.cover,
    nationalID: user.volunteer.nationalIdNo,
    address: {
      country: user.volunteer.address.country,
      division: user.volunteer.address.division,
      dist: user.volunteer.address.dist,
      upazila: user.volunteer.address.upazila,
      currentAddress: user.volunteer.address.currentAddress,
      parmanentAddress: user.volunteer.address.parmanentAddress,
    },
  };
  const data = {
    user: userData,
    volunteer: volunteerData,
  };

  return data;
};

module.exports = {
  getTransFormData,
  singleUserDataTransForom,
};
