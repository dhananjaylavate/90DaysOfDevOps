const express = require('express');
const { Client } = require('pg');
const { createClient } = require('redis');

const app = express();
const port = 5000;

// Configure Redis Client
const redisClient = createClient({
    url: 'redis://cache:6379'
});
redisClient.on('error', err => console.error('Redis Client Error', err));

// Configure PostgreSQL Client Configuration
const dbConfig = {
    host: 'db',
    port: 5432,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
};

app.get('/', async (req, res) => {
    let visits = 0;
    let dbStatus = "Failed";

    // 1. Handle Redis hit counter
    try {
        if (!redisClient.isOpen) {
            await redisClient.connect();
        }
        visits = await redisClient.incr('hits');
    } catch (err) {
        console.error('Redis increment failed:', err);
    }

    // 2. Handle PostgreSQL Connection Check
    const pgClient = new Client(dbConfig);
    try {
        await pgClient.connect();
        const dbRes = await pgClient.query('SELECT version();');
        dbStatus = `Connected to ${dbRes.rows[0].version}`;
    } catch (err) {
        dbStatus = `Database error: ${err.message}`;
    } finally {
        await pgClient.end().catch(() => {});
    }

    // 3. Return response string
    res.send(`
        <h1>Hello Dhananjay!</h1>
        <p>This page has been viewed <strong>${visits}</strong> times.</p>
        <p><strong>DB Status:</strong> ${dbStatus}</p>
    `);
});

app.listen(port, () => {
    console.log(`Node app listening at http://localhost:${port}`);
});