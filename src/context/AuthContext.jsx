
import React, { createContext, useState, useContext, useEffect } from 'react'
import { fetchData } from '../global'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {


  const [auth, setAuth] = useState(false)

  useEffect(() => { 
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) { 
      checkAuth()
    }
    else { 
      console.log("Not check Auth")
      setAuth(null)
    }
  }, [])

  // -> logout -> xóa token
  async function signOut() { 
    localStorage.clear()
    setAuth(false)
  }

  async function checkAuth() {
    console.log("checkAuth ...")
    const subUrl = '/users/info'
    try {
      const {data} = await fetchData(subUrl, 'GET')
      setAuth(data)
    }
    catch (error) {
      setAuth(null)
    }
  }


  

  const expose = {
    auth, checkAuth, signOut, setAuth
  }
  

  
  return (
    <AuthContext.Provider value={expose}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  return useContext(AuthContext)
}

export default useAuth