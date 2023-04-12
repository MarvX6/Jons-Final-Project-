import React, { useContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import UserContext from './UserContext';

const AuthButton = () => {
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
    const { setUser } = useContext(UserContext);

useEffect(() => {
    if (isAuthenticated && user) {
        setUser(user);

    const storeUser = async () => {
        try {
            const response = await fetch('/api/storeUserData', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        }
    };
    storeUser();
    }
}, [isAuthenticated, user, setUser]);

return (
    <Button
        onClick={isAuthenticated ? logout : loginWithRedirect}
        isLogin={!isAuthenticated}
    >
    {isAuthenticated ? 'Logout' : 'Log In'}
    </Button>
);
};

const Button = styled.button`
background-color: transparent;
border: none;
font-size: 20px;
color: ${(props) => (props.isLogin ? 'blue' : 'red')};
margin-right: 10px;
&:hover {
    cursor: pointer;
}
`;

export default AuthButton;