const request = require("supertest");
const app = require("../../src/app");

const server = request(app);

module.exports = server;
