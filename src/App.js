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
            base('Table 1').create([newRecord]);
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
            updateAirTable(name, rejections);
        }
    };

    const destroy = name => {
        // update state
        const updatedObj = [...leaderboard].filter(
            obj => obj.fields.Name !== name
        );
        setLeaderboard(updatedObj);

        // destroy airtable record
        destroyAirTableRecord(name);
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

const updateAirTable = (name, rejections) => {
    base('Table 1')
        .select({
            filterByFormula: `{Name} = "${name}"`,
            maxRecords: 1
        })
        .eachPage((records, fetchNextPage) => {
            records.forEach(function(record) {
                base('Table 1').update([
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
};

const destroyAirTableRecord = name => {
    base('Table 1')
        .select({
            filterByFormula: `{Name} = "${name}"`
        })
        .eachPage((records, fetchNextPage) => {
            records.forEach(function(record) {
                base('Table 1').destroy([record.id]);
            });
        });
};
