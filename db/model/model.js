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
    .then((rows) => {
      console.log(rows);
      return rows;
    });
};
