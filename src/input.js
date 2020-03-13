import React, { useState } from 'react';

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
    const handleClick = e => {
        if (e.innerText === 'Update') {
            let method = '';
            if (name === '') {
                return;
            } else if (rejections === 0) {
                method = 'destroy';
            } else {
                for (let el in props.leaderboard) {
                    const oldName = props.leaderboard[el].fields.Name;
                    if (oldName === name) {
                        method = 'update';
                        break;
                    } else {
                        method = 'new';
                    }
                }
            }

            props.update(name, rejections, method);
        }
    };
    const increment = () => {
        setRejections(rejections + 1);
    };
    const decrement = () => {
        setRejections(rejections - 1);
    };
    return (
        <div className='input'>
            <div className='input-fields'>
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
            </div>
            <button
                className='update-button'
                onClick={e => handleClick(e.target)}
            >
                Update
            </button>
        </div>
    );
};

export default Input;
