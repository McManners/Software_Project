import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import useAuth from '../../simple/useAuth';
import useLogout from '../../simple/useLogout';
import useRefreshToken from '../../simple/useRefreshToken';

const Requests = () => {
    const [tickets, setTickets] = useState([]); // change to null, creating loading component until got response
    const navigate = useNavigate();
    const location = useLocation();
    const { auth, setAuth } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const logout = useLogout();
    const refresh = useRefreshToken();

    const getTickets = () => {
        axios.interceptors.request.use(req => {
            console.log("logging request sent: ");
            console.log(req);
            return req;
        });

        axios({
            method: 'GET',
            url: 'http://localhost:3001/ticket',
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${auth.access_token}`
            }
        })
        /*
            https://stackoverflow.com/questions/62964902/axios-post-extracting-data-from-response
        */
        .then(function(res) {
            console.log("response: " + JSON.stringify(res.data.tickets));
            setTickets(res.data.tickets);
            
        })
        .catch(err => {
            console.log(err);
        });
    };


    useEffect(() => {
        getTickets();
    }, []);

    

    
    return (
        <div>
            <div className='container-grid'>
                <div className='grid-item'>
                    Pending Requests
                </div>
                <div className='grid-item requests'>
                    <button type="button" onClick={() => console.log(tickets)}>Show my tickets</button>
                    <table id="requests-table" style={{border: "1px solid black", textAlign: "center", backgroundColor: "orange"}}>
                        <thead>
                            <tr>
                                <th>Ticket ID</th>
                                <th>Employee ID</th>
                                <th>Supervisor ID</th>
                                <th>Status</th>
                                <th>Request Note</th>
                            </tr>
                            
                        </thead>
                        <tbody>
                            {tickets.map(function(ticket, key) {
                                return (
                                    <tr key={key}>
                                        <td>{ticket.ticket_id}</td>
                                        <td>{ticket.employee_id}</td>
                                        <td>{ticket.leader_id}</td>
                                        <td>{(ticket.status === true) ? "Open" : "Closed"}</td>
                                        <td>{ticket.request_note}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <button type="button" onClick={() => navigate("/dashboard/newticket")}>Create New Ticket</button>
                </div>
            </div>
        </div>
    )
}

export default Requests;