import React, { useCallback, useContext } from 'react'
import useUser, { LoggedUser } from "../hooks/useUser"
import signUserOut from '../services/signUserOut'

const LoggedUserContext = React.createContext<LoggedUser["user"] | undefined | null>(undefined)
const SignOutContext = React.createContext<() => void>(() => {})
const RefreshLoggedUserStatus = React.createContext<() => void>(() => {})

export function useLoggedUser() {
    return useContext(LoggedUserContext)
}

export function useSignOut() {
    return useContext(SignOutContext)
}

export function useRefreshLoggedUserStatus() {
    return useContext(RefreshLoggedUserStatus)
}

interface Props {
    children: JSX.Element[] | JSX.Element
}

function AuthUserProvider({children}: Props) {
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