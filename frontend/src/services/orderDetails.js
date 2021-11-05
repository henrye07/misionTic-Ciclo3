import axios from "axios";
import { apiOrderDetails,apiSales } from "../routes";

export const orderAddService=async dataOrder=>{
    const {data}=await axios.post(apiOrderDetails.createOrder,dataOrder)
    return data
}
export const saleAddService=async (newDataSale)=>{
    const {data}=await axios.post(apiSales.createSale,newDataSale)
    return data
}

export const orderDeleteService=async id=>{
    const {data}=await axios.delete(`${apiOrderDetails.deleteOrder}/${id}`)
    return data
}