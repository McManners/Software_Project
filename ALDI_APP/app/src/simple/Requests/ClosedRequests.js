import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './pendingrequest.css';
import useAuth from '../useAuth';
import useAxiosPrivate from '../../simple/useAxiosPrivate';
import CreateRequestWithCalendar from './CreateRequestWithCalendar';
import './closedrequests.css';

const ClosedRequests = () => {
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
                const response = await axiosPrivate.get('/ticket/closed', {
                    access_token: auth.access_token
                },
                {
                    headers: {
                        'Authorization': `Bearer ${auth.access_token}`
                    }
                });
                console.log(response.data)
                isMounted && setTickets(response.data);
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
    const renderRequestedDays = (ticket) => {
        return (
            <div className='pending-requests-requested-days'>
                {ticket.Ticket_Date_Ranges.map(e => {
                    return (
                        <div key={ticket.id + e.requested_date}>{new Date(e.requested_date).toDateString()}</div>
                    );
                })}
            </div>
        )
    }
    
    const [requestsState, setRequestsState] = useState([]);
    const [openRequestID, setOpenRequestID] = useState([]);
    const handleOpenRequestClick = event => {
        const id = Number(event.currentTarget.id);
        console.log(id);
        console.log(openRequestID);
        if (openRequestID.includes(id))
            setOpenRequestID(prev => prev.filter(e => e !== id));
        else
            setOpenRequestID(prev => [...prev, id]);
    }
    const handleOpenRequestClose = event => {
        const id = Number(event.currentTarget.id);
        console.log(id);
        console.log(openRequestID);
        setOpenRequestID(prev => prev.filter(e => e !== id));
    }

    const GetTable = () => {
        let rows = [];
        console.log(openRequestID);
        tickets.map(e => {
            const date = new Date(e.createdAt).toDateString().split(" ");
            if (e.status === "NEED MORE INFORMATION") {
                if (openRequestID.includes(e.ticket_id)) {
                    rows.unshift(
                        <tr key={'open_req_' + e.ticket_id}>
                            <OpenRequestID ticket={e}/>
                        </tr>);
                }
                rows.unshift(
                    <tr key={e.ticket_id} id={parseInt(e.ticket_id)} className='closed-request-table-row' onClick={handleOpenRequestClick}>
                        <td>{e.ticket_id}</td>
                        <td>{e.pto_type_id === 1 ? "Vacation" : e.pto_type_id === 2 ? "Personal" : "Sick"}</td>
                        <td>Needs Attention</td>
                        {/* <td>{e.createdAt.split("T",1)[0]}</td> */}
                        <td>{`${date[1]} ${date[2]}, ${date[3]}`}</td>
                    </tr>
                )}
            else {
                rows.push(
                        <tr key={e.ticket_id} id={parseInt(e.ticket_id)} className='closed-request-table-row' onClick={handleOpenRequestClick}>
                            <td>{e.ticket_id}</td>
                            <td>{e.pto_type_id === 1 ? "Vacation" : e.pto_type_id === 2 ? "Personal" : "Sick"}</td>
                            <td>Pending Review</td>
                            {/* <td>{e.createdAt.split("T",1)[0]}</td> */}
                            <td>{`${date[1]} ${date[2]}, ${date[3]}`}</td>
                        </tr>
                )
                if (openRequestID.includes(e.ticket_id))
                    rows.push(
                        <tr key={'open_req_' + e.ticket_id}>
                            <OpenRequestID ticket={e}/>
                        </tr>);
            }
        });
        return (
            <table className='closed-request-table'>
                <thead>
                    <tr>
                        <th>
                            Ticket ID
                        </th>
                        <th>
                            Type
                        </th>
                        <th>
                            Status
                        </th>
                        <th>
                            Submit Date {filterDropdown('submitDate')}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {!(tickets?.length === null) ? rows : <tr><td colSpan={4}>Loading...</td></tr>}
                </tbody>
            </table>
        )
    }
    const OpenRequestID = ({ ticket }) => {
        console.log(ticket);
        return (
                <td align='center' colSpan='4'>
                    <div className='pending-open-request-container2'>
                        <div className='pending-open-request-data' style={{gridArea: 'leader', alignSelf: 'flex-start'}}>
                            <div className='pending-open-container-header' style={{padding: '5px 0 5px 5px'}}>Leader Name</div>
                            <div style={{textAlign: 'left', padding: '5px 15px'}}>
                                {/* {ticket.Leader.first_name + ' ' + ticket.Leader.last_name} */}
                                Leader Name
                            </div>
                        </div>
                        <div className='pending-open-request-data' style={{gridArea: 'request-note'}}>
                            <div className='pending-open-container-header' style={{padding: '5px 0 5px 5px'}}>Request Note</div>
                            <div className='pending-open-request-data-element'>
                                <textarea className='pending-request-textarea' value={ticket.request_note} disabled />
                            </div>
                         </div>
                        {ticket.status === "NEED MORE INFORMATION" ? 
                            (
                                <div className='pending-open-request-data' style={{gridArea: 'response-note'}}>
                                    <div className='pending-open-container-header'>Response Note</div>
                                    <div className='pending-open-request-data-element'>
                                        <textarea className='pending-request-textarea' value={ticket.response_note} disabled />
                                    </div>
                                </div>
                            ) :
                            (
                                ''
                            )
                        }
                        <div className='pending-open-request-data' style={{gridArea: 'requested-days'}}>
                            <div className='pending-open-container-header' style={{padding: '5px 0 5px 5px'}}>Requested Days</div>
                            {renderRequestedDays(ticket)}
                        </div>
                        <button type="button" className="open-request-close-button" id={ticket.ticket_id} onClick={handleOpenRequestClose}>Close</button>
                    </div>
                    {ticket.status !== 'PENDING' ? <CreateRequestWithCalendar /> : ''}
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
    

    return (
        tickets.length === 0 ? <h3>You have no closed tickets</h3> : <GetTable />
    )
}

export default ClosedRequests;