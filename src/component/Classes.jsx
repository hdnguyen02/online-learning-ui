import { useEffect } from 'react'


import { Link, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../context/AuthContext'

const Classes = () => {

  const { auth } = useAuth()

  

  const location = useLocation()


  

  



  

  useEffect(() => {
  }, [])

  return (
    <div>
      <div className='profile flex gap-x-3 items-center justify-between font-medium h-12'>
        <span className='text-sm uppercase'>Your study group</span>
        {/* <div className='flex gap-x-8 items-center'>
          <button className=''>
            <img
              onClick={() => setIsOpenCreateClass(true)}
              src='/plus.png'
              className='w-9'
              alt=''
            />
          </button>
     
        </div> */}
        
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

      </div>

    </div>
  )
}
export default Classes
