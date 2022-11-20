import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Public from './components/Public';
import Login from './simple/Login.simple';
import Dashboard from './components/Dashboard';
import Welcome from './features/auth/Welcome';
import RequireAuth from './simple/RequireAuth';
import RememberLogin from './simple/RememberLogin';
import Requests from './simple/ticket/Requests';
import NewTicket from './simple/ticket/NewTicket';
import Register from './simple/Register';
import Unauthorized from './simple/Unauthorized';
import Status from './simple/Status';
import SessionExpired from './simple/SessionExpired'; // should protect this route somehow...
import ManagerRequests from './simple/ManagerRequests';

import LoginTest from './src/new/Pages/Login';
import Home from './src/new/Pages/Home';
import StatsTest from './src/new/Pages/Stats';
import RequestPTO from './src/new/Pages/RequestPTO';
import Stats from './simple/official/Stats';
import PendingRequests from './simple/Requests/PendingRequests';
import CompleteRequests from './simple/Requests/CompleteRequests';
import CreateRequest from './simple/Requests/CreateRequest';

import CalendarTest from './simple/Requests/CalendarTest';
import CreateRequestWithCalendar from './simple/Requests/CreateRequestWithCalendar';
import RequestManager from './simple/Requests/RequestManager';

function App() {

    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Public />} />
                <Route path='login' element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="unauthorized" element={<Unauthorized />} />
                <Route path="sessionexpired" element={<SessionExpired />}/>
                
                <Route path="logintest" element={<LoginTest />}/>
                <Route path="hometest" element={<Home />}/>
                <Route path="statstest" element={<StatsTest />}/>
                <Route path="requesttest" element={<RequestPTO />}/>
                <Route path="stats" element={<Stats />}/>

                <Route path="request/pending" element={<PendingRequests />}/>
                <Route path="request/complete" element={<CompleteRequests />}/>
                <Route path="request/create" element={<CreateRequest />}/>
                <Route path="calendartest" element={<CalendarTest />}/>
                <Route path="request/create/calendar" element={<CreateRequestWithCalendar />}/>
                <Route path="request/manager" element={<RequestManager />}/>

                <Route element={<RememberLogin />}>
                    <Route element={<Status />}>
                        <Route element={<RequireAuth allowedEmployeeType={["Employee", "Manager"]}/>}>
                            <Route path="dashboard" element={<Dashboard />}>
                                <Route index element={<Welcome />} />
                                <Route path="requests" element={<Requests />}/>
                                <Route path="newticket" element={<NewTicket />}/>
                            </Route>
                        </Route>
                        <Route element={<RequireAuth allowedEmployeeType={["Manager"]}/>}>
                            <Route path="dashboard" element={<Dashboard />}>
                                <Route index element={<Welcome />} />
                                <Route path="requests" element={<Requests />}/>
                                <Route path="newticket" element={<NewTicket />}/>
                                <Route path="manager" element={<ManagerRequests />}/>
                            </Route>
                        </Route>
                    </Route>
                </Route>
            </Route>
        </Routes>
    )


    // return (
    //     <Routes>
    //         <Route path='/' element={<Layout />}>
    //             <Route index element={<Public />} />
    //             <Route path='login' element={<Login />} />

    //             <Route path="dashboard" element={<Dashboard />}>
    //                 <Route index element={<Welcome />} />

    //                 <Route path="users">
    //                     <Route index element={<UsersList />} />
    //                     <Route path=":id" element={<EditUser />} />
    //                     <Route path="new" element={<NewUserForm />} />
    //                 </Route>

    //                 <Route path="ptorequests">
    //                     <Route index element={<PTORequests />} />
    //                     <Route path=":id" element={<EditPTORequest />} />
    //                     <Route path="new" element={<NewPTORequest />} />
    //                 </Route>

    //             </Route>
    //         </Route>
    //     </Routes>
    // )


//   const [data, setData] = React.useState(null);

// //   React.useEffect(() => {
// //     fetch("/api/employee")
// //       .then((res) => res.json())
// //       .then((data) => setData(data.message));
// //   }, []);
//     const [email, setEmail] = React.useState("");
//     const [password, setPassword] = React.useState("");

//     const handleEmailChange = event => {
//         setEmail(event.target.value)
//     };
//     const handlePasswordChange = event => {
//     setPassword(event.target.value)
//     };

//     const handleRefresh = event => {
//         event.preventDefault();
//         const url = 'http://localhost:3001/refresh';
//         const requestOptions = {
//             method: 'GET',
//             headers: { 'Content-Type': 'application/json' }
//         };
//         fetch(url, requestOptions)
//         .then(response => console.log(response))
//         .catch (error => console.log("Refresh Error: " + error))
//     };
//     const handleLogout = event => {
//         event.preventDefault();
//         const url = 'http://localhost:3001/logout';
//         const requestOptions = {
//             method: 'GET',
//             headers: { 'Content-Type': 'application/json' }
//         };
//         fetch(url, requestOptions)
//         .then(response => console.log(response))
//         .catch(err => console.log("Logout error: " + err));
//     }
//     const handleSubmit = event => {
//         event.preventDefault();

//         const url = 'http://localhost:3001/auth';
//         const requestOptions = {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             credentials: 'include',
//             body: JSON.stringify({ email, password })
//         };
//         fetch(url, requestOptions)
//         .then(response => {
//             console.log('Submitted successfully');
//             console.log(response);
//         })
//         .catch(error => console.log('Form submit error', error))
//     };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <label htmlFor='email'>Email Address:</label><br />
//                 <input type='email' id='email-input' name='email-input' defaultValue="name@example.com" onChange={handleEmailChange} value={email}/><br /><br />
//                 <label htmlFor='password-input'>Password:</label><br /><br />
//                 <input type='password' id='password-input' name='password-input' onChange={handlePasswordChange} value={password} defaultValue="123456"/><br /><br />
//                 <label htmlFor='remember-me-input'>Remember Me: </label>
//                 <input type='checkbox' name='remember-me-input' id='remember-me-input'/><br /><br />
//                 <button type='submit' name='submit' id='submit'>Submit</button>
//             </form>
//             <br /><br />
//             <button type='button' onClick={handleRefresh}>Refresh Token</button>
//             <button type='button' onClick={handleLogout}>Logout</button>
//         </div>
//       </header>
//     </div>
//   );
}

export default App;