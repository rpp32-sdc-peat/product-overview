import http from 'k6/http';
import { sleep, check } from 'k6';

export default function () {
  let res = http.get('http://localhost:8080/products');
  check(res, {
    'is status 200': (r) => r.status === 200,
    'data contains 5 entries as default': (r) => {
      var data = JSON.parse(r.body);
      return data.length === 5;
    },
    'data has all necessary keys for Products': (r) => {
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


}