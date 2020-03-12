import React, { useState } from 'react';

const Input = props => {
    const [rejections, setRejections] = useState(0);
    const [name, setName] = useState('');
    const [method, setMethod] = useState('');

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
            for (let el in props.leaderboard) {
                const oldName = props.leaderboard[el].fields.Name;
                console.log('oldname', oldName, 'newName', name);

                console.log('mathc?', oldName === name);

                if (oldName === name) {
                    method = 'update';
                    break;
                } else {
                    method = 'new';
                }
            }
            console.log(name, rejections, method);

            props.update(name, rejections, method);
        }

        if (e.innerText === 'Delete') {
            props.destroy(name);
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
            <button onClick={e => handleClick(e.target)}>Delete</button>
        </div>
    );
};

export default Input;
