import React, { Suspense, useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableProducts from '../components/TableProducts'
import { loadProducts } from '../redux/middleware/productsMiddleware';

export const Products=()=>{
    const { products} =useSelector(state => state.products)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(loadProducts())
    },[])
    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            <div>
                <TableProducts Data={products} />
            </div>
        </Suspense>
    )
}
