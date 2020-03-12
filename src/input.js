import React, { useState } from 'react';

const Input = props => {
    const [rejections, setRejections] = useState(0);
    const [name, setName] = useState('');
    const [method, setMethod] = useState('');

    const handleChange = e => {
        if (e.name === 'name') {
            setMethod('post');
            setName(e.value);
            for (let el in props.leaderboard) {
                const name = props.leaderboard[el].fields.Name;
                if (name === e.value) {
                    setRejections(props.leaderboard[el].fields.Rejections);
                    setMethod('put');
                }
            }
        }
        if (e.name === 'number') {
            setRejections(Number(e.value));
        }
    };
    const handleClick = () => {
        props.update(name, rejections, method);
    };
    const increment = () => {
        setRejections(rejections + 1);
    };
    const decrement = () => {
        setRejections(rejections - 1);
    };
    return (
        <div className='input'>
            <p>{method}</p>
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
