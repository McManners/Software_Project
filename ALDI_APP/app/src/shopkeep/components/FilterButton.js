import React from 'react';
import { HiFilter } from 'react-icons/hi';
import { IconContext } from 'react-icons/lib';
import './filterbutton.css';

const FilterButton = ({handleClick}) => {
    return (
        <button className='Filter_Button' onClick={handleClick}>
            <IconContext.Provider value={{ style: { verticalAlign: 'middle'}, size: '1.2em' }}>
                <HiFilter className='Filter_Icon' />
            </IconContext.Provider>
            <div>Filter</div>
        </button>
    )
}

export default FilterButton;