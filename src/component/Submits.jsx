import { useEffect, useState } from "react"
import { fetchData } from "../global"
import { useParams } from "react-router-dom"
import Empty from "./Empty"
import { commonformatDistanceToNow } from "../helper/common"

export default function Submits() { 
    const params = useParams()
    
    const [assignment, setAssignment] = useState()
    
    const [urlPdf, setUrlPdf] = useState()
    async function getAssignment(){ 
        const subUrl = `/teacher/assignments/${params.idAssignment}`
        try {
            const response = await fetchData(subUrl, 'GET')
            setAssignment(response.data)
        }
        catch(error) { 
            console.log(error.message)
        }
    }   

    function handleChangeView(url) { 
        setUrlPdf(url)
    }

    useEffect(() => {
        getAssignment()
    }, [])

    return assignment?.submits.length ? (<div className="flex w-full gap-x-24">
        <div className="w-1/3">
        {
            assignment.submits.map((submit, index) => (
                <div onClick={() => handleChangeView(submit.url)} key={index} className=" flex-col cursor-pointer mb-8 shadow-md px-8 py-3 bg-gray-100 flex   justify-between">
               <span className="opacity-90">
                     {submit.user.email}
                   </span>
     
                 <span className="text-xs text-[#6D6E6E]">
                 Submitted { commonformatDistanceToNow(submit.time)}
                 </span>
               </div>)
            )
        }
        </div>
        <div className="w-full">
        <iframe className="w-full h-screen" src={urlPdf} title="Iframe Example"></iframe>
        </div>
    </div>): (<Empty/>)
}