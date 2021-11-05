import axios from "axios";
import { apiProduct } from "../routes";

export const productsLoadService = async ()=>{
    const{data} = await axios.get(apiProduct.products)
    return data
}
export const productAddService=async dataProduct=>{
    const {data}=await axios.post(apiProduct.createProduct,dataProduct)
    return data
}
export const productEditService=async (id,newDataProduct)=>{
    const {data}=await axios.put(`${apiProduct.editProduct}/${id}`,newDataProduct)
    return data
}

export const productDeleteService=async id=>{
    const {data}=await axios.delete(`${apiProduct.deleteProduct}/${id}`)
    return data
}
export const productsEnable = async ()=>{
    const{data} = await axios.get(apiProduct.enableProduct)
    return data
}
