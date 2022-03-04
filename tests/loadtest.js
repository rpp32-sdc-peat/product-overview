import http from 'k6/http';
import { sleep, check } from 'k6';

// vus: 1, 10, 100, 200

export const options = {
  vus: 100,
  duration: '60s',
  // stages: [
  //   { duration: '30s', target: 20 },
  //   { duration: '1m30s', target: 10 },
  //   { duration: '20s', target: 0 },
  // ],
}

export default function () {
  let res = http.get('http://localhost:8080/products');
  check(res, {
    'GET /products is status 200': r => r.status === 200,
    'GET /products data contains 5 entries as default': r => {
      var data = JSON.parse(r.body);
      return data.length === 5;
    },
    'GET /products data has all necessary keys for Products': r => {
      var data = JSON.parse(r.body);
      var dataKeys = Object.keys(data[0]);
      var expectedKeys = ['_id','id','name','slogan','description','category','default_price','features','__v'];
      var isEqual = false;

      for (var i = 0; i < dataKeys.length; i++) {
        if (dataKeys[i] === expectedKeys[i]) {
          isEqual = true;
        } else {
          isEqual = false;
        }
      }

      if (dataKeys.length === expectedKeys.length) {
        isEqual = true;
      } else {
        isEqual = false;
      }

      return isEqual;
    }
  });

  sleep(1);

  for (var i = 500; i < 600; i++) {
    check(http.get(`http://localhost:8080/products/${i}`), {
      'GET /products/:productId is status 200': r => r.status === 200,
      'GET /products/:productId data has all necessary keys for the product': r => {
        var data = JSON.parse(r.body);
        var dataKeys = Object.keys(data);
        var expectedKeys = ['_id','id','name','slogan','description','category','default_price','features','__v'];
        var isEqual = false;

        for (var i = 0; i < dataKeys.length; i++) {
          if (dataKeys[i] === expectedKeys[i]) {
            isEqual = true;
          } else {
            isEqual = false;
          }
        }

        if (dataKeys.length === expectedKeys.length) {
          isEqual = true;
        } else {
          isEqual = false;
        }

        return isEqual;
      }
    })
  }

  sleep(1);

  for (var i = 700; i < 800; i++) {
    check(http.get(`http://localhost:8080/products/${i}/styles`), {
      'GET /products/:productId/styles is status 200': r => r.status === 200,
      'GET /products/:productId/styles data has all necessary keys for the product': r => {
        var data = r.body;
        if (data) {
          var dataKeys = Object.keys(JSON.parse(data));
          var expectedKeys = ['product_id', 'results'];
          var isEqual = false;
          console.log(Object.keys(JSON.parse(data).results[0]));

          for (var j = 0; j < dataKeys.length; j++) {
            if (dataKeys[j] === expectedKeys[j]) {
              isEqual = true;
            } else {
              isEqual = false;
            }
          }

          if (dataKeys.length === expectedKeys.length && r.status === 200) {
            isEqual = true;
          } else {
            isEqual = false;
          }

          var dataResultsKeys = Object.keys(JSON.parse(data).results[0]);
          var expectedResultsKeys = ['style_id', 'name', 'sale_price', 'original_price', 'default?', 'photos', 'skus', '_id'];

          for (var k = 0; k < dataResultsKeys.length; k++) {
            if (dataResultsKeys[k] === expectedResultsKeys[k]) {
              isEqual = true;
            } else {
              isEqual = false;
            }
          }

          return isEqual;
        } else {
          if (r.status === 200) {
            return true;
          } else {
            return false;
          }
        }


      }
    })
  }
}