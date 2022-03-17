const redis = require('redis');

// Made another file that creates Redis connection and export that to use.

// Connect to Redis
// url -> redis://<HOST>:<PORT> `redis://3.209.152.176:6379`,

const redisClient = redis.createClient({
  url: 'redis://ec2-3-209-152-176.compute-1.amazonaws.com:6379',
  legacyMode: true,
  password: process.env.REDIS_PASSWORD
});

var main = () => redisClient.connect();

main();

redisClient.on('connect', () => console.log('Redis Client Connected!'));

redisClient.on('error', err => {
  console.log('Redis Connection Error: ' + err);
});

module.exports = redisClient;