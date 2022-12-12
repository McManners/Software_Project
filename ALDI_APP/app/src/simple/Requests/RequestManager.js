import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './requestmanager.css';
import Calendar from './Calendar';
import useAuth from '../useAuth';
import useAxiosPrivate from '../../simple/useAxiosPrivate';
import { HiFilter } from 'react-icons/hi';
import { BiReset } from 'react-icons/bi';

const RequestManager = () => {
    const dayRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const { auth } = useAuth();
    const [requestNote, setRequestNote] = useState("");
    const date = new Date();
    const [tickets, setTickets] = useState(null);
    const [requestsState, setRequestsState] = useState(null);
    const [responseType, setResponseType] = useState(null);
    const axiosPrivate = useAxiosPrivate();

    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(date.getMonth() - 1);
    const [selectedYear, setSelectedYear] = useState(date.getFullYear());
    
    const [openDay, setOpenDay] = useState(null);

    const handleRequestNoteChange = event => {
        setRequestNote(event.target.value);
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
        // https://flaviocopes.com/axios-send-authorization-header
        try {
            const response = await axiosPrivate.post('/pto/create', {
                access_token: auth.access_token,
                ticket_id: openRequestID.ticket_id,
                status: responseType
            },
            {
                headers: {
                    'Authorization': `Bearer ${auth.access_token}`
                }
            });
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
        requestsState.map((e) => {
            if (e.status === "PENDING") {
                const t = getTimeRemaining(e.createdAt);
                rows.push(
                        <tr key={e.ticket_id} onClick={() => handleOpenRequestClick(e)} className='manager-request-table-row'>
                            <td>{e.ticket_id}</td>
                            <td>{e.employee_id}</td>
                            <td>{`${e.Employee.first_name} ${e.Employee.last_name}`}</td>
                            <td>{e.pto_type_id}</td>
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
                            <OpenRequestID />
                        </tr>
                    )
                }
            }});
        
        return (
                <table className='manager-request-table'>
                    <thead>
                        <tr>
                            <th>
                                Ticket ID
                            </th>
                            <th>
                                Employee ID {filterDropdown('employee_id')}
                            </th>
                            <th>
                                Employee Name {filterDropdown('name')}
                            </th>
                            <th>
                                PTO Type {filterDropdown('type')}
                            </th>
                            <th>
                                Submit Date {filterDropdown('date')}
                            </th>
                            <th>
                                Time Remaining
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
        )
    }
    const OpenRequestID = () => {
        return (
                <td align='center' colSpan='6'>
                    <div className='manager-table-open-request-container'>
                        <div className='manager-table-open-request-left'>
                            <div className='manager-request-disputed-days'>
                                {renderSelectedDays()}
                                <textarea rows="2" className="manager-request-note-input" placeholder="Add an optional note..." onBlur={handleRequestNoteChange} />
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
                                        <div key={"filter_" + e} 
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
        if (event.target.parentElement.id == 'manager-filter-name-child') {
            setRequestsState(prev => prev.filter(e => `${e.Employee.first_name} ${e.Employee.last_name}` === value))
        } else if (event.target.parentElement.id == 'manager-filter-type-child') {
            setRequestsState(prev => prev.filter(e => e.pto_type_id === value))
        } else if (event.target.parentElement.id == 'manager-filter-employee_id-child') {
            setRequestsState(x.filter(e => e.employee_id === value))
        } else if (event.target.parentElement.id == 'manager-filter-date-child') {
            setRequestsState(x.filter(e => e.createdAt.split("T", 1)[0] === value));
        }
    }
    const GetForm = () => {
        return (
            // <div className='manager-pending-request-item'>
                <div className='manager-requests-body-container'>
                    <div className='manager-request-body-header'>
                        <button type='button' id='manager-reset-table-button' onClick={resetRequestTable}>Reset Table</button>
                    </div>
                    
                    <GetTable />
                </div>
                
            // </div>
        )
    }

    return (
        
        requestsState !== null ? <GetForm /> : <div>Loading...</div>
    )
}

export default RequestManager;