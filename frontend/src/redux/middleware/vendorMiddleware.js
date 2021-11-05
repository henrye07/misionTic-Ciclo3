import { vendorCreate, vendorDelete, vendorError, vendorUpdate, showVendor } from "../actions/vendorActions";
import {vendorAddService, vendorDeleteService, vendorEditService, vendorLoadService } from '../../services/vendor'

export const loadVendors=()=> async(dispatch)=>{
    const vendors=await vendorLoadService()
    if(vendors.error){
        return dispatch(vendorError(vendors.error));
    }
    return dispatch(showVendor(vendors))
}

export const addVendor=(content)=>{
    return async(dispatch)=>{
        const vendor=await vendorAddService(content)
        console.log(vendor)
        if(vendor.error){
            return dispatch(vendorError(vendor.error));
        }
        return dispatch(vendorCreate(vendor.vendor))
}}

export const editVendor=(id,content)=>{ 
    return async(dispatch)=>{
        const vendor=await vendorEditService(id,content)
        if(vendor.error){
            return dispatch(vendorError(vendor.error));
        }
        return dispatch(vendorUpdate(id,content))
}}

export const deleteVendor=(id)=>{
    return async(dispatch)=>{
        const vendor=await vendorDeleteService(id)
        if(vendor.error){
            return dispatch(vendorError(vendor.error));
        }
        return dispatch(vendorDelete(id))
}}