import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchData, showToastMessage, showToastError, customFormatDistanceToNow } from "../global"
import { ToastContainer } from "react-toastify"
import Empty from './Empty'
import Modal from 'react-modal'
import { useTranslation } from "react-i18next"


export default function MembersOwnerClass() {

  const { t } = useTranslation(); 

  const [userGroups, setUserGroups] = useState();

  // mời người dùng vào lớp
  const [emailInvite, setEmailInvite] = useState();
  const [isOpenModalInviteUser, setIsOpenModalInviteUser] = useState(false);



  const params = useParams();

  async function getMembers() {
    const subUrl = `/groups/${params.id}`;
    try {
      const { data } = await fetchData(subUrl, "GET");
      console.log(data);
      setUserGroups(data.userGroups);

    } catch ({ message }) {
      showToastError(message);
    }
  }



  const onDeleteUserGroup = async () => { 
    const subUrl = `/user-groups/${idMemberDelete}`;
    try {
      const { message } = await fetchData(subUrl, 'DELETE');
      await getMembers();
      showToastMessage(message);
      onCloseConfirmMemberDelete(); 
    }
    catch ({ message }) {
      showToastError(message);
    }
  }
  async function handleInviteUser(event) {
    event.preventDefault();


    const id = params.id; 
    const email = document.getElementById('email').value;
    const subUrl = `/groups/${id}/invite?email=${email}`;

    try {
      await fetchData(subUrl, 'POST');
      showToastMessage('Invitation sent successfully');
      setIsOpenModalInviteUser(false);
    }
    catch (error) {
      showToastError(error.message)
    }
    finally {
      setEmailInvite(null)
    }
  }

  const styleModal = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: 1000
    },
    content: {
      width: '600px',
      height: '150px',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      padding: '20px 40px',
      borderRadius: '8px',
      backgroundColor: 'while',
      border: '0px',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
    },
  }

  useEffect(() => {
    getMembers()
  }, []);


  const [idMemberDelete, setIdMemberDelete] = useState();
  const [isOpenConfirmMemberDelete, setIsOpenConfirmMemberDelete] = useState(false); 

  const onOpenConfirmMemberDelete = (id) => { 
    setIdMemberDelete(id); 
    setIsOpenConfirmMemberDelete(true); 
  }

  const onCloseConfirmMemberDelete = () => { 
    setIsOpenConfirmMemberDelete(false); 
  }

  return (

    userGroups && ( 
      <div>
        
        <div className="flex justify-end">

            <button onClick={() => setIsOpenModalInviteUser(true)} type="button" className="dark:border-white dark:text-white flex gap-x-2 items-center text-blue-700 border border-blue-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2 text-center">
              <i className="fa-solid fa-plus"></i>
              <span>Mời tham gia</span>
            </button> 

        </div>

        {/* Modal email người dùng */}
        <Modal
          isOpen={isOpenModalInviteUser}
          onRequestClose={() => setIsOpenModalInviteUser(false)}
          contentLabel='Custom Modal'
          style={styleModal}
        >
          <form onSubmit={handleInviteUser} className=''>
            <div className='flex justify-between items-center'>
              <span className='text-gray-800 text-lg font-medium'>Mời tham gia</span>
              <button onClick={() => setIsOpenModalInviteUser(false)} type='button'>
                <img src='/close.png' className='w-5 h-5' alt='' />
              </button>
            </div>

            {/* <hr className='my-4' /> */}

            <div className='mt-6'>
              <div className='flex w-full gap-x-4'>
                <input id='email' type="text" name="first-name" placeholder="Type email" autocomplete="given-name" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
              </div>
              </div>
              <div className='mt-4 flex justify-end items-center'>

               
            </div>
          </form>
        </Modal>


        <Modal
                                    isOpen={isOpenConfirmMemberDelete}
                                    onRequestClose={onCloseConfirmMemberDelete}
                                    style={{
                                        overlay: {
                                            backgroundColor: "rgba(0, 0, 0, 0.6)",
                                            zIndex: 1000
                                        },
                                        content: {
                                            position: "absolute",
                                            top: "50%",
                                            left: "50%",
                                            transform: "translate(-50%, -50%)",
                                            width: "540px",
                                            height: "240px",
                                            borderRadius: "8px",
                                            boxShadow: "rgba(0, 0, 0, 0.4) 0px 30px 90px",
                                            overflow: "visible",
                                        },
                                    }}
                                >
                                   
                                    <div className="bg-white rounded-lg max-w-md mx-auto p-4 relative">
                                        {/* Header with icon */}
                                        <div className="flex items-center">
                                            <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto md:mx-0">
                                                <img src="/src/assets/image/alert.png" alt="" />
                                            </div>
                                            <div className="mt-4 text-center md:text-left md:ml-6">
                                                <p className="font-bold text-lg">Xóa thành viên</p>
                                                <p className="text-sm text-gray-700 mt-1">
                                                Bạn có chắc chắn muốn xóa thành viên này khỏi nhóm học tập không? Họ sẽ mất quyền truy cập vào tất cả nội dung và tài nguyên của nhóm học tập
                                                </p>
                                            </div>
                                        </div>
                    
                                        {/* Footer with action buttons */}
                                        <div className="text-center md:text-right mt-4 flex flex-col md:flex-row justify-end gap-2">
                                            <button onClick={() => onCloseConfirmMemberDelete()}
                    
                                                className="px-4 py-2 bg-gray-200 rounded-lg font-semibold text-sm"
                                            >
                                                Hủy
                                            </button>
                                            <button onClick={() => onDeleteUserGroup()}
                    
                                                className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold text-sm"
                                            >
                                                Xóa thành viên
                                            </button>
                                        </div>
                                    </div>
                                </Modal>

        {userGroups.length != 0 ? (
          <div className="mb-8 grid grid-cols-2 gap-8">
            {userGroups.map((userGroup, index) => (
              <div key={index} className="flex justify-between gap-x-6 p-5 border rounded-lg">
                <div className="flex min-w-0 gap-x-4">
                  <img
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {userGroup.email}
                    </p>
                    <span className="text-gray-800 text-sm">
                      Joined {customFormatDistanceToNow(userGroup.createdDate)}
                    </span>
                  </div>
                </div>
                <div className="flex gap-x-2 items-center">
                  <button onClick={() => onOpenConfirmMemberDelete(userGroup.id)}>
                    <img
                      src="/src/assets/image/delete.png"
                      className="w-4 h-4"
                      alt=""
                    />
                  </button>
                 
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Empty />
        )}

        <ToastContainer />
      </div>
    )
  );
}
