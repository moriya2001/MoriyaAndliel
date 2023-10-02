import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';

// const getUser = () => JSON.parse(localStorage['user']);
const getUser = () => JSON.parse(localStorage['user'] ?? null);

/**
 * prevent authentication routes to be rendered
 * @returns {JSX.Element}
 * @constructor
 */
export const AuthenticationRoutes = () => {
    return (
        <>
           {!getUser() ? <Outlet/> : <Navigate to="/"/>};
        </>
    )
}
/**
 * protect routes that need login
 * @returns {JSX.Element}
 * @constructor
 */
export const PrivateRoutes = () => {
    return (
        <>
                    {getUser() ? <Outlet/> : <Navigate to="/login"/>};
        </>
    )
}
/**
 * protect admin routes
 * @returns {JSX.Element}
 * @constructor
 */
export const AdminSecurity = () => {
    return (
        <>
{console.log(getUser())}
            {getUser().Status ?<Navigate to="/homeUser"/> : <Outlet/> };
        </>
    )
}



