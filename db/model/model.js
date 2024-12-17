const db = require("../../db/connection");
const { sort } = require("../data/test-data/users");
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

  return db
    .query(queryStr, queryValues)
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "not found" });
      }
      return rows;
    })
    .then((rows) => {
      console.log(rows[0].comment_count);
      if (rows[0].comment_count !== undefined) {
        return rows;
      } else {
        return db
          .query(`SELECT * FROM comments WHERE article_id = ${id}`)
          .then(({ rows }) => {
            return rows;
          });
      }
    })
    .then((comments) => {
      return db
        .query(`ALTER TABLE articles ADD comment_count INT DEFAULT 0`)
        .then(() => {
          const length = comments.length;
          return db
            .query(`UPDATE articles SET comment_count = $1`, [length])
            .then(() => {
              return db
                .query(`SELECT * FROM articles WHERE article_id = $1`, [id])
                .then(({ rows }) => {
                  return rows;
                });
            });
        });
    });
};

exports.getArticle = () => {
  const queryString = `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.article_img_url, articles.votes,
    CAST(COUNT(comments.comment_id) AS INT) AS comment_count 
    FROM articles
    LEFT JOIN comments
    ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY created_at DESC`;

  return db.query(queryString).then(({ rows }) => {
    return rows;
  });
};

exports.getCommentsByArticleIds = (article_id) => {
  let queryStr = "SELECT * FROM comments WHERE article_id = $1";
  const args = [];
  args.push(article_id);

  return db.query(queryStr, args).then((comments) => {
    if (!comments.rows.length) {
      return Promise.reject({ status: 404, msg: "not found" });
    }
    return comments;
  });
};

exports.updateCommentsById = (article_id, request) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: "not found" });
      }
      console.log(rows);
      return rows;
    })
    .then(() => {
      const { author, body } = request;
      console.log(article_id);
      const input = [author, body, article_id];
      console.log(input);
      return db.query(
        `INSERT INTO comments
              (author, body, article_id)
              VALUES ($1, $2, $3)
              RETURNING*`,
        input
      );
    })
    .then(({ rows }) => {
      console.log(rows);
      return rows[0];
    });
};

exports.updateArticle = (article_id, votesInc) => {
  const votes = votesInc.inc_votes;
  const inputs = [votes, article_id];
  console.log(inputs);
  return db
    .query(
      `UPDATE articles
    SET votes = votes + $1 
    WHERE article_id = $2`,
      inputs
    )
    .then(() => {
      return db
        .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
        .then(({ rows }) => {
          if (!rows.length) {
            return Promise.reject({ status: 404, msg: "not found" });
          }
          console.log(rows);
          return rows[0];
        });
    });
};
exports.deleteCommentById = (comments_id) => {
  return db
    .query(`SELECT * FROM comments WHERE comment_id = $1`, [comments_id])
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: "not found" });
      }
      return rows;
    })
    .then(() => {
      return db.query(
        `DELETE FROM comments 
              WHERE comment_id = $1`,
        [comments_id]
      );
    })
    .then(() => {
      console.log("in model");
      return db.query(`SELECT * FROM comments`).then(({ rows }) => {
        return rows;
      });
    });
};

exports.getAllUsers = () => {
  let queryStr = `SELECT * FROM users`;

  return db.query(queryStr).then(({ rows }) => {
    return rows;
  });
};

exports.orderArticles = (sort_by, order_by) => {
  const validInputs = [
    "article_id",
    "title",
    "topic",
    "author",
    "body",
    "created_at",
    "votes",
    "article_img_url",
  ];
  console.log(sort_by);
  if (!sort_by || !validInputs.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "bad request" });
  }

  let queryStr = "SELECT * FROM articles";
  if (sort_by && order_by) {
    queryStr += ` ORDER BY ${sort_by} ${order_by}`;
  } else if (order_by) {
    queryStr += ` ORDER BY created_at ${order_by}`;
  } else if (sort_by) {
    queryStr += ` ORDER BY ${sort_by} DESC`;
  }
  console.log(queryStr);
  return db.query(queryStr).then(({ rows }) => {
    return rows;
  });
};

exports.filterByTopics = (topics) => {
  console.log(topics);
  const validInputs = ["mitch", "cats"];
  if (!validInputs.includes(topics)) {
    return Promise.reject({ status: 404, msg: "not found" });
  }
  return db
    .query(`SELECT * FROM articles WHERE topic = $1`, [topics])
    .then(({ rows }) => {
      if (!rows.length === 0) {
        throw new Error();
      }
      console.log(rows);
      return rows;
    });
};
