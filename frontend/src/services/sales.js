import axios from "axios";
import { apiSales } from "../routes";

export const salesLoadService = async ()=>{
    const{data} = await axios.get(apiSales.sales)
    return data
}

export const saleEditService=async (id,newDataSale)=>{
    const {data}=await axios.patch(`${apiSales.editSale}/${id}`,newDataSale)
    return data
}

export const saleDeleteService=async id=>{
    const {data}=await axios.delete(`${apiSales.deleteSale}/${id}`)
    return data
}