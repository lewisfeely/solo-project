const { getTopic, getArticleById, getArticle } = require("../model/model");

exports.getTopics = (req, res) => {
  const topics = getTopic();
  console.log(topics);
  res.status(200).send({ topics });
};

exports.getArticles = (req, res) => {
  const id = req.params.article_id;
  getArticleById(id)
    .then((response) => {
      res.status(200).send({ response });
    })
    .catch((err) => {
      res.status(err.status).send({ msg: err.msg });
    });
};

exports.getWholeArticle = (req, res) => {
  getArticle()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      next(err);
    });
};
