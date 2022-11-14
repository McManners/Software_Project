// import { useGetPTORequestsQuery } from './ptorequestApiSlice';
// import PTORequest from './PTORequest';

// const PTORequestsList = () => {
//     const {
//         data: ptorequests,
//         isLoading,
//         isSuccess,
//         isError,
//         error
//     } = useGetPTORequestsQuery();

//     let content;

//     if (isLoading) content = <p>Loading...</p> // do cool spinning component
    
//     if (isError) {
//         content = <p className={isError ? "errmsg" : "offscreen"}>{error?.data?.message}</p>
//     }
    
//     if (isSuccess) {
//         // destructure ids from ptorequest data
//         const { ids } = ptorequests;

//         const tableContent = ids?.length
//             ? ids.map(ptorequestId => <PTORequest key={ptorequestId} ptorequestId={ptorequestId} />)
//             : null;

//         content = (
//             <table className="table table--users">
//                 <thead className="table__thead">
//                     <tr>
//                         <th scope="col" className="table__th ptorequest__status">Username</th>
//                         <th scope="col" className="table__th ptorequest__created">Created</th>
//                         <th scope="col" className="table__th ptorequest__updated">Updated</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {tableContent}
//                 </tbody>
//             </table>
//         )
//     };

//     return content;
// }

// export default PTORequestsList;