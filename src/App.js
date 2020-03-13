import React, { useState, useEffect } from 'react';
import Leaderboard from './leaderboard';
import Input from './input';
import Error from './error';
import './App.css';
import axios from 'axios';

// Airtable

const App = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('/api/getData');
                setLeaderboard(data);
            } catch (error) {
                setError(true);
            }
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
            axios.post('/api/createRecord', newRecord).catch(err => {
                console.log(err);
                setError(true);
            });
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
            axios.post('/api/updateRecord', newRecord).catch(err => {
                console.log(err);
                setError(true);
            });
        }
    };

    const destroy = name => {
        // update state
        const updatedObj = [...leaderboard].filter(
            obj => obj.fields.Name !== name
        );
        setLeaderboard(updatedObj);

        // destroy airtable record

        axios.post('/api/destroyRecord', { name: name }).catch(err => {
            console.log(err);
            setError(true);
        });
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
                {error ? (
                    <Error />
                ) : (
                    <div className='leaderboard'>
                        {leaderboard.map((entry, idx) => (
                            <Leaderboard {...entry.fields} key={idx} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default App;
