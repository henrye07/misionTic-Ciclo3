import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";


export default function LogIn() {
    const { loginWithRedirect } = useAuth0();
    return (
        <>
            {loginWithRedirect()}
        </>
    );
}
