const redis = require('redis');

// Made another file that creates Redis connection and export that to use.

// Connect to Redis
// url -> redis://<HOST>:<PORT> `redis://3.209.152.176:6379`,

const redisClient = redis.createClient({
  host: 'redis://3.209.152.176',
  port: '6379'
});

redisClient.auth(process.env.REDIS_PASSWORD, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Authorization Successful.');
  }
})

redisClient.on('error', err => {
  console.log('Redis Connection Error: ' + err);
})

export default redisClient;