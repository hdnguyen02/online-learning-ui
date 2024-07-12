

import { useParams } from "react-router-dom"
import { fetchData, showToastMessage, showToastError } from "../global"
import { ToastContainer } from "react-toastify"
import { useEffect, useState } from "react"

export default function User() { 

    const params = useParams()
    const [user, setUser] = useState() 
    console.log(params)

    async function getUser(email) { 
        // ham get thong tin user 
        const {data} = await fetchData('/users/info?email=' + email, 'GET') 
        console.log(data)
        return data
    }


    useEffect(() => {
        getUser(params.email)
    }, [])


    return <div className='mx-4 md:mx-48 mt-28'>
        {/* Chi tiết người dùng */}

        Thong tin nguoi dung


        <div>
            <img src="" alt="" />
        </div>
        <ToastContainer/>

    </div>
}