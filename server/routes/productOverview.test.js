const request = require('supertest');
const app = require('../index.js');

describe("Product Overview", () => {
  test("GET /products", (done) => {
    request(app)
      .get('/products')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(200)
      .expect((res) => {
        res.text = 'PRODUCT OVERVIEW: GET';
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          return done();
        }
      })
  })
})

