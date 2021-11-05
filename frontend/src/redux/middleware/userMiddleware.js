import { userAddOrFindService, userDeleteService, userEditService, userLoadService } from "../../services/user";
import { userLogin,showUsers, userDelete, userError, userUpdate } from "../actions/userActions";
export const loadUsers=()=> async(dispatch)=>{
    const users=await userLoadService()
    if(users.error){
        return dispatch(userError(users.error));
    }
    return dispatch(showUsers(users))
}

export const editUser=(id,content)=>{ 
    return async(dispatch)=>{
        const user=await userEditService(id,content)
        if(user.error){
            return dispatch(userError(user.error));
        }
        return dispatch(userUpdate(id,content))
}}

export const deleteUser=(id)=>{
    return async(dispatch)=>{
        const user=await userDeleteService(id)
        if(user.error){
            return dispatch(userError(user.error));
        }
        return dispatch(userDelete(id))
}}

export const LogInUser=(userData)=>{
    return async(dispatch)=>{
        const {email,name}=userData
        const {user}=await userAddOrFindService({email,name})
        return dispatch(userLogin(user))
}}