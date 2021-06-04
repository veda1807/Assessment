// Author:Sreeevidya

// This component is used as a timer (Stopwatch)

import React from 'react';
import { useStopwatch } from 'react-timer-hook';

function Timer(props) {
    const {seconds, minutes, hours, pause} = useStopwatch({ autoStart: true });

    function getTimer(){
        return [hours, minutes, seconds];
    }
    
    return (
        <div>
            {hours < 10 ? '0'+ hours : hours}:{minutes < 10 ? '0'+ minutes : minutes}:{seconds < 10 ? '0'+ seconds : seconds}
        </div>
    );
}

export default Timer;
