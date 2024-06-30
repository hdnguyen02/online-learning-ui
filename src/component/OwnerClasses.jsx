import { useEffect, useState } from "react"
import { fetchData, showToastMessage } from "../global"
import { Link } from "react-router-dom"
import Modal from 'react-modal'
import useAuth from "../context/AuthContext"


export default function OwnerClasses() {


    const { auth } = useAuth()

    const [ownerClasses, setOwnerClasses] = useState(false)



    async function handlePayment() {
        // số tiền 299k => gửi trả về lại cho người dùng. 
        const email = auth.email
        const subUrl = `/payment?email=${email}`
        try {
            const { data } = await fetchData(subUrl, 'GET')
            const urlPayment = data
            window.open(urlPayment, '_blank');

        }
        catch (error) {
            console.log(error.message)
        }

    }
    async function getOwnerClass() {
        const subUrl = `/groups/owner`
        try {
            const response = await fetchData(subUrl, 'GET')
            setOwnerClasses(response.data)
        }
        catch (error) {
            console.log(error.code + ' ' + error.message)
        }
    }

    async function handleDeleteClass(id) {

        const subUrl = `/groups/${id}`
        await fetchData(subUrl, 'DELETE')
        getOwnerClass()
    }

    useEffect(() => {
        if (auth.roles.includes('TEACHER')) {
            getOwnerClass()
        }
    }, [])


    function renderUnlockedUser() {
        return <div className="flex items-center justify-center flex-col gap-y-3">
            <h1 className="text-3xl font-bold text-center">Online learning - Dành cho giáo viên</h1>

            <div className="flex justify-center">
                <button onClick={handlePayment} className='gap-x-2 flex items-center h-10 px-8 text-sm text-center rounded-md font-bold bg-yellow-400 sm:w-fit hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-200'>

                    <span className='text-sm'>Mua</span>
                    <i className="fa-solid fa-unlock"></i>
                </button>
            </div>

        </div>
    }

    if (auth.roles.includes('TEACHER')) {
        return ownerClasses && <div>
            {ownerClasses?.length != 0 ?
                (<table className="w-full text-sm text-left rtl:text-right text-gray-500 pb-8 border-separate border-spacing-0 border-spacing-y-4">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Tên
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Số thành viên
                            </th>
                            <th scope="col" className="px-6 py-3">

                            </th>
                            <th className='text-center'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {ownerClasses.map((ownerClass, index) => (
                            <tr key={index} className="mt-4 bg-gray-100">
                                <td scope="row" className="px-6 py-5 text-sm uppercase font-bold text-gray-900 whitespace-nowrap rounded-tl-lg rounded-bl-lg">
                                    {ownerClass.name}
                                </td>
                                <td className="px-6 py-5 font-medium">
                                    {ownerClass.quantity} thành viên
                                </td>
                                <td className="px-6 py-5">
                                    <Link to={'/groups/detail-owner/' + ownerClass.id + '/members'} className="text-blue-500">Chi tiết</Link>
                                </td>
                                {/* <td className="px-6 py-4">
                                <button onClick={(event) => handleEditClass(event, ownerClass.id)} className="underline text-blue-500">Hiệu chỉnh</button>
                            </td> */}
                                <td className='px-6 py-5 text-center rounded-tr-lg rounded-br-lg'>
                                    <button onClick={() => handleDeleteClass(ownerClass.id)}><i className="fa-regular fa-trash-can text-xl"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>) : (<div>
                    <span className='text-sm'>Bạn chưa tạo lớp nào</span>
                </div>)
            }

        </div>
    }
    else {
        return renderUnlockedUser()
    }



}