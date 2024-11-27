const { query } = require("../connection");
const {
  getTopic,
  getArticleById,
  getArticle,
  getCommentsByArticleIds,
  updateArticle,
  deleteCommentById,
  updateCommentsById,
  getAllUsers,
  orderArticles,
} = require("../model/model");

exports.getTopics = (req, res) => {
  const topics = getTopic();
  res.status(200).send({ topics });
};

exports.getArticles = (req, res, next) => {
  const id = req.params.article_id;

  getArticleById(id)
    .then((response) => {
      res.status(200).send({ response });
    })
    .catch((err) => {
      res.status(err.status).send({ msg: err.msg });
    });
};

exports.getWholeArticle = (req, res, next) => {
  const { sort_by, order_by } = req.query;
  if (sort_by || order_by) {
    orderArticles(sort_by, order_by)
      .then((rows) => {
        res.status(200).send({ rows });
      })
      .catch((err) => {
        next(err);
      });
  } else {
    getArticle()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        next(err);
      });
  }
};

exports.getCommentsByArticleId = (req, res) => {
  const id = req.params.article_id;
  getCommentsByArticleIds(id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      res.status(err.status).send({ msg: err.msg });
    });
};

exports.updateComments = (req, res, next) => {
  const { article_id } = req.params;
  const { author, body } = req.body;

  updateCommentsById(article_id, { author, body })
    .then((result) => {
      res.status(201).send({ result });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateVotes = (req, res, next) => {
  const { body } = req;
  const { article_id } = req.params;
  updateArticle(article_id, body)
    .then((updatedArticle) => {
      res.status(200).send({ updatedArticle });
    })
    .catch((err) => {
      next(err);
    });
};
exports.deleteComment = (req, res, next) => {
  const { comments_id } = req.params;
  deleteCommentById(comments_id)
    .then((newTable) => {
      res.status(204).send({ msg: "No content" });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUsers = (req, res, next) => {
  getAllUsers()
    .then((rows) => {
      res.status(200).send({ rows });
    })
    .catch((err) => {
      next(err);
    });
};
