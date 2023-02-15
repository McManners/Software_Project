import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { IconContext } from 'react-icons/lib';
import './questionicon.css';

const QuestionIcon = ({text}) => {

    return (
        // <div className='QuestionIcon'>
            <span className='QuestionIcon_Container'>
                <span className='QuestionIcon_Tooltip'>
                    You cannot edit an items cost directly, 
                        ensuring the average cost calculation is preserved. 
                        Update the calculation by receiving inventory with a new cost.
                        Learn more
                </span>
                <span className='QuestionIcon'>
                    <IconContext.Provider value={{ style: { verticalAlign: 'middle' },  color: '#75b691' }}>
                        <BsFillQuestionCircleFill onClick={() => console.log('question icon clicked')} />
                    </IconContext.Provider>
                </span>
            </span>
        // </div>
    )
}

export default QuestionIcon;