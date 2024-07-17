import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchData, showToastMessage, showToastError } from "../global"
import { ToastContainer } from "react-toastify"
import Empty from './Empty'
import Modal from 'react-modal'


export default function MembersOwnerClass() {

  const [userGroups, setUserGroups] = useState()

  // mời người dùng vào lớp
  const [emailInvite, setEmailInvite] = useState()
  const [isOpenModalInviteUser, setIsOpenModalInviteUser] = useState(false)



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
async function handleInviteUser(event) { 
  event.preventDefault()

  const id = params.id // idGroup 
  const subUrl = `/groups/${id}/invite?email-user=${emailInvite}`

  try {
    await fetchData(subUrl, 'POST')
    showToastMessage('Gửi lời mời thành công')
  }
  catch(error) {   
    showToastError(error.message)
  }
  finally { 
    setEmailInvite(null)
  }
}

  const stylesModalInviteUser = {
    content: {
      width: '600px',
      height: '280px',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      padding: '40px',
      borderRadius: '8px',
      backgroundColor: 'while',
      border: '0px',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
    },
  }

  useEffect(() => {
    getMembers()
  }, []);

  return (

    userGroups && (
      <div>


        <div className="flex justify-end">
          {location.pathname.includes("owner") && (
            <button className="mb-4">
              <img
                onClick={() => setIsOpenModalInviteUser(true)}
                src='/plus.png'
                className='w-9'
                alt=''
              />
            </button>

          )}
        </div>

        {/* Modal email người dùng */}
        <Modal
          isOpen={isOpenModalInviteUser}
          onRequestClose={() => setIsOpenModalInviteUser(false)}
          contentLabel='Custom Modal'
          style={stylesModalInviteUser}
        >
          <form onSubmit={handleInviteUser} className=''>
            <div className='flex justify-between items-center'>
              <span className='text-gray-800 text-lg font-bold'>Invite student</span>
              <button onClick={() => setIsOpenModalInviteUser(false)} type='button'>
                <img src='/close.png' className='w-5 h-5' alt='' />
              </button>
            </div>

            <hr className='my-4' />

            <div className='mt-6'>
              <div className='flex flex-col gap-y-2 w-full'>
                <label className='text-sm text-gray-600 font-bold' htmlFor=''>
                  Email
                </label>
                <input
                  value={emailInvite}
                  onChange={event => setEmailInvite(event.target.value)}
                  type='text'
                  className='h-10 px-4 rounded-lg'
                  required
                />
              </div>

              {/* <hr className='my-4' /> */}
              <div className='mt-4 flex justify-end items-center'>
                {/* checkbox public => công khai lớp hay không */}
                <button
                  type='submit'
                  className='h-10 w-full items-center gap-x-2 px-8 text-sm text-center text-white font-bold rounded-md bg-primary sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300'
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </Modal>

        {userGroups.length != 0 ? (
          <div className="mb-8 grid grid-cols-2 gap-8">
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
                  <div className="flex gap-x-2">
                    <button onClick={() => handleDeleteUserGroup(userGroup.id)} className="flex items-center gap-x-2 h-8 text-red-600 hover:text-white border border-red-500 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-200 font-medium rounded-lg text-sm px-3 text-center">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </div>
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
