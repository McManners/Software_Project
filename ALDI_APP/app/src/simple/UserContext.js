import React, { useState, useContext } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthProvider';
const UserContext = React.createContext([{}, () => {}]);

let initialState = {};

const UserProvider = props => {
    const [state, setState] = useState(initialState);

    return (
        <UserContext.Provider value={[state, setState]}>
            { props.children }
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider };