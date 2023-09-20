require("dotenv").config();
const mongoose = require("mongoose");

const clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};

const TestDBConntection = () => {
  beforeEach(async () => {
    await mongoose.connect(process.env.TEST_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterEach(async () => {
    await clearDatabase();
    await mongoose.connection.close();
  });
};

module.exports = {
  TestDBConntection,
};
