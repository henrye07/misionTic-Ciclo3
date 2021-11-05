import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableUsers from '../components/TableUsers'
import { loadUsers } from '../redux/middleware/userMiddleware';

export const Users=()=>{
    const { users } = useSelector(state => state.users)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(loadUsers())
    },[])
    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            <div>
                <TableUsers Data={users} />
            </div>
        </Suspense>
    )
}
