// import {
//     createSelector,
//     createEntityAdapter
// } from '@reduxjs/toolkit';
// import { apiSlice } from '../../app/api/apiSplice';

// const ptorequestsAdapter = createEntityAdapter({
//     sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1: -1
// });

// const initialState = ptorequestsAdapter.getInitialState();

// export const ptorequestApiSlice = apiSlice.injectEndpoints({
//     endpoints: builder => ({
//         getPTORequests: builder.query({
//             query: () => '/ptorequests',
//             validateStatus: (response, result) => {
//                 return response.status === 200 && !result.isError
//             },
//             keepUnusedDataFor: 5,
//             transformResponse: responseData => {
//                 const loadedPTORequests = responseData.map(ptorequest => {
//                     ptorequest.id = ptorequest._id;
//                     return ptorequest;
//                 });
//                 return ptorequestsAdapter.setAll(initialState, loadedPTORequests)
//             },
//             providesTags: (result, error, arg) => {
//                 if (result?.ids) {
//                     return [
//                         { type: 'ptorequest', id: 'LIST' },
//                         ...result.ids.map(id => ({ type: 'ptorequest', id }))
//                     ]
//                 } else return [{ type: 'ptorequest', id: 'LIST' }];
//             }
//         }),
//         addNewPTORequest: builder.mutation({
//             query: ({ id }) => ({
//                 url: `/ptorequest`,
//                 method: 'POST',
//                 body: {
//                     ...initialPTORequestData,
//                 }
//             }),
//             invalidatesTags: (res, err, arg) => [
//                 { type: 'PTORequest', id: arg.id }
//                 // forces cache to update, ptorequest is invalidated so update
//             ]
//         }),
//         updatePTORequest: builder.mutation({
//             query: initialPTORequestData => ({
//                 url: `/ptorequest`,
//                 method: 'PATCH',
//                 body: {
//                     ...initialPTORequestData,
//                 }
//             }),
//             invalidatesTags: (res, err, arg) => [
//                 { type: 'User', id: arg.id }
//             ]
//         }),
//         deletePTORequest: builder.mutation({
//             query: ({ id }) => ({
//                 url: `/ptorequests`,
//                 method: 'DELETE',
//                 body: { id }
//             }),
//             invalidatesTags: (res, err, arg) => [
//                 { type: 'PTORequest', id: arg.id }
//             ]
//         }),
//     }),
// });

// export const {
//     useGetPTORequestsQuery,
//     useAddNewPTORequestMutation,
//     useUpdatePTORequestMutation,
//     useDeletePTORequestMutation,
// } = ptorequestsApiSlice;

// // returns the query result object
// export const selectPTORequestsResult = ptorequestApiSlice.endpoints.getPTORequests.select();

// // creates memoized selector
// const selectPTORequestsData = createSelector(
//     selectPTORequestsResult,
//     PTORequestsResult => PTORequestsResult.data // normalized state object with ids & entities
// );

// // getSelectors creates these selectors and we rename them with aliases using
// export const {
//     selectAll: selectAllPTORequests,
//     selectById: selectPTORequestsById,
//     selectIds: selectPTORequestIds
//     // pass in a selector that returns the ptorequests slice of state
// } = ptorequestsAdapter.getSelectors(state => selectPTORequestsData(state) ?? initialState);

// export default ptorequestApiSlice;