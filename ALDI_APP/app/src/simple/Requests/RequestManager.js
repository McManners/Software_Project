import React, { useState, useRef, useEffect, memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './requestmanager.css';
import Calendar from './Calendar';
import useAuth from '../useAuth';
import useAxiosPrivate from '../../simple/useAxiosPrivate';
import { HiFilter } from 'react-icons/hi';
import { BiSelectMultiple, BiReset } from 'react-icons/bi';
import { BsCaretDownFill } from 'react-icons/bs';
import { IconContext } from 'react-icons/lib';
import { RxMagnifyingGlass } from 'react-icons/rx';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';

// import ManagerFilterTab from './FilterEmployeesList';

const RequestManager = () => {
    const dayRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const { auth } = useAuth();
    const [responseNote, setResponseNote] = useState("");
    const date = new Date();
    const [tickets, setTickets] = useState(null);
    const [requestsState, setRequestsState] = useState(null);
    const [responseType, setResponseType] = useState(null);
    const [leaderEmployees, setLeaderEmployees] = useState([]);
    const axiosPrivate = useAxiosPrivate();

    const [employeesToFilter, setEmployeesToFilter] = useState([]);

    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(date.getMonth() === 0 ? 11 : date.getMonth());
    const [selectedYear, setSelectedYear] = useState(date.getFullYear());

    const managerFilterAdditionalRef = useRef();
    const managerFilterColumnRef = useRef();
    const managerFilterEmployeesRef = useRef();
    
    const [openDay, setOpenDay] = useState(null);

    const handleResponseNoteChange = event => {
        event.preventDefault();

        setResponseNote(event.target.value);
    }

    useEffect(() => {
        // https://github.com/gitdagray/react_persist_login/blob/main/src/components/Users.js
        let isMounted = true;
        const controller = new AbortController();

        const getTickets = async () => {
            // https://flaviocopes.com/axios-send-authorization-header
            try {
                const response = await axiosPrivate.get('ticket/get/leader', {
                    access_token: auth.access_token
                },
                {
                    headers: {
                        'Authorization': `Bearer ${auth.access_token}`
                    }
                });
                isMounted = true;
                setRequestsState(response.data.tickets);
                setTickets(response.data.tickets);
            } catch (err) {
                console.log(err);
                // logout();
                navigate('/login', { state: { from: location }, replace: true });
            }
        }
        getTickets();
        
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);
    useEffect(() => { // get leader's employees
        let isMounted = true;
        const controller = new AbortController();

        const getLeaderEmployees = async () => {
            // https://flaviocopes.com/axios-send-authorization-header
            try {
                const response = await axiosPrivate.get('/manager/getEmployees', {
                    access_token: auth.access_token
                },
                {
                    headers: {
                        'Authorization': `Bearer ${auth.access_token}`
                    }
                });
                isMounted = true;
                // console.log(response.data);
                let arr = response.data;
                arr.forEach(a => a['checked'] = false);
                setLeaderEmployees(arr);
            } catch (err) {
                console.log(err);
                // logout();
                navigate('/login', { state: { from: location }, replace: true });
            }
        }
        getLeaderEmployees();
        
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);
    const [pto, setPTO] = useState([{}]);
    useEffect(() => {
        // https://github.com/gitdagray/react_persist_login/blob/main/src/components/Users.js
        let isMounted = true;
        const controller = new AbortController();

        const getPTO = async () => {
            // https://flaviocopes.com/axios-send-authorization-header
            try {
                const response = await axiosPrivate.get('pto/getleader', {
                    access_token: auth.access_token
                },
                {
                    headers: {
                        'Authorization': `Bearer ${auth.access_token}`
                    }
                });
                isMounted = true;
                setPTO(response.data);
            } catch (err) {
                console.log(err);
                // logout();
                navigate('/login', { state: { from: location }, replace: true });
            }
        }
        getPTO();
        
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);

    const handleDayRefClick = () => {
        dayRef.current.style.width = (dayRef.current.style.width === '50%') ? '0' : '50%';
    }


    const sendResponseClick = async () => {
        const url = responseType === "APPROVE" ? '/pto/create' : responseType === "DENY" ? '/ticket/deny' : '/ticket/requestmore'
        if (openRequestID === {} || responseType === null);
        // https://flaviocopes.com/axios-send-authorization-header
        try {
            const response = await axiosPrivate.post(url, {
                access_token: auth.access_token,
                ticket_id: openRequestID.ticket_id,
                response_note: responseNote,
                invalid_dates: []
            },
            {
                headers: {
                    'Authorization': `Bearer ${auth.access_token}`
                }
            });
            setOpenRequestID({});
            console.log(response);
        } catch (err) {
            console.log(err);
            if (err.status === 403) navigate('/login', { state: { from: location }, replace: true });
        }
    }
 
    const renderSelectedDays = () => {
        let days = "";
        selectedDays.forEach(e => {
            days += (`${e.split("T", 1)[0]}, `);
        })
        return (
            <div>
                Select conflicting days: <div style={{color: 'red'}}>{days}</div>
            </div>
        )
    }

    const [openRequestID, setOpenRequestID] = useState({});

    const handleOpenRequestClick = (value) => {
        console.log(value)
        setResponseType(null);
        if (openRequestID === value)
            setOpenRequestID({})
        else
            setOpenRequestID(value);
    }
    const handleOpenRequestClose = () => {
        setOpenRequestID({});
        setResponseType(null);
        setSelectedDays([])
    }
    const getTimeRemaining = (d) => {
        const date = new Date();
        const dateCreated = new Date(d);
        const time_difference = date.getTime() - dateCreated.getTime();
        const result = Math.round(time_difference / (1000 * 60 * 60 * 24));
        return result;
    }
    const handleResponseTypeClick = event => {
        event.preventDefault();

        setResponseType(event.target.value);
    }

    const GetTable = () => {
        let rows = [];
        requestsState.forEach((e) => {
            if (e.status === "PENDING") {
                const t = getTimeRemaining(e.createdAt);
                rows.push(
                    <tr key={e.ticket_id} onClick={() => handleOpenRequestClick(e)} className='manager-request-table-row'>
                        <td>{e.ticket_id}</td>
                        <td>{e.employee_id}</td>
                        <td>{`${e.Employee.first_name} ${e.Employee.last_name}`}</td>
                        <td>{e.pto_type_id === 1 ? 'Vacation' : e.pto_type_id === 2 ? 'Personal' : 'Sick'}</td>
                        <td>{e.createdAt.split("T",1)[0]}</td>
                        <td>{!(t > 7) ? 
                                (`${t} days`) : 
                                    ((t % 7) === 0) ? 
                                        ((t / 7) > 1) ? 
                                            (`${t / 7} weeks`) : 
                                                (`${t / 7} week`) :
                                        (`${(t / 7).toFixed(0)} ${((t / 7).toFixed(0) > 1) ? 'weeks,' : 'week,'} ${((t % 7) > 1) ? `${(t % 7).toFixed(0)} days` : `${(t % 7).toFixed(0)} day`}`)}
                        </td>
                    </tr>
                )
                if (openRequestID === e) {
                    rows.push(
                        <tr key={openRequestID + 'requestID'} className='manager-request-open-request-row'>
                            <OpenRequestID ticket={e}/>
                        </tr>
                    )
                }
            }
        });
        console.log('rendering');
        return (
                <table className='manager-request-table'>
                    <thead>
                        <tr>
                            <th>
                                <div className='manager-filter-header-header'>
                                    <div style={{flexGrow: '1'}}>Ticket ID</div>
                                    <OrderBy type='ticket_id' />
                                </div>
                                <div><input type='text' className='manager-th-filter-search' /></div>
                            </th>
                            <th>
                                Employee ID
                                <div><input type='text' className='manager-th-filter-search' /></div>
                            </th>
                            <th>
                                Employee Name
                                <div><input type='text' className='manager-th-filter-search' /></div>
                            </th>
                            <th>
                                PTO Type
                                <div><input type='text' className='manager-th-filter-search' /></div>
                            </th>
                            <th>
                                Submit Date
                                <div><input type='text' className='manager-th-filter-search' /></div>
                            </th>
                            <th>
                                Time Remaining
                                <div><input type='text' className='manager-th-filter-search' /></div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
        )
    }

    const [orderBy, setOrderBy] = useState({ 'ticket_id': 0, employee_id: 0, employee_name: 0, pto_type: 0, submit_date: 0 });
    const handleOrderClick = (type) => {
        const old = orderBy[type];
        console.log(orderBy)
        console.log('old: ' + old)
        const new_val = (old === 2) ? 0 : (old + 1);
        console.log('ordering')
        let tmp = Object.assign(orderBy);
        tmp[type] = new_val;
        setOrderBy(tmp);
    }
    const OrderBy = ({ type }) => {
        console.log(orderBy[type] === 1);
        return (
            <div className='manager-filter-order-by' key='hey' onClick={() => handleOrderClick(type)}>
                {/* <IconContext.Provider value={{ size: '1em' }}>
                    <div className='order-up' style={(orderBy[type] === 1) ? {color: 'orange'} : {color: 'black'}}><TiArrowSortedUp /></div>
                    <div className='order-down' style={(orderBy[type] === 2) ? {color: 'orange'} : {color: 'black'}}><TiArrowSortedDown /></div>
                </IconContext.Provider> */}
            </div>
        )
    }
    const OpenRequestID = (props) => {
        return (
                <td align='center' colSpan='6'>
                    <div className='manager-table-open-request-container'>
                        <div className='manager-table-open-request-left'>
                            <div className='manager-request-disputed-days'>
                                {renderSelectedDays()}
                                <textarea rows="2" className="manager-request-note-input" placeholder="Add an optional note..." onBlur={handleResponseNoteChange} />
                            </div>
                            <div className='manager-request-response-type'>
                                <button 
                                    type='button' 
                                    value='APPROVE'
                                    style={{backgroundColor: '#76ff7a', padding: responseType === 'APPROVE' ? '10px' : '3px 5px'}} 
                                    onClick={handleResponseTypeClick}
                                    className='manager-request-response-type-button-selected'
                                >Approve</button>
                                <button 
                                    type='button' 
                                    value='REQUEST_MORE'
                                    style={{backgroundColor: '#fff700', padding: responseType === 'REQUEST_MORE' ? '10px' : '5px'}} 
                                    onClick={handleResponseTypeClick}
                                    className='manager-request-response-type-button-selected'
                                >Request More Information</button>
                                <button 
                                    type='button' 
                                    value='DENY'
                                    style={{backgroundColor: '#ff4040', padding: responseType === 'DENY' ? '10px' : '5px'}}
                                    onClick={handleResponseTypeClick}
                                    className='manager-request-response-type-button-selected'
                                >Deny</button>
                            </div>
                            <button type='button' className='manager-request-submit-response-button' onClick={sendResponseClick}>Submit Response</button>
                            <button type='button' onClick={handleDayRefClick}>Test</button>
                            <button type="button" className="open-request-close-button" onClick={handleOpenRequestClose}>Close</button>
                        </div>
                        <div className='cal-container'>
                            <Calendar 
                                setSelectedDays={setSelectedDays} 
                                selectedDays={selectedDays} 
                                setSelectedMonth={setSelectedMonth}
                                selectedMonth={selectedMonth}
                                setSelectedYear={setSelectedYear}
                                selectedYear={selectedYear}
                                calendarType="Manager"
                                employeeDaysTest={openRequestID.Ticket_Date_Ranges.map(e => {
                                    return e.requested_date;
                                })}
                                dayRef={dayRef}
                                pto={pto}
                            />
                        </div>
                        
                    </div>
                </td>
        )
    }
    
    const filterDropdown = (typeFilter) => {
        if (tickets === []) return;
        if (tickets !== null) {
            let filter = { 'name': [], 'employee_id': [], 'date': [], 'type': [] };
            let names = tickets.map(ticket => {
                return `${ticket.Employee.first_name} ${ticket.Employee.last_name}`;
            });
            let filterNames = [];
            names.forEach(e => {
                if (!filterNames.includes(e)) {
                    filterNames.push(e)
                }
            });
            filter.name = filterNames;
            let filterDates = [];
            tickets.forEach(e => {
                let date = e.createdAt.split("T", 1)[0];
                if (!filterDates.includes(date)) {
                    filterDates.push(date)
                }
            });
            filter.date = filterDates;
            let filterTypes = [];
            tickets.forEach(e => {
                if (!filterTypes.includes(e.pto_type_id)) {
                    if (e.pto_type_id !== null) filterTypes.push(e.pto_type_id)
                }
            });
            filter.type = filterTypes;
            let filteremployee_id = [];
            tickets.forEach(ticket => {
                if (!filteremployee_id.includes(ticket.employee_id)) {
                    if (ticket.employee_id !== null) filteremployee_id.push(ticket.employee_id)
                }
            });
            filter.employee_id = filteremployee_id;
            return (
                <div className='manager-filter-dropdown-header-container'>
                    <div className='manager-filter-dropdown'>
                        <button type='button' id={`manager-filter-${typeFilter}`} className='manager-filter-button'><HiFilter /> Filter</button>
                        <div className='manager-filter-dropdown-content' id={`manager-filter-${typeFilter}-child`}>
                            {filter[typeFilter].map((e) => {
                                    return (
                                        <div key={"filter_" + e} className='filter'
                                            id={typeFilter === 'name' ? e.name : typeFilter === 'type' ? e.typeFilter : typeFilter === 'date' ? e.submitDate : e.employee_id} 
                                            onClick={(x) => filterRequests(x, e)}
                                        >
                                            {e}
                                        </div>
                                    )
                                    })}
                        </div>
                    </div>
                    {filtered.includes(typeFilter) ? <div><button onClick={resetRequestTable}><BiReset /> Reset</button></div> : ''}
                </div>
            )
        }
        return (<div></div>)
    }
    const resetRequestTable = event => {
        event.preventDefault();
        
        setRequestsState(tickets);
        setFiltered([]);
    }
    const [filtered, setFiltered] = useState([]);
    const filterRequests = (event, value) => {
        setFiltered(prev => [...prev, event.target.parentElement.id.split("-")[2]]);
        let x = tickets;
        if (event.target.parentElement.id === 'manager-filter-name-child') {
            setRequestsState(prev => prev.filter(e => `${e.Employee.first_name} ${e.Employee.last_name}` === value))
        } else if (event.target.parentElement.id === 'manager-filter-type-child') {
            setRequestsState(prev => prev.filter(e => e.pto_type_id === value))
        } else if (event.target.parentElement.id === 'manager-filter-employee_id-child') {
            setRequestsState(x.filter(e => e.employee_id === value))
        } else if (event.target.parentElement.id === 'manager-filter-date-child') {
            setRequestsState(x.filter(e => e.createdAt.split("T", 1)[0] === value));
        }
    }
    const [filterColumnOpen, setFilterColumnOpen] = useState(false);
    const [filterAdditionalOpen, setFilterAdditionalOpen] = useState(false);
    const [filterEmployeesOpen, setFilterEmployeesOpen] = useState(false);

    const handleFilterColumnClick = event => {
        event.preventDefault();
        managerFilterAdditionalRef.current.style.height = '0';
        managerFilterEmployeesRef.current.style.height = '0';
        if (managerFilterColumnRef.current.style.height !== '100%')
            managerFilterColumnRef.current.style.height = '100%';
        else
            managerFilterColumnRef.current.style.height = '0';
        setFilterColumnOpen(prev => !prev);
        setFilterAdditionalOpen(false);
        setFilterEmployeesOpen(false);
    }

    const handleFilterAdditionalClick = event => {
        event.preventDefault();
        managerFilterColumnRef.current.style.height = '0';
        managerFilterEmployeesRef.current.style.height = '0';
        if (managerFilterAdditionalRef.current.style.height !== '100%')
            managerFilterAdditionalRef.current.style.height = '100%';
        else
            managerFilterAdditionalRef.current.style.height = '0';
        setFilterColumnOpen(false);
        setFilterAdditionalOpen(prev => !prev);
        setFilterEmployeesOpen(false);
    }

    const handleFilterEmployeeClick = event => {
        event.preventDefault();
        managerFilterAdditionalRef.current.style.height = '0';
        managerFilterColumnRef.current.style.height = '0';
        if (managerFilterEmployeesRef.current.style.height !== '100%')
            managerFilterEmployeesRef.current.style.height = '100%';
        else
            managerFilterEmployeesRef.current.style.height = '0';
        setFilterColumnOpen(false);
        setFilterAdditionalOpen(false);
        setFilterEmployeesOpen(prev => !prev);
    }

    const ManagerFilterTab = memo(({ leaderEmployees, handleChangeNew }) => {
        // const managerFilterAdditionalRef = useRef();
        // const managerFilterColumnRef = useRef();
        // const managerFilterEmployeesRef = useRef();
    
        // const [filterColumnOpen, setFilterColumnOpen] = useState(false);
        // const [filterAdditionalOpen, setFilterAdditionalOpen] = useState(false);
        // const [filterEmployeesOpen, setFilterEmployeesOpen] = useState(false);
    
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
    
        // const handleFilterEmployeeClick = event => {
        //     event.preventDefault();
        //     setFilterEmployeesOpen(prev => !prev);
        //     managerFilterAdditionalRef.current.style.height = 0;
        //     managerFilterColumnRef.current.style.height = 0;
        //     if (managerFilterEmployeesRef.current.style.height !== '100%') {
        //         managerFilterEmployeesRef.current.style.height = '100%';
        //         console.log('opened');
        //         // setFilterColumnOpen(true);
                
        //     } else {
        //         managerFilterEmployeesRef.current.style.height = '0';
        //         console.log('closed');
        //     }
            
        // }
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
                            <div id='manager-filter-tab-additional-filters-content' className='manager-filter-content' style={filterEmployeesOpen ? {height: '100%'} : {height: '0'}} ref={managerFilterEmployeesRef}>
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
                                {leaderEmployees.map(({ employee_id, first_name, last_name, checked }, index) => {
                                    return (
                                        <div key={'filterEmployeeID_' + employee_id}>
                                            <label htmlFor={'manager-filter-name_' + employee_id}>
                                                <input
                                                    type="checkbox"
                                                    checked={checked}
                                                    onChange={() => handleChangeNew(employee_id, index)}
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
    })

    // const GetEmployees = () => {
        
    //     return (
    //         <div>
    //             {leaderEmployees.map(({ employee_id, first_name, last_name, checked }, index) => {
    //                 return (
    //                     // <div key={'filterEmployeeID_' + employee_id}>
    //                     //     <label htmlFor={'manager-filter-name_' + employee_id}>
    //                     //         <input
    //                     //             type="checkbox"
    //                     //             onChange={() => handleChange(checked, index)}
    //                     //             checked={checked}
    //                     //             id={'manager-filter-name_' + employee_id}
    //                     //         />
    //                     //         <span>{first_name + ' ' + last_name}</span>
    //                     //     </label>
    //                     // </div>
    //                     // <div key={'filterEmployeeID_' + employee_id} className='manager-filter-list-employee-name'>{first_name + ' ' + last_name + ' ' + checked}</div>
    //                     <div key={'managerFilterEmployee' + employee_id} className='manager-filter-list-employee-name'>
    //                         <input type='checkbox' id={`manager-filter-employee_${employee_id}`} />
    //                         <label htmlFor={`manager-filter-employee_${employee_id}`}>{first_name + ' ' + last_name}</label>
    //                     </div>
    //                 )
    //                 })
    //             }
    //         </div>
    //     )
    // }
    const handleChangeNew = (employee_id, index) => {
        setLeaderEmployees(prev => prev.map((employee) => {
            if (employee.employee_id === employee_id)
                return { ...employee, checked: !employee.checked }
            else return employee;
        }));
        if (employeesToFilter.includes(employee_id)) {
            setEmployeesToFilter(prev => prev.filter(e => e.employee_id !== employee_id));
        } else {
            setEmployeesToFilter(prev => [...prev, employee_id]);
        }
    }
    const GetForm = () => {
        return (
            <div className='xtest'>
                <GetTable />
            </div>
        )
                {/* <ManagerFilterTab className='manager-filter-tab' leaderEmployees={leaderEmployees} handleChangeNew={handleChangeNew} /> */}
                {/* <div className='manager-filter-tab'>
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
                            {/* <GetEmployees /> 
                            <FilterEmployeesList leaderEmployees={leaderEmployees} handleChange={handleChange} />
                        </div>
                    </IconContext.Provider>
                </div> */}
        
    }
    console.log('rendering2')
    return (
        requestsState !== null ? <GetForm /> : <div>Loading...</div>
    )
}

export default RequestManager;