import React, { useState, useEffect } from 'react';
import Leaderboard from './leaderboard';
import './App.css';
import axios from 'axios';
import secrets from './secrets';
const apiKey = secrets.AIRTABLE_API_KEY;

const App = () => {
    const [leaderboard, setLeaderboard] = useState([]);

    async function fetchData() {
        const { data } = await axios.get(
            'https://api.airtable.com/v0/appnyr5eqMsqFclKj/Table%201?api_key=' +
                apiKey
        );

        setLeaderboard(data.records);
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='App'>
            <header>
                <h1>Rejection Leaderboard</h1>
                <h4>
                    A place to celebrate the hustle and encourage to keep going.
                </h4>
            </header>
            <main>
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
