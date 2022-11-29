import { Link }  from 'react-router-dom';

const DashboardWelcome = () => {
    const date = new Date();
    const today = new Intl.DateTimeFormat('en-US', { dataStyle: 'full', timeStyle: 'long' }).format(date);

    const content = (
        <section className="welcome">
            <p>{today}</p>
            <h1>Welcome!</h1>

            {/* <button type='button' onClick={getTickets}>Get Tickets</button> */}
            <p><Link to="/request/dashboard/manager">View Manager</Link></p>
            <p><Link to="/request/dashboard/create/calendar">View Create Calendar</Link></p>
            { /* user settings will only be available to some users (roles) */ }
        </section>
    )
    
    return content;
}
export default DashboardWelcome;