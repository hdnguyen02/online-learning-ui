import { useEffect, useState } from 'react'
import { fetchData, showToastError } from '../global'
import { ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'
import Empty from '../component/Empty'

export default function GlobalGroups() {
  const [globalGroups, setGlobalGroups] = useState()

  async function getGlobalGroups() {
    try {
      const subUrl = '/global/groups'
      const { data } = await fetchData(subUrl, 'GET')
      setGlobalGroups(data) 
    } catch (error) {
      showToastError(error.message)
    }
  }

  useEffect(() => {
    getGlobalGroups()
  }, [])

  return (
    globalGroups && (
      <>
        <div className='profile flex gap-x-3 items-center justify-between h-12'>
            <span className='font-medium uppercase text-sm'>Study group</span>
            <div className='flex gap-x-8 items-center'>
        
                <div className='max-w-md mx-auto'>
                    <div className='relative'>
                        <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                            <svg className='w-4 h-4 text-gray-500' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'>
                                <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z' />
                            </svg>
                        </div>
                        <input onChange={(event) => {
                            setSearchTerm(event.target.value)
                        }} type='search' id='decks-search' className='block w-full  px-4 h-10 ps-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500' placeholder='Name, description...' />
                    </div>
                </div>
            </div>
        </div>
        <hr className='my-8'/>

        {globalGroups.length != 0 ? (
          <div className='mb-12 grid grid-cols-2 gap-12'>
            {globalGroups.map((globalGroup, index) => (
              <div key={index} className='bg-[#F0F6F6] p-6 rounded'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-x-4'>
                    <div className='rounded-full h-10 w-10 overflow-hidden cursor-pointer'>
                      <img
                        src={
                          globalGroup.owner.avatar
                            ? globalGroup.owner.avatar
                            : '/user.png'
                        }
                        loading='lazy'
                        className='w-full h-full'
                        alt=''
                      />
                    </div>
                    <div className='flex flex-col gap-y-2'>
                      <div className='flex gap-x-2 items-center'>
                        <span className='font-bold text-xl'>
                          {globalGroup.name}
                        </span>
                        <span>({globalGroup.quantityMembers} member)</span>
                      </div>

                      <div className='flex items-center gap-x-3'>
                        <span className='font-light text-sm'>
                          {globalGroup.owner.firstName +
                            ' ' +
                            globalGroup.owner.lastName}
                        </span>

                        {globalGroup.owner.roles.map((role, index) => {
                          return (
                            <span
                              key={index}
                              className='lowercase text-xs bg-gray-300 p-1 rounded-lg'
                            >
                              {role}
                            </span>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                  <div>
                    <Link
                      to={`/groups/${globalGroup.id}`}
                      className='flex items-center h-8 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 text-center'
                    >
                      <span className='ml-1'>Detail</span>
                    </Link>
                  </div>
                </div>
                <div className='mt-2 text-gray-700 text-sm text-ellipsis overflow-hidden whitespace-nowrap'>
                  {globalGroup.description}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Empty />
        )}
        <ToastContainer />
      </>
    )
  )
}
