import { Link }  from 'react-router-dom';
import useAuth from '../../simple/useAuth';
import axios from 'axios';

const Welcome = () => {
    const date = new Date();
    const today = new Intl.DateTimeFormat('en-US', { dataStyle: 'full', timeStyle: 'long' }).format(date);
    const { auth } = useAuth();
    
    const getTickets = () => {
        let tickets;
        axios({
            method: 'get',
            url: 'http://localhost:3001/ticket',
            withCredentials: true
        })
        /*
            https://stackoverflow.com/questions/62964902/axios-post-extracting-data-from-response
        */
        .then(function(res) {
            console.log("auth response is good");
            console.log(res.data);
            tickets = res.data.tickets;
        })
        .catch(err => {
            console.log("failed getting tickets");
        });
    }

    const content = (
        <section className="welcome">
            <p>{today}</p>
            <h1>Welcome!</h1>
            <h2>{auth.email}</h2>

            {/* <button type='button' onClick={getTickets}>Get Tickets</button> */}
            <p><Link to="/dashboard/requests">View PTO Requests</Link></p>
            <p><Link to="/dashboard/users">View User Settings</Link></p>
            { /* user settings will only be available to some users (roles) */ }
        </section>
    )
    
    return content;
}
export default Welcome;