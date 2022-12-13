import { Outlet } from 'react-router-dom';
import useAuth from '../simple/useAuth';
import DashHeader from './DashHeader';

const Dashboard = () => {
    const { auth } = useAuth();
    console.log(auth);
    return (
        <>
            <DashHeader name={`${auth.first_name} ${auth.last_name}`}/>
            <Outlet />
        </>
    )
}
export default Dashboard;