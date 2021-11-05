import {types} from '../reducers/vendorsReducer'

export const showVendor=(vendor)=>{
    return{
        type:types.showVendors,
        payload:vendor
}}

export const vendorCreate=(data)=>{
    return{
        type:types.addNewVendor,
        payload:data
}}
export const vendorUpdate=(id,vendor)=>{
    return{
        type:types.updateVendor,
        payload:{id,vendor}
}}

export const vendorDelete=(id)=>{
    return{
        type:types.deleteVendor,
        payload:id
}}

export const vendorError=(ErrorMsg)=>{
    return{
        type:types.showErrors ,
        payload:ErrorMsg
}}