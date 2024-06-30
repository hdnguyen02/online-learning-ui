import { useState, useEffect  } from "react"
import { Link } from "react-router-dom"
import { fetchData } from "../global"
export default function AttendanceClass() { 
     const [attendanceClasses,  setAttendanceClasses] = useState() 


    
    async function getAttendanceClass() { 
        const subUrl = `/groups/attendance`
        try { 
            const response = await fetchData(subUrl, 'GET')
            setAttendanceClasses(response.data)
        }
        catch(error){ 
            console.log(error.code + ' ' + error.message)
        }
    }


    useEffect(() => {
        getAttendanceClass()
    }, [])



    
    return (attendanceClasses && <div>
        {attendanceClasses.length != 0 ?
        (<table className="w-full text-sm text-left rtl:text-right text-gray-500 pb-8 border-separate border-spacing-0 border-spacing-y-4">
           
           {/* <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Tên
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Số thành viên
                                </th>
                                <th scope="col" className="px-6 py-3">
                                </th>                       
                            </tr>
                        </thead> */}
            <tbody>
                {attendanceClasses.map((attendanceClass, index) => (
                    // <tr key={attendanceClass.id} className= "mt-4 bg-gray-100">
                    //     <td scope="row" className="px-6 py-5 font-bold uppercase text-gray-700 whitespace-nowrap rounded-tl-lg rounded-bl-lg">
                    //         {attendanceClass.name}
                    //     </td>
                    //     <td className="px-6 py-5">
                    //         {attendanceClass.quantity} thành viên
                    //     </td>
                    //     <td className="px-6 py-5">
                    //         <Link to={'/groups/detail-attendance/' + attendanceClass.id + '/members'} className="underline text-blue-500">Chi tiết</Link>
                    //     </td>   
                    // </tr>
                     <tr key={index} className="mt-4 bg-gray-100">
                     <td scope="row" className="px-6 py-5 text-sm uppercase font-bold text-gray-900 whitespace-nowrap rounded-tl-lg rounded-bl-lg">
                         {attendanceClass.name}
                     </td>
                     <td className="px-6 py-5 font-medium">
                         {attendanceClass.quantity} thành viên
                     </td>
                     <td className="px-6 py-6">
                         <Link to={'/groups/detail-attendance/' + attendanceClass.id + '/members'} className="text-blue-500">Chi tiết</Link>
                     </td>
                     {/* <td className="px-6 py-4">
                         <button onClick={(event) => handleEditClass(event, ownerClass.id)} className="underline text-blue-500">Hiệu chỉnh</button>
                     </td> */}
                     {/* <td className='px-6 py-5 text-center rounded-tr-lg rounded-br-lg'>
                         <button onClick={() => handleDeleteClass(ownerClass.id)}><i className="fa-regular fa-trash-can text-xl"></i></button>
                     </td> */}
                 </tr>
                ))}

            </tbody>
        </table>) : (<div>
            <span className='text-sm'>Không có dữ liệu</span>
        </div>)
        
    }

    </div>)
}