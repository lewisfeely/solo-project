const {} = require("../model/model");
const endpoints = require("../../endpoints.json");

exports.getTopics = (req, res) => {
  console.log(endpoints["GET /api/topics"].exampleResponse);
  res.status(200).send({
    endpoints: endpoints["GET /api/topics"].exampleResponse,
  });
};
