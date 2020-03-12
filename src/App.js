import React, { useState, useEffect } from 'react';
import Leaderboard from './leaderboard';
import Input from './input';
import './App.css';
import axios from 'axios';
import secrets from './secrets';
const apiKey = secrets.AIRTABLE_API_KEY;

const App = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const sort = () => {
        setLeaderboard(
            [...leaderboard].sort(
                (a, b) => b.fields.Rejections - a.fields.Rejections
            )
        );
    };

    async function fetchData() {
        const { data } = await axios.get(
            'https://api.airtable.com/v0/appnyr5eqMsqFclKj/Table%201?api_key=' +
                apiKey +
                '&sort%5B0%5D%5Bfield%5D=Rejections&sort%5B0%5D%5Bdirection%5D=desc'
        );

        setLeaderboard(data.records);
    }
    useEffect(() => {
        fetchData();
    }, []);

    const update = async () => {
        const newRecord = {
            fields: {
                Name: 'Test1',
                Rejections: 123
            }
        };
        await axios.post(
            'https://api.airtable.com/v0/appnyr5eqMsqFclKj/Table%201?api_key=' +
                apiKey,
            { records: [newRecord] }
        );
        fetchData();
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
