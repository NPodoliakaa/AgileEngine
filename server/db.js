require('dotenv').config();
const { Client } = require('pg');

const client = new Client();

client
    .connect()
    .then(() => console.log('Connected'))
    .catch(err => console.error(err.stack));

client
    .query(
        `CREATE TABLE IF NOT EXISTS message(
                id UUID PRIMARY KEY, 
                recipients TEXT[], 
                subject TEXT, 
                body TEXT, 
                is_sent BOOLEAN)`)
    .then(() => console.log('Table created'))
    .catch(err => console.error(err.stack));

module.exports = client;
