const express = require("express");
const cors = require("cors");
const endpoints = require("../endpoints.json");
const {
  getTopics,
  getArticles,
  getWholeArticle,
  getCommentsByArticleId,
  updateComments,
  updateVotes,
  deleteComment,
  getUsers,
} = require("./controllers.js/controllers");

const app = express();

app.use(express.json());

app.use(cors());

app.get("/api", (req, res) => {
  res.status(200).send({ endpoints: endpoints });
});

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticles);

app.get("/api/articles", getWholeArticle);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.post("/api/articles/:article_id/comments", updateComments);

app.patch("/api/articles/:article_id", updateVotes);

app.delete("/api/comments/:comments_id", deleteComment);

app.get("/api/users", getUsers);

app.use((error, req, res, next) => {
  if (error.status && error.msg) {
    res.status(error.status).send({ msg: error.msg });
  }
  next(error);
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "bad request" });
  }
});

app.all("/*", (req, res, next) => {
  res.status(400).send({ msg: "bad request" });
  next();
});

module.exports = app;
