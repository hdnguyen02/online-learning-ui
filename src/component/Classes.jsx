import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Link, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../context/AuthContext';
import Modal from 'react-modal';

const Classes = () => {

  const { auth } = useAuth(); 
  const { t } = useTranslation(); 


  const [name, setName] = useState();
  const [desc, setDesc] = useState();



  const location = useLocation();

  const appElement = document.getElementById('root');
  Modal.setAppElement(appElement); 
  const [isOpenCreateClass, setIsOpenCreateClass] = useState(false);

  const onOpenCreateGroup = () => { 
    setIsOpenCreateClass(true); 
  }



  async function onCreateGroup(event) {
    event.preventDefault();
    const isPublic = document.getElementById('public-checkbox').checked;
    const body = {
        name, description: desc,isPublic
    };

    try {
        const subUrl = '/groups';
        const { message } = await fetchData(subUrl, 'POST', body);
        showToastMessage(message);

        setName('');
        setDesc('');
        setIsOpenCreateClass(false);

    } catch (error) {
        showToastError(error.message);
    }
}


  const stylesModalCreateGroup = {
    content: {
        width: '600px',
        height: '380px',
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
  }, [])

  return (
    <div>
      <div className='profile flex gap-x-3 items-center justify-between font-medium h-12'>
        <div className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse cursor-pointer">
            <li className="inline-flex items-center">
              <span className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                Thư viện của bạn
              </span>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                </svg>
                <span className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2">Nhóm học tập</span>
              </div>
            </li>

          </ol>
        </div>
        <div className='flex gap-x-8 items-center'>
          {/* <button className=''>
            <img
              onClick={() => setIsOpenCreateClass(true)}
              src='/plus.png'
              className='w-9'
              alt=''
            />
          </button> */}

          {/* <button onClick={onOpenCreateGrouponOpenCreateGroup} type="button" className="flex gap-x-2 items-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2 text-center">
            <i className="fa-solid fa-plus"></i>
            <span>{t('ACTION.CREATE')}</span>
          </button> */}


        </div>

      </div>

      <hr className='my-8'></hr>

      

      <div className="md:flex">
    <ul className="w-64 flex-column space-y space-y-4 text-sm font-medium text-gray-800 md:me-4 mb-4 md:mb-0">
        <li>
        <Link  to={'/groups/owner'} className={
                      location.pathname.includes('groups/owner')
                        ? 'bg-blue-600 text-white inline-flex items-center px-4 py-3 rounded-lg w-full'
                        : 'bg-gray-200 inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 w-full'
                    }>
                Lớp học của bạn
            </Link>
        </li>
        <li>
            <Link to={'/groups/attendance'} className={
                      location.pathname.includes('groups/attendance')
                        ? 'bg-blue-600 text-white inline-flex items-center px-4 py-3 rounded-lg w-full'
                        : 'bg-gray-200 inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 w-full'
                    }>
                Lớp học bạn tham gia
            </Link>
        </li>
        {/* <li>
            <a href="#" className="inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-200 hover:bg-gray-100 w-full">
                Settings
            </a>
        </li>
        <li>
            <a href="#" className="inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-200 hover:bg-gray-100 w-full">
                Contact
            </a>
        </li> */}
      
    </ul>
    <div className="text-medium text-gray-500 rounded-lg w-full">
    <Outlet />
    </div>
</div>





      {/* <div className=''>
        <div className='relative overflow-x-auto sm:rounded-lg'>
          <div>
            <div className=''>
              <ul className='flex gap-x-24'>
                <li className='font-medium flex gap-x-2'>
                  <Link
                    className={
                      location.pathname.includes('groups/owner')
                        ? 'link-active'
                        : ''
                    }
                    to={'/groups/owner'}
                  >
                    <span>Your group</span>
                    {!auth?.roles.includes('TEACHER') && (
                      <i className='fa-solid fa-lock text-black ml-2'></i>
                    )}
                  </Link>
                </li>

                <li className='font-medium flex gap-x-2'>
                  <Link
                    className={
                      location.pathname.includes('groups/attendance')
                        ? 'link-active'
                        : ''
                    }
                    to={'/groups/attendance'}
                  >
                    <span>Group you join</span>

                  </Link>
                </li>
              </ul>

              <div className='py-8'>
                <Outlet />
              </div>
            </div>
          </div>
        </div>

      </div> */}



<Modal
            isOpen={isOpenCreateClass}
            onRequestClose={() => setIsOpenCreateClass(false)}
            contentLabel='Custom Modal'
            style={stylesModalCreateGroup}
        >
            <form onSubmit={onCreateGroup} className=''>
                <div className='flex justify-between items-center'>
                    <span className='text-gray-800 text-xl font-medium'>Create group</span>
                    {/* <button onClick={() => setIsOpenCreateClass(false)} type='button'>
                        <img src='/close.png' className='w-5 h-5' alt='' />
                    </button> */}
                </div>

                <hr className='my-4' />

                <div className='mt-6'>
                    <div className='flex flex-col gap-y-2 w-full'>
                        <label className='text-sm text-gray-600 font-medium' htmlFor=''>
                            Name
                            <span className='text-red-500'>*</span>
                        </label>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            type='text'
                            className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                            required
                        />
                    </div>

                    <div className='flex flex-col gap-y-2 w-full mt-4'>
                        <label className='text-sm text-gray-600 font-medium' htmlFor=''>
                            Description
                        </label>
                        <input
                            onChange={(e) => setDesc(e.target.value)}
                            value={desc}
                            type='text'
                            className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                            required
                        />
                    </div>
                    <div className='mt-4'>

                        <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            <span className="ms-3 text-sm font-medium text-gray-900">Public</span>
                        </label>


                    </div>
                </div>

                <hr className='my-4' />
                <div className='mt-4 flex justify-end items-center'>

                    {/* <div className='flex items-center'>
                            <input id='public-checkbox' type='checkbox' className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6' />
                            <label htmlFor='public-checkbox' className='ms-2 text-sm font-medium text-gray-900'>Public</label>
                        </div> */}
                    <button
                        type='submit'
                        className='h-10 w-full items-center gap-x-2 px-8 text-sm text-center text-white font-bold rounded-md bg-primary sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300'
                    >
                        Submit
                    </button>
                </div>
            </form>
        </Modal>

    </div>
  )
}
export default Classes
