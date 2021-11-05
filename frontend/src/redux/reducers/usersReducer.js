export const types={
    userLogin:'user Log In',
    deleteUser:'delete user',
    updateUser:'edit user',
    showUsers:'show users',
    showErrors:'Error'
}
const initialState={
    userInlet:{},
    users:[],
    errorMessage:null
}

export const usersReducer = (state=initialState,{type,payload}) => {
    switch (type) {
        case types.userLogin:
            return {...state,userInlet:payload}
        case types.showUsers:
            return {...state,users:payload}
        case types.updateUser:
            const userID=state.users.find(user=>user.id===payload.id)
            for (const key in payload.user) {
                userID[key]=payload.user[key]
            }
            return {...state,users:state.users.map(user=>
                user.id===userID.id
                ?userID
                :user
            )}
        case types.deleteUser:
            return {...state,users:state.users.filter(user=>user.id!==payload)}
        case types.showErrors:
            return {...state,errorMessage:payload}
        default:
            return state;
    }
}

