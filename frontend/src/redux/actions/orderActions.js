import {types} from '../reducers/orderReducer'

export const itemsCreate=(data)=>{
    return{
        type:types.addNewItems,
        payload:data
}}
export const productInfoCreate=(data)=>{
    return{
        type:types.addNewProducts,
        payload:data
}}

export const salesCreate=(data)=>{
    return{
        type:types.addNewSale,
        payload:data
}}

export const itemsDelete=(id)=>{
    return{
        type:types.deleteItem,
        payload:id
}}

export const itemsError=(ErrorMsg)=>{
    return{
        type:types.showErrors ,
        payload:ErrorMsg
}}

export const saleReset=()=>{
    return{
        type:types.resetSale,
}}