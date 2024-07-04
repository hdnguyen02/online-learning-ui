import { useEffect, useState } from "react"
import { fetchData, showToastError } from "../global"
import { ToastContainer } from "react-toastify"
import { Link } from "react-router-dom"


export default function GlobalGroups() {







    const [globalGroups, setGlobalGroups] = useState()

    async function getGlobalGroups() {
        try {
            const subUrl = '/global/groups'
            const { data } = await fetchData(subUrl, 'GET')
            setGlobalGroups(data)
        }
        catch (error) {
            showToastError(error.message)
        }
    }

    useEffect(() => {
        getGlobalGroups()
    }, [])


    return globalGroups && <>
        <h3 className="uppercase text-sm text-gray-700 mb-8">Nhóm học tập</h3>

        {/*  danh sách thành viên */}
        <div className="mb-12 grid grid-cols-2 gap-12">
            {
                globalGroups.map((globalGroup, index) => <div key={index} className="bg-[#F0F6F6] p-6 rounded">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-4">
                            <div className='rounded-full h-10 w-10 overflow-hidden cursor-pointer'>
                                <img src={globalGroup.owner.avatar ? globalGroup.owner.avatar : '/user.png'} loading="lazy" className='w-full h-full' alt='' />
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <div className="flex gap-x-2 items-center">
                                    <span className="font-bold text-xl">{globalGroup.name}</span>
                                    <span>({globalGroup.quantityMembers} thành viên)</span>
                                </div>

                                <div className="flex items-center gap-x-3">
                                    <span className="font-light text-sm">{globalGroup.owner.firstName + " " + globalGroup.owner.lastName}</span>
                                   
                                    {/* <span className="text-xs bg-gray-300 p-1 rounded-lg">Giáo viên</span> */}

                                    {/* Hiển thị danh sách role của người dùng */}
                                    { 
                                        globalGroup.owner.roles.map((role, index) => {
                                            return <span key={index} className="lowercase text-xs bg-gray-300 p-1 rounded-lg">
                                                {role}
                                            </span>
                                        })
                                    }

                                </div>
                            </div>
                        </div>
                        <div>
                            <Link to={`/groups/${globalGroup.id}`} className="flex items-center h-8 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 text-center">

                                <span className="ml-1">Chi tiết</span>


                            </Link>
                        </div>
                    </div>
                    <div className="mt-2 text-gray-700 text-sm text-ellipsis overflow-hidden whitespace-nowrap">{globalGroup.description}</div>
                </div>)
            }
        </div>

        <div>

        </div>





        <ToastContainer />
    </>
}   