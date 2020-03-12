import React from 'react';

const Leaderboard = props => {
    return (
        <div className='leaderboard-card'>
            <p>{props.Name}</p>
            <p>{props.Rejections}</p>
        </div>
    );
};

export default Leaderboard;
