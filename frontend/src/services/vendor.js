import axios from "axios";
import { apiVendor } from "../routes";

export const vendorLoadService = async ()=>{
    const{data} = await axios.get(apiVendor.vendors)
    return data
}
export const vendorAddService=async dataVendor=>{
    const {data}=await axios.post(apiVendor.createVendor,dataVendor)
    return data
}
export const vendorEditService=async (id,newDataVendor)=>{
    const {data}=await axios.put(`${apiVendor.editVendors}/${id}`,newDataVendor)
    return data
}

export const vendorDeleteService=async id=>{
    const {data}=await axios.delete(`${apiVendor.deleteVendors}/${id}`)
    return data
}
