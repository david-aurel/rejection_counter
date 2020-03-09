import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Leaderboard from './leaderboard';
import axios from 'axios';

const App = () => {
    const [dataState, setDataState] = useState({});

    async function fetchData() {
        const { data } = await axios.get('/express-backend');
        setDataState(data);
        console.log(dataState);
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='App'>
            <header className='App-header'>
                <h1>Rejection Leaderboard</h1>
                <h4>
                    Who's got the most job offer rejections? A place to
                    celebrate the hustle encouragement to keep going
                </h4>
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
