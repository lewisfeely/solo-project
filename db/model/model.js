const db = require("../../db/connection");

exports.getTopic = () => {
  return db.query("SELECT * FROM topics").then((topics) => {
    console.log(topics);
    return topics;
  });
};

exports.getArticleById = (id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = ${id}`)
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 400, msg: "bad request" });
      }
      return result;
    });
};
