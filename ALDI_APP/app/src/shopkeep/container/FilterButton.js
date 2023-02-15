import React from 'react';
import { HiFilter } from 'react-icons/hi';
import { IconContext } from 'react-icons/lib';
import './filterbutton.css';

const FilterButton = () => {
    return (
        <button className='Filter_Button'>
            <IconContext.Provider value={{ style: { verticalAlign: 'middle'}, size: '1.2em' }}>
                <HiFilter className='Filter_Icon' />
            </IconContext.Provider>
            <div>Filter</div>
        </button>
    )
}

export default FilterButton;