import {types} from '../reducers/salesReducer'

export const showSales=(sales)=>{
    return{
        type:types.showSales,
        payload:sales
}}


export const saleUpdate=(id,sale)=>{
    return{
        type:types.updateSale,
        payload:{id,sale}
}}

export const saleDelete=(id)=>{
    return{
        type:types.deleteSale,
        payload:id
}}

export const saleError=(ErrorMsg)=>{
    return{
        type:types.showErrors ,
        payload:ErrorMsg
}}