import { useAuth0 } from '@auth0/auth0-react';

export const getAuth0Variables = () => useAuth0();

export const getAuth0User = () => {
    const { user } = useAuth0();

    return user;
}