const db = require("../../db/connection");
// const articles = require("../data/test-data/articles");

exports.getTopic = () => {
  return db.query("SELECT * FROM topics").then((topics) => {
    return topics;
  });
};

exports.getArticleById = (id) => {
  let queryValues = [];
  let queryStr = `SELECT * FROM articles`;
  if (id) {
    queryValues.push(id);
    queryStr += ` WHERE article_id = $1`;
  }
  queryStr += " ORDER BY created_at";

  return db.query(queryStr, queryValues).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 400, msg: "bad request" });
    }
    return rows;
  });
};

exports.getArticle = () => {
  const queryString = `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.article_img_url, articles.votes,
    CAST(COUNT(comments.comment_id) AS INT) AS comment_count 
    FROM articles
    LEFT JOIN comments
    ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY created_at`;

  return db.query(queryString).then(({ rows }) => {
    return rows;
  });
};

exports.getCommentsByArticleIds = (article_id) => {
  let queryStr = "SELECT * FROM comments WHERE article_id = $1";
  const args = [];
  args.push(article_id);

  return db.query(queryStr, args).then((comments) => {
    console.log(comments.rows);
    if (!comments.rows.length) {
      return Promise.reject({ status: 400, msg: "bad request" });
    }
    return comments;
  });
};
