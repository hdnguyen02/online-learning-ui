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



  const onDeleteUserGroup = async (id) => { 
    const subUrl = `/user-groups/${id}`;
    try {
      const { message } = await fetchData(subUrl, 'DELETE');
      await getMembers();
      showToastMessage(message);
    }
    catch ({ message }) {
      showToastError(message);
    }
  }
  async function handleInviteUser(event) {
    event.preventDefault();


    const id = params.id // idGroup 

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
      height: '240px',
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

  return (

    userGroups && (
      <div>
        <div className="flex justify-end">
          {location.pathname.includes("owner") && (
            <button onClick={() => setIsOpenModalInviteUser(true)} type="button" className="dark:border-white dark:text-white flex gap-x-2 items-center text-blue-700 border border-blue-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2 text-center">
              <i className="fa-solid fa-plus"></i>
              <span>{t('ACTION.CREATE')}</span>
            </button> 
          )}
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
              <span className='text-gray-800 text-lg font-medium'>Invite student</span>
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
                {/* <input
                  onChange={event => setEmailInvite(event.target.value)}
                  value={emailInvite}
                  type='text'
                  className='h-10 px-4 rounded-lg'
                  required
                /> */}

                <input id='email' type="text" name="first-name" autocomplete="given-name" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
              </div>


              <div className='mt-4 flex justify-end items-center'>

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
                  <button onClick={() => onDeleteUserGroup(userGroup.id)}>
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
