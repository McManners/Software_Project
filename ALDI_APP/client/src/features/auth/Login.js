// // client/src/App.js

// import React from "react";
// // import logo from "./logo.svg";
// // import "./App.css";

// const Login = () => {
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
//         .then(set)
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
// }

// export default App;