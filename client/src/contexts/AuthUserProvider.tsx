import React, { useCallback, useContext } from 'react'
import useUser from "../hooks/useUser"
import signUserOut from '../services/signUserOut'
import User from '../interfaces/User'

interface AuthUserContext {
    loggedUser: User | undefined | null,
    signOut: () => void,
    refreshLoggedUser: () => void
}

const AuthContext = React.createContext<AuthUserContext>({loggedUser: undefined, signOut: () => {}, refreshLoggedUser: () => {}})

export function useAuth() {
    return useContext(AuthContext)
}
interface Props {
    children: JSX.Element[] | JSX.Element
}

function AuthUserProvider({children}: Props) {
    const { user, refetch: refreshUser } = useUser()

    const signOut = useCallback(() => {
        signUserOut().then(() => refreshUser())
    }, [])

    return (
        <AuthContext.Provider value={{loggedUser: user, signOut: signOut, refreshLoggedUser: refreshUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthUserProvider
