const functions = require('firebase-functions');
const env = functions.config();

const express = require('express');
const app = express();

// airtable
const Airtable = require('airtable');
const base = new Airtable({ apiKey: env.airtable.key }).base(
    'appnyr5eqMsqFclKj'
);

app.get('/api/getData', (req, res) => {
    console.log('/getData hit');
    let response = [];
    try {
        (async () => {
            await base('Table 1')
                .select({
                    view: 'Grid view',
                    sort: [{ field: 'Rejections', direction: 'desc' }]
                })
                .eachPage((records, fetchNextPage) => {
                    records.map(el => {
                        return response.push(el);
                    });
                    fetchNextPage();
                });

            res.send(response);
        })();
    } catch (error) {
        res.status(500).send({ error: 'error in /getData' });
        console.log('err in /getData:', error);
    }
});

app.post('/api/createRecord', (req, res) => {
    console.log('/createRecord hit');
    try {
        base('Table 1').create([req.body]);
    } catch (error) {
        res.status(500).send({ error: 'error in /createRecord' });
        console.log('err in /createRecord:', error);
    }
});

app.post('/api/updateRecord', (req, res) => {
    console.log('/updateRecord hit');
    const name = req.body.fields.Name;
    const rejections = req.body.fields.Rejections;
    try {
        base('Table 1')
            .select({
                filterByFormula: `{Name} = "${name}"`,
                maxRecords: 1
            })
            .eachPage((records, fetchNextPage) => {
                records.forEach(function(record) {
                    base('Table 1').replace([
                        {
                            id: record.id,
                            fields: {
                                Name: name,
                                Rejections: rejections
                            }
                        }
                    ]);
                });
                fetchNextPage();
            });
    } catch (error) {
        res.status(500).send({ error: 'error in /updateRecord' });
        console.log('err in /updateRecord:', error);
    }
});

app.post('/api/destroyRecord', (req, res) => {
    console.log('/destroyRecord hit');
    try {
        base('Table 1')
            .select({
                filterByFormula: `{Name} = "${req.body.name}"`
            })
            .eachPage((records, fetchNextPage) => {
                records.forEach(function(record) {
                    base('Table 1').destroy([record.id]);
                });
            });
    } catch (error) {
        res.status(500).send({ error: 'error in /destroyRecord' });
        console.log('err in /destroyRecord:', error);
    }
});
app.get('/api/message', (req, res) => {
    res.send({ message: 'Hello world!' });
});
exports.app = functions.https.onRequest(app);
