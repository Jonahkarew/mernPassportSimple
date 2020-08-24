import React, { useState, useMemo, useEffect } from 'react';
import './App.css';
import axios from "axios"
import ContextChecker from './components/contextChecker'
import { UserContext } from "./context/authContext";


function App() {

  const [registerUsername, setRegisterUsername] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [loginUsername, setLoginUsername] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [data, setData] = useState(null)


  // context manipulation
  const [user, setUser] = useState(null)
  const value = useMemo(() => ({user, setUser}), [user, setUser])

  const register = () => {
    axios({
      method: "post",
      data: {
        username: registerUsername,
        password: registerPassword
      },
      withCredentials: true,
      url: "/register"
    }).then(res => console.log(res))
  }
  const login = () => {
    axios({
      method: "post",
      data: {
        username: loginUsername,
        password: loginPassword
      },
      withCredentials: true,
      url: "/login"
    }).then(res => {
      console.log(res)
    })
  }


  const getUser = () => {
    axios({
      method: "get",
      withCredentials: true,
      url: "/user"
    }).then(res => { 
      setData(res.data) 
      console.log(res.data)
    })
  }

  useEffect(()=> {
    getUser()
  }, [])





  return (
    <div className="App">


      <div>
        <h1>register</h1>
        <input placeholder="username" onChange={e => setRegisterUsername(e.target.value)} />
        <input placeholder="password" onChange={e => setRegisterPassword(e.target.value)} />
        <button onClick={register}>Submit</button>
      </div>
      <div>
        <h1>Login</h1>
        <input placeholder="username" onChange={e => setLoginUsername(e.target.value)} />
        <input placeholder="password" onChange={e => setLoginPassword(e.target.value)} />
        <button onClick={login}>Submit</button>
      </div>
      <div>
        <h1>getUser</h1>
        <button onClick={getUser}>Submit</button>
        {
          data ? <h1>welcome back {data.username}</h1> : null
        }
      </div>
      <UserContext.Provider value={value}>
        <ContextChecker />
      </UserContext.Provider>
       
    </div>
  );
}

export default App;
