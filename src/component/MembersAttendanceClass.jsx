import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchData, showToastMessage, showToastError } from "../global"
import { ToastContainer } from "react-toastify"
import Empty from './Empty'

export default function MembersOwnerClass() {

  const [group, setGroup] = useState() // lấy group về thôi 
  const [userGroups, setUserGroups] = useState()


  const params = useParams();

  async function getMembers() {
    const subUrl = `/groups/${params.id}`
    try {
      const { data } = await fetchData(subUrl, "GET")
      console.log(data)
      setUserGroups(data.userGroups)

    } catch ({ message }) {
      showToastError(message)
    }
  }

  async function handleDeleteUserGroup(idUserGroup) {
    const subUrl = `/user-groups/${idUserGroup}`
    try {
      const { message } = await fetchData(subUrl, 'DELETE')
      await getMembers()
      showToastMessage(message)
    }
    catch ({ message }) {
      showToastError(message)
    }
  }

  useEffect(() => {
    getMembers()
  }, []);

  return (
    userGroups && (
      <div>
        {userGroups.length != 0 ? (
          <div className="mb-12 grid grid-cols-2 gap-12">
            {
              userGroups.map((userGroup, index) => <div key={index} className="bg-[#F0F6F6] p-6 rounded">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-x-4">
                    <div className='rounded-full h-10 w-10 overflow-hidden cursor-pointer'>
                      <img src={userGroup.avatar ? userGroup.avatar : '/user.png'} loading="lazy" className='w-full h-full' alt='' />
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <span className="font-medium">{userGroup.firstName + " " + userGroup.lastName}</span>

                      <div className="flex items-center gap-x-3">
                        <span className="font-light text-sm">{userGroup.email}</span>
                        {
                          userGroup.roles.map((role, index) => {
                            return <span key={index}>
                              <span className="lowercase text-xs bg-gray-300 p-1 rounded-lg">{role}</span>
                            </span>
                          })
                        }
                      </div>
                    </div>
                  </div>
                  {/* <div className="flex gap-x-2">
                    <button onClick={() => handleDeleteUserGroup(userGroup.id)} className="flex items-center gap-x-2 h-8 text-red-600 hover:text-white border border-red-500 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-200 font-medium rounded-lg text-sm px-3 text-center">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </div> */}
                </div>
              </div>)
            }
          </div>
        ) : (
          <Empty />
        )}
        <ToastContainer />
      </div>
    )
  );
}
