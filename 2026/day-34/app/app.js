const express = require('express');
const { Client } = require('pg');
const { createClient } = require('redis');

const app = express();
const port = 5000;

const redisClient = createClient({ url: 'redis://cache:6379' });
redisClient.connect();

app.get('/', async (req, res) => {
    // 1. COMPLEX CACHING: Try to get data from Redis first
    const cachedData = await redisClient.get('db_version_cache');
    
    let dbStatus;
    if (cachedData) {
        dbStatus = `Connected (Fetched from Cache): ${cachedData}`;
    } else {
        // 2. FETCH FROM DB if not in Redis
        const pgClient = new Client({
            host: 'db',
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB
        });
        
        await pgClient.connect();
        const dbRes = await pgClient.query('SELECT version();');
        dbStatus = dbRes.rows[0].version;
        
        // 3. STORE IN REDIS: Set to expire in 30 seconds
        await redisClient.setEx('db_version_cache', 30, dbStatus);
        dbStatus = `Connected (Fetched from DB): ${dbStatus}`;
        await pgClient.end();
    }

    res.send(`<h1>Complex Redis App</h1><p><b>DB Status:</b> ${dbStatus}</p>`);
});

app.listen(port, () => console.log(`Server running on port ${port}`));