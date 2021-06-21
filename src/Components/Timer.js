// Author:Sreeevidya

// This component is used as a timer (Stopwatch)

import React from 'react';
import { useTime } from 'react-timer-hook';

function Timer() {
    const {
        seconds,
        minutes,
        hours,
      } = useTime({ format: '24-hour'});
    
    return (
        <div>
            {hours < 10 ? '0'+ hours : hours}:{minutes < 10 ? '0'+ minutes : minutes}:{seconds < 10 ? '0'+ seconds : seconds}
        </div>
    );
}

export default Timer;
