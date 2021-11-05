import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableVendors from '../components/TableVendors';
import { loadVendors } from '../redux/middleware/vendorMiddleware';

export const Vendors=()=>{
    const { vendors } =  useSelector(state => state.vendors)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(loadVendors())
    },[])
    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            <div>
                <TableVendors Data={vendors} />
            </div>
        </Suspense>
    )
}
