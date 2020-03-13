import React, { useState, useEffect } from 'react';
import Leaderboard from './leaderboard';
import Input from './input';
import './App.css';
import axios from 'axios';

// Airtable
const Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keygTL2ajsO6XkSRZ'
});
const base = Airtable.base('appnyr5eqMsqFclKj');

const App = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);

    const fetchData = () => {
        base('Table 1')
            .select({
                view: 'Grid view',
                sort: [{ field: 'Rejections', direction: 'desc' }]
            })
            .eachPage((records, fetchNextPage) => {
                setLeaderboard(records);
                fetchNextPage();
            });
    };

    useEffect(() => {
        fetchData();
        (async () => {
            const { data } = await axios.get('/api/message');
            console.log(data);

            setMessage(data);
        })();
    }, []);

    const update = (name, rejections, method) => {
        const newRecord = {
            fields: {
                Name: name,
                Rejections: rejections
            }
        };

        if (method === 'new') {
            // update state
            setLeaderboard(leaderboard =>
                [...leaderboard, newRecord].sort(
                    (a, b) => b.fields.Rejections - a.fields.Rejections
                )
            );

            // update airtable
            try {
                axios.post('/createRecord', newRecord);
            } catch (error) {
                setError(true);
                console.log(error);
            }
        } else if (method === 'update') {
            // update state
            const updatedObj = leaderboard.map(e => {
                if (e.fields.Name === name) {
                    e = {
                        ...e,
                        fields: { ...e.fields, Rejections: rejections }
                    };
                }
                return e;
            });
            setLeaderboard(
                updatedObj.sort(
                    (a, b) => b.fields.Rejections - a.fields.Rejections
                )
            );

            // update airtable
            try {
                axios.post('/updateRecord', {
                    name: name,
                    rejections: rejections
                });
            } catch (error) {
                setError(true);
                console.log(error);
            }
        }
    };

    const destroy = name => {
        // update state
        const updatedObj = [...leaderboard].filter(
            obj => obj.fields.Name !== name
        );
        setLeaderboard(updatedObj);

        // destroy airtable record
        axios.post('/deleteRecord', name);
    };

    return (
        <div className='App'>
            <header className='App-header'>
                <h1>Rejection Leaderboard</h1>
                <p>
                    How many rejections / unanswered applications have you got
                    so far?
                </p>
            </header>
            <main>
                <p>{message.message}</p>
                <Input
                    leaderboard={leaderboard}
                    update={update}
                    destroy={destroy}
                />
                <div className='leaderboard'>
                    {leaderboard.map((entry, idx) => (
                        <Leaderboard {...entry.fields} key={idx} />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default App;
