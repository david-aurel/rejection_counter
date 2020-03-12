import React, { useState, useEffect } from 'react';
import Leaderboard from './leaderboard';
import Input from './input';
import './App.css';

// Airtable
import secrets from './secrets';
const Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: secrets.AIRTABLE_API_KEY
});
const base = Airtable.base('appnyr5eqMsqFclKj');

const App = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [test, setTest] = useState('');

    const fetchData = () => {
        base('Table 1')
            .select({
                view: 'Grid view',
                sort: [{ field: 'Rejections', direction: 'desc' }]
            })
            .eachPage((records, fetchNextPage) => {
                setLeaderboard(records);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const update = (name, rejections, method) => {
        const newRecord = {
            fields: {
                Name: name,
                Rejections: rejections
            }
        };
        base('Table 1').create([newRecord]);
        setLeaderboard(leaderboard =>
            [...leaderboard, newRecord].sort(
                (a, b) => b.fields.Rejections - a.fields.Rejections
            )
        );
    };

    return (
        <div className='App'>
            <header className='App-header'>
                <h1>Rejection Leaderboard</h1>
                <h4>
                    A place to celebrate the hustle and encourage to keep going
                </h4>
            </header>
            <main>
                <p>{test}</p>
                <Input leaderboard={leaderboard} update={update} />
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
