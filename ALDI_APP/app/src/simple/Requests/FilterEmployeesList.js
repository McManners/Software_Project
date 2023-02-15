import React, { useState, useRef } from 'react';
import { BiSelectMultiple, BiReset } from 'react-icons/bi';
import { BsCaretDownFill } from 'react-icons/bs';
import { IconContext } from 'react-icons/lib';
import { RxMagnifyingGlass } from 'react-icons/rx';
import FilterEmployeesList from './FilterEmployeesList';

const ManagerFilterTab = ({ leaderEmployees, handleChangeNew }) => {
    const managerFilterAdditionalRef = useRef();
    const managerFilterColumnRef = useRef();
    const managerFilterEmployeesRef = useRef();

    const [filterColumnOpen, setFilterColumnOpen] = useState(false);
    const [filterAdditionalOpen, setFilterAdditionalOpen] = useState(false);
    const [filterEmployeesOpen, setFilterEmployeesOpen] = useState(false);

    const handleFilterColumnClick = event => {
        event.preventDefault();
        managerFilterAdditionalRef.current.style.height = 0;
        managerFilterEmployeesRef.current.style.height = 0;
        if (managerFilterColumnRef.current.style.height !== '100%')
            managerFilterColumnRef.current.style.height = '100%';
        else
            managerFilterColumnRef.current.style.height = '0';
    }

    const handleFilterAdditionalClick = event => {
        event.preventDefault();
        managerFilterColumnRef.current.style.height = 0;
        managerFilterEmployeesRef.current.style.height = 0;
        if (managerFilterAdditionalRef.current.style.height !== '100%')
            managerFilterAdditionalRef.current.style.height = '100%';
        else
            managerFilterAdditionalRef.current.style.height = '0';
    }

    const handleFilterEmployeeClick = event => {
        event.preventDefault();
        managerFilterAdditionalRef.current.style.height = 0;
        managerFilterColumnRef.current.style.height = 0;
        if (managerFilterEmployeesRef.current.style.height !== '100%') {
            managerFilterEmployeesRef.current.style.height = '100%';
            console.log('opened');
            // setFilterColumnOpen(true);
        } else {
            managerFilterEmployeesRef.current.style.height = '0';
            console.log('closed');
        }
        
    }
    const handleChange = (checked, index) => {
        let tmp = leaderEmployees[index];
        tmp.done = !checked;
        let leaderEmployeesClone = [...leaderEmployees];
        leaderEmployeesClone[index] = tmp;
        // setEmployeesToFilter([...leaderEmployeesClone]);
    };
    console.log('rendering');
    return (
        <div className='manager-filter-tab'>
                    <IconContext.Provider value={{ style: { verticalAlign: 'middle'}, size: '0.75em' }}>
                        <div className='manager-filter-tab-button' onClick={handleFilterColumnClick}>
                            <span>Show/Hide Columns</span>
                            <BsCaretDownFill className='manager-header-dropdown-icon' />
                        </div>
                        <div id='manager-filter-tab-additional-filters-content' ref={managerFilterColumnRef} className='manager-filter-content'>
                            <input type='checkbox' value='ticket_id' />
                            <label htmlFor='manager-filter-ticket-id'>Ticket ID</label><br />
                            <input type='checkbox' value='employee_id' />
                            <label htmlFor='manager-filter-employee-id'>Employee ID</label><br />
                            <input type='checkbox' id='manager-filter-employee-id' value='employee_name' />
                            <label htmlFor='manager-filter-employee-name'>Employee name</label><br />
                            <input type='checkbox' id='manager-filter-employee-name' value='pto_type' />
                            <label htmlFor='manager-filter-pto-type'>PTO type</label><br />
                            <input type='checkbox' id='manager-filter-pto-type' value='submit_date' />
                            <label htmlFor='manager-filter-submit-date'>Submit date</label><br />
                            <input type='checkbox' value='time_remaining' />
                            <label htmlFor='manager-filter-time-remaining'>Time remaining</label><br />
                        </div>
                        <div className='manager-filter-tab-button' onClick={handleFilterAdditionalClick}>
                            <span>Additional filters</span>
                            <BsCaretDownFill className='manager-header-dropdown-icon' />
                        </div>
                        <div id='manager-filter-tab-additional-filters-content' className='manager-filter-content' ref={managerFilterAdditionalRef}></div>
                        <div className='manager-filter-tab-button' onClick={handleFilterEmployeeClick}>
                            <span>Employees</span>
                            <BsCaretDownFill className='manager-header-dropdown-icon' />
                        </div>
                        <div id='manager-filter-tab-additional-filters-content' className='manager-filter-content' ref={managerFilterEmployeesRef}>
                            {console.log(filterColumnOpen)}
                            <IconContext.Provider value={{ style: { verticalAlign: 'middle'}, size: '1em' }}>
                                <div className='manager-filter-select-buttons'>
                                    <button type='button' style={{borderRight: '1px solid rgb(213, 215, 219)'}}>
                                        <BiSelectMultiple /> Select all
                                    </button>
                                    <button type='button'>Clear all</button>
                                </div>
                            </IconContext.Provider>
                            <div style={{position: 'relative'}}>
                                <IconContext.Provider value={{ style: { verticalAlign: 'middle'}, size: '1.2em' }}>
                                    <RxMagnifyingGlass className='manager-filter-employee-search-icon' />
                                </IconContext.Provider>
                                <input type='text' className='manager-filter-employee-search' placeholder='Search...' />
                            </div>
                            {/* <GetEmployees /> */}
                            {/* <FilterEmployeesList leaderEmployees={leaderEmployees} handleChange={handleChange} /> */}
                            {leaderEmployees.map(({ employee_id, first_name, last_name }) => {
                                return (
                                    <div key={'filterEmployeeID_' + employee_id}>
                                        <label htmlFor={'manager-filter-name_' + employee_id}>
                                            <input
                                                type="checkbox"
                                                onChange={() => handleChangeNew(employee_id)}
                                                id={'manager-filter-name_' + employee_id}
                                            />
                                            <span>{first_name + ' ' + last_name}</span>
                                        </label>
                                    </div>
                                )})}
                        </div>
                    </IconContext.Provider>
        </div>
    )
}

export default React.memo(ManagerFilterTab);