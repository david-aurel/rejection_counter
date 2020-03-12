const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const secrets = require('./secrets');

// Airtable
const Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: secrets.AIRTABLE_API_KEY
});
const base = Airtable.base('appnyr5eqMsqFclKj');

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express-backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});
