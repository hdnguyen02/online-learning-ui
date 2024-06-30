
import React, { createContext, useState, useContext, useEffect } from 'react'
import useAuth from '../context/AuthContext'
import { fetchData } from '../global'


const DeckContext = createContext()

export const DeckProvider = ({ children }) => {
    const {auth} = useAuth()

    const [decks, setDecks] = useState(null)

    async function getDecks() { 
        const subUrl = '/decks'
        try { 
            const {data} = await fetchData(subUrl, 'GET')
            setDecks(data)
    }
        catch(error) { 
            console.log(error)
        }
    }

    useEffect(() => { 
        if (auth){ 
            getDecks()
        }
        else {
            setDecks(null)
        }
        
    }, [auth])

  const expose = {
    decks, getDecks
  }
  
  return (
    <DeckContext.Provider value={expose}>
      {children}
    </DeckContext.Provider>
  )
}

const useDeck = () => {
  return useContext(DeckContext)
}

export default useDeck