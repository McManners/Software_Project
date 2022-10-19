// import {
//     createSelector,
//     createEntityAdapter
// } from '@reduxjs/toolkit';
// import { apiSlice } from '../../app/api/apiSplice';

// const usersAdapter = createEntityAdapter({});

// const initialState = usersAdapter.getInitialState();

// export const usersApiSlice = apiSlice.injectEndpoints({
//     endpoints: builder => ({
//         getUsers: builder.query({
//             query: () => '/users',
//             validateStatus: (response, result) => {
//                 return response.status === 200 && !result.isError
//             },
//             keepUnusedDataFor: 5,
//             transformResponse: responseData => {
//                 const loadedUsers = responseData.map(user => {
//                     user.id = user._id;
//                     return user;
//                 });
//                 return usersAdapter.setAll(initialState, loadedUsers)
//             },
//             providesTags: (result, error, arg) => {
//                 if (result?.ids) {
//                     return [
//                         { type: 'User', id: 'LIST' },
//                         ...result.ids.map(id => ({ type: 'User', id }))
//                     ]
//                 } else return [{ 'User', id: 'LIST' }];
//             }
//         }),
//         addNewUser: builder.mutation({
//             query: ({ id }) => ({
//                 url: `/users`,
//                 method: 'POST',
//                 body: {
//                     ...initialUserData,
//                 }
//             }),
//             invalidatesTags: (res, err, arg) => [
//                 { type: 'User', id: arg.id }
//                 // forces cache to update, user is invalidated so update
//             ]
//         }),
//         updateUser: builder.mutation({
//             query: initialUserData => ({
//                 url: `/users`,
//                 method: 'PATCH',
//                 body: {
//                     ...initialUserData,
//                 }
//             }),
//             invalidatesTags: (res, err, arg) => [
//                 { type: 'User', id: arg.id }
//             ]
//         }),
//         deleteUser: builder.mutation({
//             query: ({ id }) => ({
//                 url: `/users`,
//                 method: 'DELETE',
//                 body: { id }
//             }),
//             invalidatesTags: (res, err, arg) => [
//                 { type: 'User', id: arg.id }
//             ]
//         }),
//     }),
// });

// export const {
//     useGetUsersQuery,
//     useAddNewUserMutation,
//     useUpdateUserMutation,
//     useDeleteUserMutation,
// } = usersApiSlice;

// // returns the query result object
// export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

// // creates memoized selector
// const selectUsersData = createSelector(
//     selectUsersResult,
//     usersResult => usersResult.data // normalized state object with ids & entities
// );

// // getSelectors creates these selectors and we rename them with aliases using
// export const {
//     selectAll: selectAllUsers,
//     selectById: selectUsersById,
//     selectIds: selectUserIds
//     // pass in a selector that returns the users slice of state
// } = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState);