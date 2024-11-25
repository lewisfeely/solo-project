const express = require("express");
const endpoints = require("../endpoints.json");
const { getTopics, getArticle } = require("./controllers.js/controllers");

const app = express();

app.get("/api", (req, res) => {
  res.status(200).send({ endpoints: endpoints });
});

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticle);

app.use("/*", (req, res, next) => {
  res.status(400).send({ msg: "bad request" });
  next();
});

module.exports = app;
