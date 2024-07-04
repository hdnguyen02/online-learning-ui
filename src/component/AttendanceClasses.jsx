import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { fetchData, showToastError } from "../global"
import Empty from "./Empty"
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




    return (attendanceClasses && <div>
        {attendanceClasses.length != 0 ?
            (<table className="w-full text-sm text-left rtl:text-right text-gray-500 pb-8 border-separate border-spacing-0 border-spacing-y-4">


                <tbody>
                    {attendanceClasses.map((attendanceClass, index) => (
                      
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
                         
                        </tr>
                    ))}

                </tbody>
            </table>) : (<Empty/>)

        }

    </div>)
}