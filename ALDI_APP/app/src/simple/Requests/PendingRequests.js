import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './pendingrequest.css';
import useAuth from '../useAuth';
import useAxiosPrivate from '../../simple/useAxiosPrivate';

const PendingRequest = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { auth } = useAuth();
    const [tickets, setTickets] = useState([]);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        // https://github.com/gitdagray/react_persist_login/blob/main/src/components/Users.js
        let isMounted = true;
        const controller = new AbortController();

        const getTickets = async () => {
            // https://flaviocopes.com/axios-send-authorization-header
            try {
                const response = await axiosPrivate.get('/ticket', {
                    access_token: auth.access_token
                },
                {
                    headers: {
                        'Authorization': `Bearer ${auth.access_token}`
                    }
                });
                isMounted && setTickets(response.data.tickets);
            } catch (err) {
                console.log(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }
        getTickets();
        
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);
    const renderSelectedDays = (ticket) => {
        let days = "";
        ticket.Ticket_Date_Ranges.map(date => {
            days += (`${date['start_date'].split('T', 1)}, `);
        })
        return (
            <div>
                {days.slice(0, -2)}
            </div>
        )
    }

    const [requestsState, setRequestsState] = useState([]);
    const [openRequestID, setOpenRequestID] = useState([]);
    const handleOpenRequestClick = event => {
        const id = event.currentTarget.id;
        console.log(id);
        if (openRequestID.includes(id))
            setOpenRequestID(prev => prev.filter(e => e !== id));
        else
            setOpenRequestID(prev => [...prev, id]);
    }
    const handleOpenRequestClose = () => {
        setOpenRequestID([]);
    }

    const GetTable = () => {
        let rows = [];
        tickets.map(e => {
            rows.push(
                    <tr key={e.ticket_id} id={parseInt(e.ticket_id)} className='pending-request-table-row' onClick={handleOpenRequestClick}>
                        <td>{e.ticket_id}</td>
                        <td>{e['PTO_Type']['pto_type']}</td>
                        <td>{renderSelectedDays(e)}</td>
                        <td>{e.createdAt.split("T",1)[0]}</td>
                    </tr>
            )
            if (Number(openRequestID) === e.ticket_id)
                rows.push(
                    <tr>
                        <OpenRequestID />
                    </tr>);
        });
        return (
                <table className='pending-request-table'>
                    <thead>
                        <tr>
                            <th>
                                Ticket ID
                            </th>
                            <th>
                                Type
                            </th>
                            <th>
                                Requested Dates
                            </th>
                            <th>
                                Submit Date {filterDropdown('submitDate')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {!(tickets?.length === null) ? rows : <tr><td colSpan={5}>Loading...</td></tr>}
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
                                Requested Days: 
                            </div>
                            
                            <button type="button" className="open-request-close-button" onClick={handleOpenRequestClose}>Close</button>
                        </div>
                    </div>
                </td>
        )
    }
    const filterNavRef = useRef();
    const filterDropdown = (type) => {
        
        return (
            <div className='manager-filter-dropdown'>
                <button type='button' id={`manager-filter-${type}`} className='manager-filter-button'>Filter</button>
                <div className='manager-filter-dropdown-content' id={`manager-filter-${type}`}>
                    {tickets.map((e, index) => {
                        return (
                            <div key={index} 
                                id={type === 'name' ? e.name : type === 'type' ? e.type : type === 'submitDate' ? e.submitDate : e.timeRemaining} 
                                onClick={filterRequests}
                            >
                                {type == 'name' ? e.name : type == 'type' ? e.type : type === 'submitDate' ? e.submitDate : e.timeRemaining}
                            </div>
                        )
                        })}
                </div>
            </div>
        )
    }
    const resetRequestTable = event => {
        event.preventDefault();
        console.log(openRequestID);
    }
    const filterRequests = event => {
        setRequestsState(tickets);
        console.log(event.target.parentElement);
        console.log(event.target.parentElement.id);
        console.log(event.target.id);
        if (event.target.parentElement.id == 'manager-filter-name') {
            setRequestsState(prev => prev.filter(e => e.name === event.target.id))
        } else if (event.target.parentElement.id == 'manager-filter-type') {
            setRequestsState(prev => prev.filter(e => e.type === event.target.id))
        } else if (event.target.parentElement.id == 'manager-filter-timeRemaining') {
            setRequestsState(prev => prev.filter(e => e.timeRemaining === event.target.id))
        } else if (event.target.parentElement.id == 'manager-filter-submitDate') {
            setRequestsState(prev => prev.filter(e => e.submitDate === event.target.id))
        }
    }
    const [filterNamePlaceholder, setFilterNamePlaceholder] = useState('Filter by name...');
    const [filterTypePlaceholder, setFilterTypePlaceholder] = useState('Filter by name...');
    const [filterTimeRemainingPlaceholder, setFilterTimeRemainingPlaceholder] = useState('Filter by name...');

    const filter = () => {
        console.log(filterNavRef.current.style.width);
        if (filterNavRef.current.style.width === "0px") {
            filterNavRef.current.style.width = "10%";
        } else {
            filterNavRef.current.style.width = "0px";
        }
    }

    return (
            <GetTable />
    )
}

export default PendingRequest;