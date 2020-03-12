import React, { useState, useEffect } from 'react';

const Input = props => {
    const [rejections, setRejections] = useState(0);
    const [name, setName] = useState('');

    const handleChange = e => {
        if (e.name === 'name') {
            setName(e.value);
            for (let el in props.leaderboard) {
                const name = props.leaderboard[el].fields.Name;
                if (name === e.value) {
                    setRejections(props.leaderboard[el].fields.Rejections);
                }
            }
        }
        if (e.name === 'number') {
            setRejections(Number(e.value));
        }
    };
    const handleClick = () => {
        props.update();
    };
    const increment = () => {
        setRejections(rejections + 1);
    };
    const decrement = () => {
        setRejections(rejections - 1);
    };
    return (
        <div className='input'>
            <input
                type='text'
                placeholder='Your name'
                name='name'
                autoComplete='off'
                onChange={e => handleChange(e.target)}
            />
            <div className='counter'>
                <button onClick={() => decrement()}>-</button>
                <input
                    type='text'
                    value={rejections}
                    name='number'
                    onChange={e => handleChange(e.target)}
                />
                <button onClick={() => increment()}>+</button>
            </div>
            <button onClick={e => handleClick(e.target)}>Update</button>
        </div>
    );
};

export default Input;
