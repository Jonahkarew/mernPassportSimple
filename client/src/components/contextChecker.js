import React, { useContext } from 'react'
import { UserContext } from '../context/authContext';
import { login } from './login'

function ContextChecker() {
    const { user, setUser } = useContext(UserContext)


    return (
        <div>
            {/* <pre>{JSON.stringify(user)}</pre> */}
            {user ?
                <button onClick={()=> {
                    setUser(null)
                }}>
                    logout
                </button>
                :
                <button onClick={async () => {
                    const user = await login();
                    setUser(user)
                }}>login</button>}

        </div>
    )
}

export default ContextChecker
