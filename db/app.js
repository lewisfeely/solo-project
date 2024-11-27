const express = require("express");
const endpoints = require("../endpoints.json");
const {
  getTopics,
  getArticles,
  getWholeArticle,
  getCommentsByArticleId,
  updateComments,
  updateVotes,
} = require("./controllers.js/controllers");

const app = express();

app.use(express.json());

app.get("/api", (req, res) => {
  res.status(200).send({ endpoints: endpoints });
});

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticles);

app.get("/api/articles", getWholeArticle);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.post("/api/articles/:article_id/comments", updateComments);

app.patch("/api/articles/:article_id", updateVotes);

app.use((error, req, res, next) => {
  if (error.status && error.msg) {
    res.status(error.status).send({ msg: error.msg });
  }
});

app.all("/*", (req, res, next) => {
  res.status(400).send({ msg: "bad request" });
  next();
});

module.exports = app;
