import React, { Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TableOrderProducts from '../components/TableOrderProducts'
import { enableProducts } from '../redux/middleware/productsMiddleware'
import { loadVendors } from '../redux/middleware/vendorMiddleware'

export const Order=()=>{
    const {productsEnable }= useSelector(state => state.products)
    const { vendors } = useSelector(state => state.vendors)
    const dispatch=useDispatch()
    useEffect(() => {
        const LoadProductsAndVendors=async()=>{
            await dispatch(enableProducts())
            await dispatch(loadVendors())
        }
        LoadProductsAndVendors()
    }, [])
    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            <div>
                <TableOrderProducts Data={productsEnable} Vendors={vendors}/>
            </div>
        </Suspense>
    )
}
