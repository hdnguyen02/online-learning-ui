import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchData, showToastError, showToastMessage } from '../global'
import { ToastContainer } from "react-toastify"
import MembersGroup from "../component/MembersGroup"
import { commonformatDistanceToNow } from "../helper/common"

export default function DetailGlobalClass() {

    const [group, setGroup] = useState()
    const params = useParams()

    async function getGroup() {
        const subUrl = '/groups/' + params.id
        try {
            const { data } = await fetchData(subUrl, 'GET')
            setGroup(data)
        }
        catch (error) {
            showToastError(error.message)
        }
    }

    async function handleJoinGroup() {
        try {
            let idGroup = group.id
            const subUrl = `/groups/${idGroup}/join`
            const { message } = await fetchData(subUrl, 'POST')

            // load lại 
            getGroup()
            showToastMessage(message)
        }
        catch (error) {
            showToastError(error.message)
        }
    }

    useEffect(() => {
        getGroup()
    }, [])

    return group && <>


        {/* Chi tiết lớp học */}


        <h3 className="font-medium text-2xl text-[#282E3E]">{group.name}</h3>


        <div className="mt-8 flex justify-between items-center">
            {/* decs group */}

            <div className="flex items-center gap-x-3">
                
                <div onClick={() => setShowProfile(!showProfile)} className='h-10 w-10 rounded-full overflow-hidden cursor-pointer'>
                    <img src={group.owner.avatar ? group.owner.avatar : '/user.png'} loading="lazy" className='w-full h-full' alt='' />
                </div>
                <div>
                    <span className="text-gray-400 text-xs font-light">Created by</span>
                    <div className="flex gap-x-2 items-center">
                        <span className="font-medium">{group.owner.firstName + " " + group.owner.lastName}</span>
                        {/* roles */}
                        { 
                            group.owner.roles.map((role, index) => { 
                            return <span className="lowercase text-xs bg-gray-300 p-1 rounded-lg">
                                    {role}
                                </span>
                            })
                        }
                        {/* <span className="text-xs bg-[#EDEFFF] p-1 rounded-lg">Giáo viên</span> */}
                    </div>
                    <span className="text-gray-400 text-xs font-light">{commonformatDistanceToNow(group.created)}</span>

                </div>
                <div>
                    
                </div>

            </div>
            <div>
                <button type="button" className="h-10 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 text-center me-2 mb-2">
                    <i className="fa-regular fa-share-from-square"></i>
                    <span className="ml-1">Share</span>


                </button>
                <button onClick={handleJoinGroup} type="button" className="w-22  text-white bg-[#1D4ED8] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                    Join
                </button>
            </div>
            {/* action */}

        </div>
        <p className="mt-8  text-sm text-[#282E3E]">{group.description}</p>


        {/* Thành viên và chi tiết */}

        <div className="mt-8 flex justify-between gap-x-12">
            <div className="w-full">
                <MembersGroup members={group.userGroups} />
            </div>

            <div>
                <div className="flex flex-col gap-y-3">
                    <span className="text-sm uppercase text-gray-700">Invitation link</span>
                    <div className="flex gap-x-3 items-center">
                        <span className="text-blue-600 bg-[#F0F6F6] rounded-lg px-2 py-2">
                            onlinelearning.com/invite/a2g2d
                        </span>
                        <img src="/copy.png" className="w-6 h-6" alt="" />
                    </div>
                    <span className="mt-2 text-sm uppercase text-gray-700">Group detail</span>
                    <div className="flex gap-x-3 items-center">
                        <span className="w-4"><i class="fa-solid fa-users"></i></span>
                        
                        <span>{group.quantityMembers} member</span>
                    </div>
                    <div className="flex gap-x-3 items-center">
                        <span className="w-4"><i class="fa-solid fa-folder"></i></span>
                        
                        <span>{group.quantityCommonDecks} học phần</span>
                    </div>
                    <div className="flex gap-x-3 items-center">
                        <span className="w-4 pl-[1px]"><i class="fa-solid fa-file"></i></span>
                        
                        <span>{group.quantityAssignments} assignment</span>
                    </div>
                   
                </div>
            </div>
        </div>


        <ToastContainer />
    </>
}