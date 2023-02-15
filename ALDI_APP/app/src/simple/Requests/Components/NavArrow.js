import React from 'react';
import { RiArrowLeftSFill, RiArrowRightSFill } from 'react-icons/ri';
import { IconContext } from 'react-icons/lib';
import './navarrow.css';

const NavArrow = ({ direction, setCurrentDateSelected, currentDateSelected }) => {
    // implement next month is unavailable
    const date = new Date();

    const handleMonthIncrement = event => {
        event.preventDefault();
        if ((date.getFullYear() === currentDateSelected.Year) && ((date.getMonth() + 1) === currentDateSelected.Month)) return;

        setCurrentDateSelected(prev => {
            let nextMonth = (prev.Month === 12) ? 1 : (prev.Month + 1);
            let nextYear = (prev.Month === 12) ? (prev.Year + 1) : prev.Year;
            return {
                Day: prev.Day,
                Month: nextMonth,
                Year: nextYear
            }
        })
    }
    const handleMonthDecrement = event => {
        event.preventDefault();
        setCurrentDateSelected(prev => {
            let prevMonth = (prev.Month === 1) ? 12 : (prev.Month - 1);
            let prevYear = (prev.Month === 1) ? (prev.Year - 1) : prev.Year;
            return {
                Day: prev.Day,
                Month: prevMonth,
                Year: prevYear
            }
        })
    }

    return (
        <div className='Arrow'>
            <IconContext.Provider value={{ className: 'NavArrow', size: '2em' }}>
                {
                    (direction === 'right') ? 
                        <RiArrowRightSFill onClick={handleMonthIncrement}/> 
                        : <RiArrowLeftSFill onClick={handleMonthDecrement} />
                }
            </IconContext.Provider>
        </div>
    )
}

export default NavArrow;