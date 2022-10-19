import { Link }  from 'react-router-dom';
import useAuth from '../../simple/useAuth';

const Welcome = () => {
    const date = new Date();
    const today = new Intl.DateTimeFormat('en-US', { dataStyle: 'full', timeStyle: 'long' }).format(date);
    const { auth } = useAuth();
    const content = (
        <section className="welcome">
            <p>{today}</p>
            <h1>Welcome!</h1>
            <h2>{auth.email}</h2>
            <p><Link to="/dashboard/requests">View PTO Requests</Link></p>
            <p><Link to="/dashboard/users">View User Settings</Link></p>
            { /* user settings will only be available to some users (roles) */ }
        </section>
    )
    
    return content;
}
export default Welcome;