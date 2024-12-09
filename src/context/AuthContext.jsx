
import { createContext, useState, useContext, useEffect } from 'react'
import { fetchData } from '../global'

const AuthContext = createContext(); 

export const AuthProvider = ({ children }) => {


  const [auth, setAuth] = useState(false);

  useEffect(() => { 
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) { 
      checkAuth();
    }
    else { 
      setAuth(null);
    }
  }, []);

 
  async function signOut() { 
    localStorage.clear();
    setAuth(false);
  }

  async function checkAuth() {
    const subUrl = '/users';
    try {
      const {data: rawData} = await fetchData(subUrl, 'GET');
      setAuth(rawData); 
    }
    catch (error) {
      setAuth(null);
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
  return useContext(AuthContext);
}


export default useAuth;