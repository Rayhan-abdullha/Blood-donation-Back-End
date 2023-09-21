const user = {
  name: "coder",
  email: "coder@gmail.com",
  password: "test1122",
};
const user1 = {
  name: "coder",
  email: "coder@gmail.com",
};

const payload = {
  name: "coder",
  email: "coder@gmail.com",
  password: "test11",
  role: ["user", "admin"],
};
const loginData = {
  email: "coder@gmail.com",
  password: "test1122",
};

const loginData1 = {
  email: "coder1@gmail.com",
  password: "test1122",
};

const volunteer = {
  age: 26,
  occupation: "student",
  bloodGroup: "o+",
  gender: "male",
  phone: "1798716196",
  study: "honours 3rd year",
  cover: "http://w3.unsplas.com",
  address: {
    division: "barishal",
    dist: "Bhola",
    upazila: "Charfassion",
    streetAddress: "Charfassion",
    currentAddress: "Dhaka",
  },
  nationalId: "983734826324",
  bio: "Hi, i am rayhan abdullah, i am programmer. i always try to help other..",
};

const volunteer1 = {
  age: 26,
  occupation: "student",
  bloodGroup: "o+",
  phone: "1798716196",
  study: "honours 3rd year",
  cover: "http://w3.unsplas.com",
  address: {
    division: "barishal",
    dist: "Bhola",
    upazila: "Charfassion",
    streetAddress: "Charfassion",
    currentAddress: "Dhaka",
  },
  nationalId: "983734826324",
  bio: "Hi, i am rayhan abdullah, i am programmer. i always try to help other..",
};

const volunteer3 = {
  age: 26,
  occupation: "student",
  bloodGroup: "o+",
  gender: "male",
  phone: "1798716196",
  study: "honours 3rd year",
  cover: "http://w3.unsplas.com",
  status: "volunteer",
  address: {
    division: "barishal",
    dist: "Bhola",
    upazila: "Charfassion",
    streetAddress: "Charfassion",
    currentAddress: "Dhaka",
  },
  nationalId: "983734826324",
  bio: "Hi, i am rayhan abdullah, i am programmer. i always try to help other..",
};

const updateVolunteer = {
  status: "volunteer",
};

module.exports = {
  user,
  loginData,
  loginData1,
  user1,
  volunteer,
  updateVolunteer,
  volunteer1,
  volunteer3,
  payload,
};
