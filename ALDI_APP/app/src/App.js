import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Public from './components/Public';
import Login from './simple/Login.simple';
import Dashboard from './components/Dashboard';
import Welcome from './features/auth/Welcome';
import RequireAuth from './simple/RequireAuth';
import RememberLogin from './simple/RememberLogin';
import Register from './simple/Register';
import Unauthorized from './simple/Unauthorized';
import Status from './simple/Status';
import SessionExpired from './simple/SessionExpired';
import PendingRequests from './simple/Requests/PendingRequests';
import ClosedRequests from './simple/Requests/ClosedRequests';
import CreateRequestWithCalendar from './simple/Requests/CreateRequestWithCalendar';
import RequestManager from './simple/Requests/RequestManager';
import ManagerContainer from './simple/Requests/ManagerContainer';
import RequestContainer from './simple/Requests/RequestContainer';
import NewManager from './simple/Requests/NewManager';
import Game from './simple/GameTest/Game';

import PageLayout from './shopkeep/container/PageLayout';
import ItemList from './shopkeep/pages/ItemList';
import Dashboard_ShopKeep from './shopkeep/pages/dashboard/Dashboard_ShopKeep';
import Edit from './shopkeep/pages/Edit';
import Modifiers from './shopkeep/pages/Modifiers';
import TimeClock from './shopkeep/pages/TimeClock';
import NewEmployee from './shopkeep/pages/staff/NewEmployee';
import EmployeeList from './shopkeep/pages/staff/EmployeeList';
import EditEmployee from './shopkeep/pages/staff/EditEmployee';


function App() {

    return (
        <Routes>
            <Route path="salerno" element={<Dashboard_ShopKeep />}>
                <Route element={<PageLayout />}>
                    <Route path='items' element={<ItemList />} />
                    <Route path='items/:id/edit' element={<Edit />} />
                    {/* <Route path='edit/new' element={<Edit />} /> */}
                    <Route path='items/:id/modifiers' element={<Modifiers />} />

                    <Route path='employees' element={<EmployeeList />} />
                    <Route path='employees/timeclock' element={<TimeClock />} />
                    <Route path='employees/new' element={<NewEmployee />} />
                    <Route path='employees/:id/edit' element={<EditEmployee />} />
                </Route>
            </Route>

            
            <Route path='/' element={<Layout />}>
                <Route index element={<Public />} />
                <Route path='login' element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="unauthorized" element={<Unauthorized />} />
                <Route path="sessionexpired" element={<SessionExpired />}/>
                <Route element={<RememberLogin />}>
                    <Route element={<Status />}>
                        <Route element={<RequireAuth allowedEmployeeType={["Employee", "Manager"]}/>}>
                            <Route path="dashboard" element={<Dashboard />}>
                                <Route index element={<Welcome />} />
                                <Route path="newmanager" element={<NewManager />}/>
                                <Route element={<RequestContainer />}>
                                    <Route path="pending" element={<PendingRequests />}/>
                                    <Route path="closed" element={<ClosedRequests />}/>
                                    <Route path="create" element={<CreateRequestWithCalendar />}/>
                                    <Route path="manager" element={<RequestManager />}/>
                                </Route>
                            </Route>
                        </Route>
                        
                    </Route>
                </Route>
            </Route>
        </Routes>
    )
}

export default App;