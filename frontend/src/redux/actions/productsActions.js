import {types} from '../reducers/productReducer'

export const showProducts=(products)=>{
    return{
        type:types.showProducts,
        payload:products
}}

export const productCreate=(data)=>{
    return{
        type:types.addNewProduct,
        payload:data
}}
export const productUpdate=(id,product)=>{
    return{
        type:types.updateProduct,
        payload:{id,product}
}}

export const productDelete=(id)=>{
    return{
        type:types.deleteProduct,
        payload:id
}}

export const productError=(ErrorMsg)=>{
    return{
        type:types.showErrors ,
        payload:ErrorMsg
}}

export const showProductsEnable=(products)=>{
    return{
        type:types.enableProducts,
        payload:products
    }
}