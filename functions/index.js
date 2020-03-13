const functions = require('firebase-functions');
const express = require('express');
const app = express();

app.get('/api/message', (req, res) => {
    res.send({ message: 'Hello world!' });
});

exports.app = functions.https.onRequest(app);
