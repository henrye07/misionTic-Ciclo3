import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import {routes} from '../routes'

export default function PrivateRoute({component:Component,...rest}) {
    const {isLoading,isAuthenticated}=useAuth0()
    return (
        <>
        {isLoading?
            <h1>Loading...</h1>:
            <Route {...rest}>{isAuthenticated?<Component />:<Redirect to={routes.login} />}</Route>}
        </>
    )
}
