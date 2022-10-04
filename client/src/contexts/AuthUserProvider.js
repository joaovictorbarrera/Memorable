import React, { useCallback, useContext } from 'react'
import useUser from "../hooks/useUser"
import signUserOut from '../services/signUserOut'

const LoggedUserContext = React.createContext()
const SignOutContext = React.createContext()
const RefreshLoggedUserStatus = React.createContext()

export function useLoggedUser() {
    return useContext(LoggedUserContext)
}

export function useSignOut() {
    return useContext(SignOutContext)
}

export function useRefreshLoggedUserStatus() {
    return useContext(RefreshLoggedUserStatus)
}

function AuthUserProvider({children}) {
    const {user, refreshUser} = useUser()

    const signOut = useCallback(() => {
        signUserOut().then(refreshUser)
    }, [])

    return (
        <LoggedUserContext.Provider value={user}>
            <SignOutContext.Provider value={signOut}>
                <RefreshLoggedUserStatus.Provider value={refreshUser}>
                    {children}
                </RefreshLoggedUserStatus.Provider>
            </SignOutContext.Provider>
        </LoggedUserContext.Provider>
    )
}

export default AuthUserProvider