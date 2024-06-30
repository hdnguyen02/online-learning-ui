import {  useState, useEffect } from 'react'
import { fetchData } from '../global'
import { Link, Outlet, useLocation } from 'react-router-dom'
import Modal from 'react-modal'
import useAuth from '../context/AuthContext'

const Classes = () => {

  const { auth } = useAuth()

  const [name, setName] = useState()
  const [desc, setDesc] = useState()
  const appElement = document.getElementById('root')
  Modal.setAppElement(appElement)
  const [isOpenCreateClass, setIsOpenCreateClass] = useState(false)

  const location = useLocation()


  const stylesModalCreateClass = {
    content: {
      width: '600px',
      height: '380px',
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



  async function handleCreateClass(event) {
    event.preventDefault()

    const subUrl = '/groups'
    const body = {
      name,
      description: desc,
    }

    try {
      await fetchData(subUrl, 'POST', body)
    } catch (error) {
  
    }
  }

  useEffect(() => {
  }, [])

  return (
    <div>
      <div className='profile flex gap-x-3 items-center justify-end font-medium h-12'>
        <div className='flex gap-x-8 items-center'>
          <button className=''>
            <img
              onClick={() => setIsOpenCreateClass(true)}
              src='/plus.png'
              className='w-9'
              alt=''
            />
          </button>
          <div className='max-w-md mx-auto'>
            <div className='relative'>
              <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                <svg
                  className='w-4 h-4 text-gray-500'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 20 20'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                  />
                </svg>
              </div>
              <input
              
                type='search'
                id='decks-search'
                className='block w-full  px-4 h-10 ps-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
                placeholder='Tên, mô tả...'
              />
            </div>
          </div>
        </div>
      </div>

      <hr className='my-8'></hr>

      
        <div className=''>
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
                      <span>Nhóm của bạn</span>
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
                      <span>Nhóm bạn tham gia</span>
                     
                    </Link>
                  </li>
                </ul>

                <div className='py-12'>
                  <Outlet />
                </div>
              </div>
            </div>
          </div>

        </div>


      <Modal
          isOpen={isOpenCreateClass}
          onRequestClose={() => setIsOpenCreateClass(false)}
          contentLabel='Custom Modal'
          style={stylesModalCreateClass}
        >
          <form onSubmit={handleCreateClass} className=''>
            <div className='flex justify-between'>
              <h3 className='text-gray-800 text-2xl font-bold'>Tạo nhóm</h3>
              <button onClick={() => setIsOpenCreateClass(false)} type='button'>
                <img src='/close.png' className='w-5 h-5' alt='' />
              </button>
            </div>
           
            <hr className='my-4'/>

            <div className='mt-6'>
              <div className='flex flex-col gap-y-2 w-full'>
                <label className='text-sm text-gray-600 font-bold' htmlFor=''>
                  Tên
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  type='text'
                  className='h-10 px-4 rounded-lg'
                  required
                />
              </div>

              <div className='flex flex-col gap-y-2 w-full mt-4'>
                <label className='text-sm text-gray-600 font-bold' htmlFor=''>
                  Mô tả
                </label>
                <input
                  onChange={(e) => setDesc(e.target.value)}
                  type='text'
                  className='h-10 px-4 rounded-lg'
                  required
                />
              </div>
            </div>

            <hr className='my-4'/>

          
            <div className='mt-4'>
              <button
                type='submit'
                className='h-10 w-full items-center gap-x-2 px-8 text-sm text-center text-white font-bold rounded-md bg-primary sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300'
              >
                Tạo
              </button>
              </div>
          </form>
        </Modal>

    </div>
  )
}
export default Classes
