import { useAuth0 } from "@auth0/auth0-react"
import { createContext} from "react"

export const AuthContext=createContext()

export default function AuthProvider({children}) {
    const {logout}=useAuth0()
    const contextValue={
        logOut(){
            localStorage.removeItem('TOKEN')
            logout()
        }
    }
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}
