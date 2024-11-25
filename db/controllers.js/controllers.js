const { getTopic, getArticleById } = require("../model/model");

exports.getTopics = (req, res) => {
  const topics = getTopic();
  console.log(topics);
  res.status(200).send({ topics });
};

exports.getArticle = (req, res) => {
  const id = req.params.article_id;
  console.log(id);
  getArticleById(id).then(({ rows }) => {
    console.log(rows);
    res.status(200).send({ rows });
  });
};
