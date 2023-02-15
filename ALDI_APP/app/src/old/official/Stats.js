import React from 'react';
import './stats.css';
import ProgressRingUse from './ProgressRingUse';
import ProgressRing from './ProgressRing';

const Stats = () => {

    return (
        <div id='app'>
            <div id='stats-container'>
                <div className='stats-sick-container'>
                    <ProgressRingUse />
                </div>
                <div className='stats-personal-container'>
                    <ProgressRing
                        radius={ 100 }
                        stroke={ 25 }
                        progress={ 20 }
                    />
                    <div id='test'>
                    

                    </div>
                </div>
                <div className='stats-vacation-container'>
                    
                </div>
            </div>
        </div>
    )
}

export default Stats;