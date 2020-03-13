import React, { useState } from 'react';

const Input = props => {
    const [rejections, setRejections] = useState(0);
    const [name, setName] = useState('');
    const [buttonState, setButtonState] = useState('inactive');

    const handleChange = e => {
        if (e.name === 'name') {
            setName(e.value);
            e.value !== ''
                ? setButtonState('update')
                : setButtonState('inactive');
        }
        for (let el in props.leaderboard) {
            const name = props.leaderboard[el].fields.Name;
            if (name === e.value) {
                const currentNumber = props.leaderboard[el].fields.Rejections;

                return setRejections(currentNumber);
            }
        }

        if (e.name === 'number') {
            return setRejections(Number(e.value));
        }
        if (e.innerText === '+') {
            return setRejections(rejections + 1);
        } else if (e.innerText === '-') {
            return setRejections(rejections - 1);
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
                    <button onClick={e => handleChange(e.target)}>-</button>
                    <input
                        type='text'
                        value={rejections}
                        name='number'
                        onChange={e => handleChange(e.target)}
                    />
                    <button onClick={e => handleChange(e.target)}>+</button>
                </div>
            </div>
            <button
                className={`input-button ${buttonState}`}
                onClick={e => handleClick(e.target)}
            >
                Update
            </button>
        </div>
    );
};

export default Input;
