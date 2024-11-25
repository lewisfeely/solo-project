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

describe.only("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});
describe.only("GET /api/topics", () => {
  test("200: responds with an array of all topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        console.log(body);
        topics.forEach((topic) => {
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
describe.only("GET /api/articles/:article_id", () => {
  test("200: responds with an array of articles", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        console.log(body);
        body.rows.forEach((articles) => {
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
});
