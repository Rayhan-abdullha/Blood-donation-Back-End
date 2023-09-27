const user = {
  name: "coder",
  email: "coder@gmail.com",
  password: "test1122",
};
const adminUser = {
  name: "coder",
  email: "coder@gmail.com",
  password: "test1122",
  role: ["user", "admin"],
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

const blood = {
  title: "Need 2 bags Blood",
  body: "I nedd 2 bags blood. plese help me. this is emargency.pataint is my wife",
  place: "Charfassion hospital",
  nationalID: "6987451236548455",
  phone: "1798716196",
  patientInfo: {
    name: "Mehjabin Khan",
    age: 31,
    bloodGroup: "A+",
    phone: "1798716197",
    nationalID: "666676736876616",
    occupation: "actores",
    gender: "female",
    fatherName: "Mohiuddin Chowdhury",
    motherName: "Ghazala Chowdhury",
    cover: "http://w3.unsplash.com",
    address: {
      country: "Bangladesh",
      division: "Barishal",
      dist: "Bhola",
      upazila: "charfassion",
      houseName: "Mehjabin Vila",
    },
  },
};
const blood1 = {
  title: "Need 2 bags Blood",
  body: "I nedd 2 bags blood. plese help me. this is emargency.pataint is my wife",
  place: "Charfassion hospital",
  nationalID: "6987451236548455",
  phone: "1798716196",
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
  blood,
  blood1,
  adminUser,
};
