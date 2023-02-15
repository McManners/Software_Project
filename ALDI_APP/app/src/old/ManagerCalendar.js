import React, { useState } from 'react';
import Calendar from '../simple/Requests/Calendar';
import './managercalendar.css';

const ManagerCalendar = () => {
    const [selectedMonth, setSelectedMonth] = useState(1);
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedYear, setSelectedYear] = useState(2022);
    return (
        <div className='main-test'>
            <div className='grid-month-test'>
                    <div className='grid-day-test'></div>
                    <div className='grid-day-test'></div>
                    <div className='grid-day-test'></div>
                    <div className='grid-day-test'></div>
                    <div className='grid-day-test'></div>
                    <div className='grid-day-test'></div>
                    <div className='grid-day-test'></div>

                    <div className='grid-day-test'></div>
                    <div className='grid-day-test'></div>
                    <div className='grid-day-test'></div>
                    <div className='grid-day-test'></div>
                    <div className='grid-day-test'></div>
                    <div className='grid-day-test'></div>
                    <div className='grid-day-test'></div>

                    <div className='grid-day-test'></div>
                    <div className='grid-day-test'></div>
                    <div className='grid-day-test'></div>
                    <div className='grid-day-test'></div>
                    <div className='grid-day-test'></div>
                    <div className='grid-day-test'></div>
                    <div className='grid-day-test'></div>

                    <div className='grid-day-test'></div>
                    <div className='grid-day-test'></div>
                    <div className='grid-day-test'></div>
                    <div className='grid-day-test'></div>
                    <div className='grid-day-test'></div>
                    <div className='grid-day-test'></div>
                    <div className='grid-day-test'></div>

                    <div className='grid-day-test empty'></div>
                    <div className='grid-day-test empty'></div>
                    <div className='grid-day-test empty'></div>
                    <div className='grid-day-test empty'></div>
                    <div className='grid-day-test empty'></div>
                    <div className='grid-day-test empty'></div>
                    <div className='grid-day-test empty'></div>

                    <div className='grid-day-test empty'></div>
                    <div className='grid-day-test empty'></div>
                    <div className='grid-day-test empty'></div>
                    <div className='grid-day-test empty'></div>
                    <div className='grid-day-test empty'></div>
                    <div className='grid-day-test empty'></div>
                    <div className='grid-day-test empty'></div>
            </div>
        </div>
    )
}

export default ManagerCalendar;