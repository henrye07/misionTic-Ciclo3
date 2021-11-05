import { itemsCreate, salesCreate,itemsDelete,itemsError,productInfoCreate, saleReset} from "../actions/orderActions";
import{saleAddService} from '../../services/orderDetails'

export const addOrder=(content)=>{
    return async(dispatch)=>{
        return dispatch(itemsCreate(content))
}}
export const addProductInfo=(content)=>{
    return async(dispatch)=>{
        return dispatch(productInfoCreate(content))
}}

export const addSale=(content)=>{
    return async(dispatch)=>{
        const sale=await saleAddService(content)
        console.log(sale)
        if(sale.error){
            return dispatch(itemsError(sale.error));
        }
        return dispatch(salesCreate(sale.product))
}}

export const deleteItem=(id)=>{
    return async(dispatch)=>{
        return dispatch(itemsDelete(id))
}}

export const resetSale=()=>{
    return async(dispatch)=>{
        return dispatch(saleReset())
}}