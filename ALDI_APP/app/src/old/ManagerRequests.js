import React, { useRef } from 'react';
import useAuth from './useAuth';
import './managerrequests.css';
import axios from 'axios';

const ManagerRequests = () => {
    const { auth } = useAuth();
    const request1Ref = useRef();
    const [visible, setVisible] = React.useState(false);
    const [response, setResponse] = React.useState("");
    const [responseType, setResponseType] = React.useState("");
    const approveRef = useRef();
    const denyRef = useRef();
    const requestRef = useRef();

    axios.interceptors.request.use(req => {
        console.log("logging request sent: ");
        console.log(req);
        return req;
    });

    const handleResponseTypeChange = event => {
        event.preventDefault();
        setResponseType(event.target.value);
    }
    const handleResponseChange = event => {
        event.preventDefault();
        setResponse(event.target.value);
    }
    const submitRequest = async () => {
        axios({
            method: 'post',
            url: 'http://localhost:3001/ticketresponse/create',
            withCredentials: true,
            // headers: {
            //     'Authorization': `Bearer ${auth.access_token}`
            // },
            data: {
                ticket_id: 1,
                response_type: responseType,
                response: response
            }
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div id='manager-container'>
            <div id='manager-main-requests'>
                <h2>Pending Requests</h2>
                <div>
                    <div className='request'>
                        <div style={{display: 'flex'}}>
                            <div style={{ textAlign: 'start', lineHeight: '1.1em', margin: '0 5px'}}>
                            Employee Name: <br/><span style={{fontWeight: 'lighter', textAlign: 'right'}}>Anthony Salerno</span>
                            </div>
                            <div style={{textAlign: 'start', margin: '0 5px', lineHeight: '1.1em'}}>
                                Type: <span style={{fontWeight: 'lighter', textAlign: 'right'}}>Vacation</span>
                            </div>
                            <div style={{textAlign: 'start', margin: '0 5px', lineHeight: '1.1em'}}>
                                Date From: <span style={{fontWeight: 'lighter', textAlign: 'right'}}>October 8</span>
                                <br/>Date To: <span style={{fontWeight: 'lighter', textAlign: 'right'}}>October 10</span>
                            </div>
                        </div>
                        <div style={{textAlign: 'left', margin: '5px 5px'}}>
                            Request Note: <div style={{fontWeight: 'lighter', textAlign: 'left', backgroundColor: 'lightgray', padding: '10px'}}>It is my birthday</div>
                        </div>
                        <div>
                            <button type="button" id="approve-request" style={{backgroundColor: 'lightgreen', borderRadius: '5px', margin: '0 5px'}} className="manager-button" ref={approveRef} onClick={() => setVisible(false)}>Approve</button>
                            <button type="button" id="deny-request" style={{backgroundColor: 'red', borderRadius: '5px', margin: '0 5px'}} className="manager-button" ref={denyRef} onClick={() => setVisible(false)}>Deny</button>
                            <button type="button" id="request-more-request" style={{backgroundColor: 'yellow', borderRadius: '5px', margin: '0 5px'}} className="manager-button" ref={requestRef} onClick={() => setVisible(true)}>Request more information</button>
                        </div>
                        {visible &&
                            <div>
                                <textarea ref={request1Ref} id='request-1' style={{margin: '10px 0', resize: 'vertical', overflow: 'auto'}} onChange={() => handleResponseChange} rows="2" cols="50" placeholder="Add a reason..."/><br/>
                            </div>
                        }
                        <button type="button" id="approve-request" style={{backgroundColor: 'orange', borderRadius: '5px', margin: '0 5px'}} onClick={submitRequest}>Submit</button>
                    </div>
                        
                    <div className='request'>Request2</div>
                    <div className='request'>Request3</div>
                </div>
            </div>
        </div>
    )
}

export default ManagerRequests;