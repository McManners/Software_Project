// // import { FontAwesomeIcom } from '@fortawesome/react-fontawesome';
// // import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
// import { useNavigate } from 'react-router-dom';

// import { useSelector } from 'react-redux';
// import { selectPTORequestById } from './ptorequestApiSlice';

// const PTORequest = ({ ptorequestId }) => {
//     const ptorequest = useSelector(state => selectPTORequestById(state, ptorequestId));

//     const navigate = useNavigate();

//     if (ptorequest) {
//         const created = new Date(ptorequest.created_at).toLocaleString('en-US', { day: 'numeric', month: 'long' });

//         const updated = new Date(ptorequest.updated_at).toLocaleString('en-US', { day: 'numeric', month: 'long' });

//         const handleEdit = () => navigate(`/dashboard/ptorequests/${ptorequestId}`);

//         return (
//             <tr className="table__row">
//                 <td className="table__cell ptorequest__status">
//                     {ptorequest.completed
//                         ? <span className="note__status--completed">Completed</span>
//                         : <span className="note__status--open">Open</span>}
//                 </td>
//                 <td className="table__cell ptorequest__created">{created}</td>
//                 <td className="table__cell ptorequest__updated">{updated}</td>
//                 <td className="table__cell ptorequest__employee_id">{ptorequest.employee_id}</td>

//                 <td className="table__cell">
//                     <button
//                         className="icon-button table__button"
//                         onClick={handleEdit}
//                     >
//                         <FontAwesomeIcom icon={faPenToSquare} />
//                     </button>
//                 </td>
//             </tr>
//         )
//     } else return null;
// }

// export default PTORequest;