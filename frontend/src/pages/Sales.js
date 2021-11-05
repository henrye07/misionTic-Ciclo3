import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableSales from '../components/TableSales';
import { loadSales } from '../redux/middleware/salesMiddleware';

export const Sales=()=>{
    const { sales } =useSelector(state => state.sales)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(loadSales())
    },[])
    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            <div>
                <TableSales Data={sales} />
            </div>
        </Suspense>
    )
}
