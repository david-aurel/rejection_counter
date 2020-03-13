const functions = require('firebase-functions');
const express = require('express');
const app = express();

// airtable
const Airtable = require('airtable');
const env = functions.config();
// const base = new Airtable({ apiKey: env.airtable.key }).base(
//     'appnyr5eqMsqFclKj'
// );

app.get('/', (req, res) => {
    res.set('Cache-Control', 'public, max-age=60*60*24, s-maxage=60*60*24');
    res.sendFile('/../public/index.html');
});

app.get('/getData', (req, res) => {
    console.log('/getData hit');
    try {
    } catch (error) {
        console.log('err in /getData:', error);
    }
});

app.post('/createRecord', (req, res) => {
    console.log('/createRecord hit');
    try {
    } catch (error) {
        console.log('err in /createRecord:', error);
    }
});

app.post('/updateRecord', (req, res) => {
    console.log('/updateRecord hit');
    try {
    } catch (error) {
        console.log('err in /updateRecord:', error);
    }
});

app.post('/destroyRecord', (req, res) => {
    console.log('/destroyRecord hit');
    try {
    } catch (error) {
        console.log('err in /destroyRecord:', error);
    }
});


// fetch data
// const fetchData = () => {
//     base('Table 1')
//         .select({
//             view: 'Grid view',
//             sort: [{ field: 'Rejections', direction: 'desc' }]
//         })
//         .eachPage((records, fetchNextPage) => {
//             setLeaderboard(records);
//             fetchNextPage();
//         });
// };

// // create record
// base('Table 1').create([newRecord]);

// // update record
// const updateAirTable = (name, rejections) => {
//     base('Table 1')
//         .select({
//             filterByFormula: `{Name} = "${name}"`,
//             maxRecords: 1
//         })
//         .eachPage((records, fetchNextPage) => {
//             records.forEach(function(record) {
//                 base('Table 1').update([
//                     {
//                         id: record.id,
//                         fields: {
//                             Name: name,
//                             Rejections: rejections
//                         }
//                     }
//                 ]);
//             });

//             fetchNextPage();
//         });
// };

// // destroy record
// const destroyAirTableRecord = name => {
//     base('Table 1')
//         .select({
//             filterByFormula: `{Name} = "${name}"`
//         })
//         .eachPage((records, fetchNextPage) => {
//             records.forEach(function(record) {
//                 base('Table 1').destroy([record.id]);
//             });
//         });
// };
app.get('/api/message', (req, res) => {
    res.send({ message: 'Hello world!' });
});

exports.app = functions.https.onRequest(app);
