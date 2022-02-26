const request = require('supertest');
const app = require('../server/index.js');

describe("Product Overview", () => {
  test("GET /products", (done) => {
    request(app)
      .get('/products')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .expect((res) => {
        res.body.length === 5;
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          return done();
        }
      })
  })

  test("GET /products with a count query of 20", (done) => {
    request(app)
      .get('/products')
      .query({
        count: 20
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .expect((res) => {
        res.body[0].id === 1;
        res.body.length === 20;
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          return done();
        }
      })
  })

  test("GET /products with a page query of 2", (done) => {
    request(app)
      .get('/products')
      .query({
        count: 20
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .expect((res) => {
        res.body[0].id === 6;
        res.body.length === 5;
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          return done();
        }
      })
  })

  test("GET /products with page and count queries as undefined", (done) => {
    request(app)
      .get('/products')
      .query({
        page: undefined,
        count: undefined
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .expect((res) => {
        res.body[0].id === 1;
        res.body.length === 5;
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          return done();
        }
      })
  })

  test("GET /products with page and count queries as null", (done) => {
    request(app)
      .get('/products')
      .query({
        page: null,
        count: null
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .expect((res) => {
        res.body[0].id === 1;
        res.body.length === 5;
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          return done();
        }
      })
  })

  test("GET /products/:productId", (done) => {
    request(app)
      .get('/products/1')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .expect((res) => {
        res.body.id === 1;
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          return done();
        }
      })
  })

  test("GET /products/:productId/styles", (done) => {
    request(app)
      .get('/products/1/styles')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .expect((res) => {
        res.product_id === 1;
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          return done();
        }
      })
  })

  test("GET /products/:productId/related", (done) => {
    request(app)
      .get('/products/1/related')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .expect((res) => {
        res.body === [2, 3, 8, 7];
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

