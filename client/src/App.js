import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Leaderboard from './leaderboard';
import axios from 'axios';
import secrets from './secrets';
const apiKey = secrets.AIRTABLE_API_KEY;

const App = () => {
    const [dataState, setDataState] = useState('initial');

    async function fetchData() {
        const { data } = await axios.get(
            'https://api.airtable.com/v0/appnyr5eqMsqFclKj/Table%201?api_key=' +
                apiKey
        );
        setDataState(data);
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='App'>
            <header className='App-header'>
                <h1>Rejection Leaderboard</h1>
                <h4>
                    A place to celebrate the hustle and encourage to keep going.
                </h4>
                <p>{dataState.express}</p>
            </header>
        </div>
    );
};

export default App;

// Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
const callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
        throw Error(body.message);
    }
    return body;
};
