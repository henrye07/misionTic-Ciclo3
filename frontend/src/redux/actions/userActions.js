import {types} from '../reducers/usersReducer'

export const showUsers=(users)=>{
    return{
        type:types.showUsers,
        payload:users
}}

export const userUpdate=(id,user)=>{
    return{
        type:types.updateUser,
        payload:{id,user}
}}

export const userDelete=(id)=>{
    return{
        type:types.deleteUser,
        payload:id
}}

export const userError=(ErrorMsg)=>{
    return{
        type:types.showErrors ,
        payload:ErrorMsg
}}

export const userLogin=(userData)=>{
    return{
        type:types.userLogin,
        payload:userData
}}
