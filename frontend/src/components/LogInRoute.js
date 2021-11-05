import React, { useEffect } from 'react'
import {Route, Redirect} from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import {routes} from '../routes'
import { useDispatch } from 'react-redux';
import { LogInUser } from '../redux/middleware/userMiddleware';

export default function LogInRoute({component:Component,...rest}) {
    const {isLoading,isAuthenticated,user}=useAuth0()
    const dispatch = useDispatch()
    useEffect(()=>{
        const fecthUser=async()=>{
            await dispatch(LogInUser(user))
            }
        if(isAuthenticated){
            fecthUser()
        }
    },[isAuthenticated])
    return (
        <>
        {isLoading?
            <h1>Loading...</h1>:
            <Route {...rest}>{isAuthenticated?<Component />:<Redirect to={routes.login} />}</Route>
            }
        </>
    )
}
