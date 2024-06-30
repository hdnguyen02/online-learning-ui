

// load bộ thẻ + lớp học của bạn > gặp phải vấn đề => 


import React, { createContext, useState, useContext, useEffect } from 'react'
import { fetchData } from '../global'
import useAuth from './AuthContext'

const YourLiblaryContext = createContext()

export const YourLiblaryProvider = ({ children }) => {

    const { auth, signOut } = useAuth()     

    
    const [decks, setDecks] = useState() // trong này chỉ chứa.   
    // load deck vào trong này. 
    // load lớp học của người dùng + lớp học người dùng tham gia => tí làm sau => làm tính năng bộ thẻ chia sẻ 


    // thêm deck vào bộ thẻ 

    function addDeck(deck) {
        console.log("hàm được gọi")
        setDecks([...decks, deck])
    }


    const expose = {
        decks, addDeck
    }

    async function getDecks() {
        
        
        try {
            const subUrl = `/decks`
            const {data} = await fetchData(subUrl, 'GET')
            setDecks(data)
        }
        catch (error) {
            console.log(error)
        }
    }


    // load bộ thẻ. 


    useEffect(() => {
        if (!auth) return 
        getDecks() 
    }, [auth])


    // load dữ liệu sau khi đã đăng nhập => cập nhập dữ liệu trong này 



    return (
        <YourLiblaryContext.Provider value={expose}>
            {children}
        </YourLiblaryContext.Provider>
    )
}

const useYourLiblary = () => {
    return useContext(YourLiblaryContext)
}

export default useYourLiblary