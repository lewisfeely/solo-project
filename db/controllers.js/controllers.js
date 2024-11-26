const { getTopic, getArticleById } = require("../model/model");

exports.getTopics = (req, res) => {
  const topics = getTopic();
  console.log(topics);
  res.status(200).send({ topics });
};

exports.getArticle = (req, res, next) => {
  const id = req.params.article_id;
  getArticleById(id)
    .then(({ rows }) => {
      res.status(200).send({ rows });
    })
    .catch((err) => {
      console.log(err);
      res.status(err.status).send({ msg: err.msg });
    });
};
