const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDoc = YAML.load("./swagger.yaml");

const applyMiddleWare = (app) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
  app.use(express.json());
  app.use(cors());
};

module.exports = applyMiddleWare;
