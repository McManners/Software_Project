import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Public from './components/Public';
import Login from './simple/Login.simple';
import Dashboard from './components/Dashboard';
import Welcome from './features/auth/Welcome';
import RequireAuth from './simple/RequireAuth';
import RememberLogin from './simple/RememberLogin';

function App() {

    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Public />} />
                <Route path='login' element={<Login />} />
                <Route element={<RememberLogin />}>
                    <Route element={<RequireAuth />}>
                        <Route path="dashboard" element={<Dashboard />}>
                            <Route index element={<Welcome />} />
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