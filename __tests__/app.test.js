const endpointsJson = require("../endpoints.json");
const app = require("../db/app");
const db = require("../db/connection");
const data = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");
const request = require("supertest");

// beforeEach(() => {
//   return seed(data);
// });
// afterAll(() => {
//   return db.end();
// });

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    console.log(endpointsJson);
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        console.log(endpoints);
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});
// describe("GET /api/topics", () => {
//   test("200: responds with an array of all topics", () => {
//     return request(app)
//       .get("./api/topics")
//       .expect(200)
//       .then(({ body: { topics } }) => {
//         expect(topics).toEqual(endpointsJson);
//       });
//   });
// });
// describe("GET /api/articles", () => {
//   test("200: responds with an array of articles", () => {
//     return request(app)
//       .get("./api/articles")
//       .expect(200)
//       .then(({ body: { articles } }) => {
//         expect(articles).toEqual(endpointsJson);
//       });
//   });
// });
