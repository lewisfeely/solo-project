const express = require("express");
const endpoints = require("../endpoints.json");
const {
  getTopics,
  getArticles,
  getWholeArticle,
  getCommentsByArticleId,
} = require("./controllers.js/controllers");

const app = express();

app.get("/api", (req, res) => {
  res.status(200).send({ endpoints: endpoints });
});

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticles);

app.get("/api/articles", getWholeArticle);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "Not found" });
  next();
});

module.exports = app;
