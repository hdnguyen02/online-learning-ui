import { useState, useEffect } from "react"; 
import { Link } from "react-router-dom"; 
import { fetchData, showToastError, showToastMessage } from "../global"; 
import Empty from "./Empty"; 
import { customFormatDistanceToNow } from "../global";
import { ToastContainer } from "react-toastify";

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
    }, []); 

    const onOutGroup = async (id) => { 
        const subUrl = `/groups/${id}/out`; 
        try { 
            await fetchData(subUrl, 'POST');
            await getAttendanceClass();
            showToastMessage("Success"); 
        }
        catch(error) { 
            const {message} = error; 
            showToastError(message); 
        }
    }


    return attendanceClasses && <div>
                <ToastContainer/>
    
                {attendanceClasses?.length !== 0 ? (
                    <div className="mb-8 grid grid-cols-2 gap-8">
                        {attendanceClasses.map((attendanceClass, index) => (
    
    
                            <div key={index} className=" bg-white dark:bg-[#2E3856] dark:border-none shadow flex justify-between gap-x-6 p-5 border rounded-lg">
                                <div className="flex min-w-0 gap-x-4">
                                    {/* <img
                                        className="h-12 w-12 flex-none rounded-full bg-gray-50"
                                        src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt=""
                                    /> */}
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
                           

    
                                    <button onClick={() => onOutGroup(attendanceClass.id)} type="button" className="dark:border-white  dark:text-white dark:hover:bg-transparent bg-transparent hover:bg-blue-500 text-blue-700 text-sm hover:text-white py-1 px-4 border border-blue-500  rounded">
                                        Out
                                    </button>
                                  
                                    <Link
                                        to={'/groups/detail-attendance/' + attendanceClass.id + '/members'}
                                        className="rounded-md bg-blue-800 py-1 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
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