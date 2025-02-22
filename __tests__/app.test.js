const endpointsJson = require("../endpoints.json");
const app = require("../db/app");
const db = require("../db/connection");
const data = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");
const request = require("supertest");
const topics = require("../db/data/test-data/topics");

beforeEach(() => {
  return seed(data);
});
afterAll(() => {
  return db.end();
});

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});
describe("GET /api/topics", () => {
  test("200: responds with an array of all topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        console.log(body.body);
        body.body.forEach((topic) => {
          expect(topic).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
      });
  });
  test("400: returns bad request when nothing is passed through", () => {
    return request(app)
      .get("/api/tropic")
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("bad request");
      });
  });
});
describe("GET /api/articles/:article_id", () => {
  test("200: responds with an article with the corresponding article", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        console.log(body.response);
        body.response.forEach((articles) => {
          expect(articles).toMatchObject({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            body: expect.any(String),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
          });
        });
      });
  });
  test("400: responds with an error when requested an id that doesnt exist", () => {
    return request(app)
      .get("/api/articles/2000")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });
});

describe("GET /api/articles", () => {
  test("200: should return the array of articles", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(13);
        body.forEach((articles) => {
          expect(articles).toMatchObject({
            author: expect.any(String),
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
            comment_count: expect.any(Number),
          });
        });
        console.log(body);
        expect(body).toBeSortedBy("created_at", { descending: true });
      });
  });
  test("400: returns bad request when inputting an invalid api", () => {
    return request(app)
      .get("/api/tartcles")
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("bad request");
      });
  });
});
describe("GET /api/articles/:article_id/comments", () => {
  test("get articles by id", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        comments.rows.forEach((comments) => {
          expect(comments).toMatchObject({
            comment_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            article_id: expect.any(Number),
          });
        });
      });
  });
  test("400: bad request", () => {
    return request(app)
      .get("/api/articles/3/comm")
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("bad request");
      });
  });
  test("404: not found", () => {
    return request(app)
      .get("/api/articles/1000/comments")
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("not found");
      });
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  test("201: adds a value to the table", () => {
    const newComment = {
      author: "rogersop",
      body: "helloooo",
    };
    return request(app)
      .post("/api/articles/2/comments")
      .send(newComment)
      .expect(201)
      .then(({ body }) => {
        console.log(body);
        const final = body.result;
        expect(final).toEqual(
          expect.objectContaining({
            comment_id: 19,
            body: expect.any(String),
            article_id: 2,
            author: expect.any(String),
            votes: 0,
            created_at: expect.any(String),
          })
        );
      });
  });
  test("400: bad request", () => {
    const newComment = {
      author: "rogersop",
      body: "it was either that or muhammed",
    };
    return request(app)
      .post("/api/articles/")
      .send(newComment)
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("bad request");
      });
  });
  test("404: returns not found when passed an article id that doesnt work", () => {
    const newComment = {
      author: "rogersop",
      body: "it was either that or muhammed",
    };
    return request(app)
      .post("/api/articles/870/comments")
      .send(newComment)
      .expect(404)
      .then(({ body }) => {
        console.log(body);
        const { msg } = body;
        expect(msg).toBe("not found");
      });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("200: should be able to update an article by article id", () => {
    const votes = { inc_votes: 100 };
    return request(app)
      .patch("/api/articles/2")
      .send(votes)
      .expect(200)
      .then(({ body }) => {
        console.log(body);
        const { updatedArticle } = body;
        expect(updatedArticle).toMatchObject({
          title: "Sony Vaio; or, The Laptop",
          topic: "mitch",
          author: "icellusedkars",
          body: expect.any(String),
          created_at: expect.any(String),
          article_img_url: expect.any(String),
          votes: 100,
        });
      });
  });
  test("404: Not found when passed an article id that doenst exist", () => {
    const votes = { inc_votes: 100 };
    return request(app)
      .patch("/api/articles/1000")
      .send(votes)
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("not found");
      });
  });
  test("400: bad request when sent an invalid data type into votes", () => {
    const votes = { inc_votes: "i just washed my hands that why their wet" };
    return request(app)
      .patch("/api/articles/3")
      .send(votes)
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("bad request");
      });
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  test("204: removes a comment from the comment table", () => {
    return request(app).delete("/api/comments/3").expect(204);
  });
  test("400: bad request", () => {
    return request(app)
      .delete("/api/commets/3")
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("bad request");
      });
  });
  test("404: not found when searching for a comment id that doesnt exist", () => {
    return request(app)
      .delete("/api/comments/3000")
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("not found");
      });
  });
});

describe("GET /api/users", () => {
  test("200: should return an array of user objects", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        body.rows.forEach((users) => {
          expect(users).toMatchObject({
            username: expect.any(String),
            name: expect.any(String),
            avatar_url: expect.any(String),
          });
        });
      });
  });
  test("400: bad request", () => {
    return request(app)
      .get("/api/invalid-endpoint")
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("bad request");
      });
  });
});

describe("GET: /api/articles?sort_by=title&order_by=DESC", () => {
  test("orders by username in decending order", () => {
    return request(app)
      .get("/api/articles?sort_by=title&order_by=DESC")
      .expect(200)
      .then(({ body }) => {
        expect(body.rows).toBeSortedBy("title", { descending: true });
      });
  });
  test("orders by decsending and created at by default", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeSortedBy("created_at", { descending: true });
      });
  });
  test("returns a 400 bad request when sent invalid queries in", () => {
    return request(app)
      .get("/api/articles?sort_by=invalidQuery")
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("bad request");
      });
  });
});

describe("GET /api/articles?topics=topcis", () => {
  test("should return the articles that match the certain topic", () => {
    return request(app)
      .get("/api/articles?topics=mitch")
      .expect(200)
      .then(({ body }) => {
        console.log(body.rows);
        body.rows.forEach((article) => {
          expect(article).toMatchObject({
            article_id: expect.any(Number),
            topic: "mitch",
            title: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            created_at: expect.any(String),
            article_img_url: expect.any(String),
          });
        });
      });
  });
  test.skip("404: returns a not found when passed an invalid topic", () => {
    return request(app)
      .get("/api/articles?topics=invalid-topic")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });
});

describe("GET /api/articles/:article_id adding comment count", () => {
  test.skip("200: returns 11 when passed an id of 1", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        console.log(body.response);
        expect(body.response[0].comment_count).toBe(11);
      });
  });
  test("404: returns not found when passed an article id that doesnt exist", () => {
    return request(app)
      .get("/api/articles/300")
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("not found");
      });
  });
});

// describe("POST /api/articles/:article_id", () => {
//   test("201: returns the increased votes", () => {
//     const send = {
//       votes: 1,
//     };
//     return request(app)
//     .post("/api/articles/1")
//     .expect(20)
//   });
// });
