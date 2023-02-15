import React from 'react';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import './sortbutton.css';

const SortButton = ({ sortType, setSortType, value }) => {
    console.log(sortType['Value']);
    console.log(value);
    if (sortType['Type'] === 'None' || sortType['Value'] !== value) {
        return (
            <button type='button' className='SortButton' onClick={() => setSortType({ 'Value': value, 'Type': 'Ascending'})}>
                <TiArrowSortedUp style={{color: 'rgb(204, 204, 204)'}} size='0.75em' className='SortButton_Arrow_Up'/>
                <TiArrowSortedDown style={{color: 'rgb(204, 204, 204)'}} size='0.75em' className='SortButton_Arrow_Down'/>
            </button>
        )
    } else if (sortType['Type'] === 'Ascending') {
        return (
            <button type='button' className='SortButton' onClick={() => setSortType(prev => ({ ...prev, 'Type': 'Descending'}))}>
                <TiArrowSortedUp style={{color: 'dimgray'}} size='0.75em' className='SortButton_Arrow_Up'/>
                <TiArrowSortedDown style={{color: 'rgb(204, 204, 204)'}} size='0.75em' className='SortButton_Arrow_Down'/>
            </button>
        )
    } else if (sortType['Type'] === 'Descending') {
        return (
            <button type='button' className='SortButton' onClick={() => setSortType({ 'Value': '', 'Type': 'None'})}>
                <TiArrowSortedUp style={{color: 'rgb(204, 204, 204)'}} size='0.75em' className='SortButton_Arrow_Up'/>
                <TiArrowSortedDown style={{color: 'dimgray'}} size='0.75em' className='SortButton_Arrow_Down'/>
            </button>
        )
    } else {
        return (
            <div></div>
        )
    }
}

export default SortButton;