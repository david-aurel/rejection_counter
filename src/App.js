import React, { useState, useEffect } from 'react';
import Leaderboard from './leaderboard';
import Input from './input';
import './App.css';
import axios from 'axios';

// Airtable

const App = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        (async () => {
            const { data } = await axios.get('/api/getData');
            setLeaderboard(data);
            console.log(data);
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
                axios.post('/api/createRecord', newRecord);
            } catch (error) {
                setError(true);
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
                axios.post('/api/updateRecord', newRecord);
            } catch (error) {
                setError(true);
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
        try {
            axios.post('/api/destroyRecord', { name: name });
        } catch (error) {
            setError(true);
        }
    };

    return (
        <div className='App'>
            <header className='App-header'>
                <h1>Rejection Leaderboard</h1>
                <h4>Celebrate the hustle. Keep going.</h4>
            </header>
            <main>
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
