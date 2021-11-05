import axios from "axios";
import { apiUser } from "../routes";

export const userLoadService = async ()=>{
    const{data} = await axios.get(apiUser.users)
    return data
}

export const userAddOrFindService=async (dataUser)=>{
    const {data}=await axios.post(apiUser.createUser,dataUser)
    return data
}
export const userEditService=async (id,newDataUser)=>{
    const {data}=await axios.put(`${apiUser.editUser}/${id}`,newDataUser)
    return data
}

export const userDeleteService=async id=>{
    const {data}=await axios.delete(`${apiUser.deleteUser}/${id}`)
    return data
}
