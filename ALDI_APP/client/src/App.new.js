// import { Routes, Route } from 'react-router-dom';
// import Layout from './components/Layout';
// import Public from './components/Public';
// // import Login from './features/auth/Login';
// import Login from './simple/Login.simple';
// import Dashboard from './components/Dashboard';
// import Welcome from './features/auth/Welcome';
// import PTORequests from './features/pto/PTORequestsList';
// import UsersList from './features/users/UsersList';
// import EditUser from './features/users/EditUser';
// import NewUserForm from './features/users/NewUserForm';
// import EditPTORequest from './features/pto/EditPTORequest';
// import NewPTORequest from './features/pto/NewPTORequest';

// function App() {
//     return (
//         <Routes>
//             <Route path='/' element={<Layout />}>
//                 <Route index element={<Public />} />
//                 <Route path='login' element={<Login />} />

//                 <Route path="dashboard" element={<Dashboard />}>
//                     <Route index element={<Welcome />} />

//                     <Route path="users">
//                         <Route index element={<UsersList />} />
//                         <Route path=":id" element={<EditUser />} />
//                         <Route path="new" element={<NewUserForm />} />
//                     </Route>

//                     <Route path="ptorequests">
//                         <Route index element={<PTORequests />} />
//                         <Route path=":id" element={<EditPTORequest />} />
//                         <Route path="new" element={<NewPTORequest />} />
//                     </Route>

//                 </Route>
//             </Route>
//         </Routes>
//     );
// }

// export default App;