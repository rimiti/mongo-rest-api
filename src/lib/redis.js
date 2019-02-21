import Redis from 'ioredis';

const redis = new Redis({host: process.env.API_REDIS_HOST, port: process.env.API_REDIS_PORT});

redis.on('error', (err) => console.error('Redis disconnected', err));

export default redis;
