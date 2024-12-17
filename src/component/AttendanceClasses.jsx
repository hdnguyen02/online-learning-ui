import { useState, useEffect } from "react"; 
import { Link } from "react-router-dom"; 
import { fetchData, showToastError } from "../global"; 
import Empty from "./Empty"; 
import { customFormatDistanceToNow } from "../global";

export default function AttendanceClass() {
    const [attendanceClasses, setAttendanceClasses] = useState()



    async function getAttendanceClass() {
        const subUrl = `/groups/attendance`
        try {
            const response = await fetchData(subUrl, 'GET')
            setAttendanceClasses(response.data)
        }
        catch ({ message }) {
            showToastError(message)
        }
    }


    useEffect(() => {
        getAttendanceClass()
    }, [])




    // return (attendanceClasses && <div>

    //     {/*  */}
    //     {attendanceClasses?.length != 0 ?
    //             (
    //                 <div className="mb-12 grid grid-cols-2 gap-8">
    //                     {
    //                         attendanceClasses.map((attendanceClass, index) => <div key={index} className="bg-[#F0F6F6] p-6 rounded">
    //                             <div className="flex items-center justify-between">
    //                                 <div className="flex items-center gap-x-4">
    //                                     <div className='rounded-full h-10 w-10 overflow-hidden cursor-pointer'>
    //                                         <img src={attendanceClass.owner.avatar ? attendanceClass.owner.avatar : '/user.png'} loading="lazy" className='w-full h-full' alt='' />
    //                                     </div>
    //                                     <div className="flex flex-col gap-y-2">
    //                                         <div className="flex gap-x-2 items-center">
    //                                             <span className="font-bold text-xl">{attendanceClass.name}</span>
    //                                             <span>({attendanceClass.quantityMembers} member)</span>
    //                                         </div>

    //                                         <div className="flex items-center gap-x-3">
    //                                             <span className="font-light text-sm">{attendanceClass.owner.firstName + " " + attendanceClass.owner.lastName}</span>
    //                                             {/* <span className="text-xs bg-gray-300 p-1 rounded-lg">Giáo viên</span> */}
    //                                             {
    //                                                 attendanceClass.owner.roles.map((role, index) => {
    //                                                     return <span key={index}>
    //                                                         <span className="lowercase text-xs bg-gray-300 p-1 rounded-lg">{role}</span>
    //                                                     </span>
    //                                                 })
    //                                             }
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                                 <div className="flex gap-x-2">

    //                                     {/* <button onClick={() => handleDeleteGroup(attendanceClass.id)} className="flex items-center gap-x-2 h-8 text-red-600 hover:text-white border border-red-500 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-200 font-medium rounded-lg text-sm px-3 text-center">
    //                                         <i className="fa-solid fa-trash"></i>
    //                                     </button>
    //                                     <button
    //                                         onClick={() => handleShowModalEditGroup(attendanceClass.id)}
    //                                         className="flex items-center h-8 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 text-center">
    //                                         <i className="fa-solid fa-pen"></i>
    //                                     </button> */}
    //                                     <Link to={'/groups/detail-attendance/' + attendanceClass.id + '/members'} className="flex items-center h-8 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 text-center">
    //                                         <span className="ml-1">Detail</span>
    //                                     </Link>
    //                                 </div>
    //                             </div>
    //                             <div className="mt-2 text-gray-700 text-sm text-ellipsis overflow-hidden whitespace-nowrap">{attendanceClass.description}</div>
    //                         </div>)
    //                     }
    //                 </div>
    //             ) : (<Empty />)
    //         }

    //     {/* {attendanceClasses.length != 0 ?
    //         (<table className="w-full text-sm text-left rtl:text-right text-gray-500 pb-8 border-separate border-spacing-0 border-spacing-y-4">
    //             <tbody>
    //                 {attendanceClasses.map((attendanceClass, index) => (
                      
    //                     <tr key={index} className="mt-4 bg-gray-100">
    //                         <td scope="row" className="px-6 py-5 text-sm uppercase font-bold text-gray-900 whitespace-nowrap rounded-tl-lg rounded-bl-lg">
    //                             {attendanceClass.name}
    //                         </td>
    //                         <td className="px-6 py-5 font-medium">
    //                             {attendanceClass.quantity} thành viên
    //                         </td>
    //                         <td className="px-6 py-6">
    //                             <Link to={'/groups/detail-attendance/' + attendanceClass.id + '/members'} className="text-blue-500">Chi tiết</Link>
    //                         </td>
                         
    //                     </tr>
    //                 ))}

    //             </tbody>
    //         </table>) : (<Empty/>)
    //     } */}

    // </div>)

    return attendanceClasses && <div>
    
                {attendanceClasses?.length !== 0 ? (
                    <div className="mb-8 grid grid-cols-1 gap-8">
                        {attendanceClasses.map((attendanceClass, index) => (
    
    
                            <div key={index} className=" bg-white dark:bg-[#2E3856] dark:border-none shadow flex justify-between gap-x-6 p-5 border rounded-lg">
                                <div className="flex min-w-0 gap-x-4">
                                    <img
                                        className="h-12 w-12 flex-none rounded-full bg-gray-50"
                                        src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt=""
                                    />
                                    <div className="min-w-0 flex-auto">
                                        <p className="text-sm font-semibold leading-6 text-gray-800 dark:text-white">
                                            {attendanceClass.name}
                                        </p>
                                        {/* <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                    {ownerClass.owner.email}
                                </p> */}
                                        <span className="text-gray-600 dark:text-gray-200 text-sm">
                                            {customFormatDistanceToNow(attendanceClass.createdDate)}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-x-2 items-center">
                                    {/* <button >
                                    <img
                                        src="/src/assets/image/delete.png"
                                        className="w-4 h-4"
                                        alt=""
                                    />
                                </button> */}
    
                                  
                                    <Link
                                        to={'/groups/detail-attendance/' + attendanceClass.id + '/members'}
                                        className="rounded-md bg-blue-800 py-1.5 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                                    >
                                        Detail
                                    </Link>
    
    
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <Empty />
                )}
            </div>



}