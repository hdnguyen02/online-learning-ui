import useAuth from "../context/AuthContext"
import { useState} from "react"
import { Link, useNavigate } from "react-router-dom"


export default function YourProfile() {

    const navigate = useNavigate()
    const { auth, signOut } = useAuth()
    const [showProfile, setShowProfile] = useState(false)


    function handleSignOut() {
        signOut()
        navigate('/')
    }
    


    

    return auth && <div className='relative'>
        <div className="flex items-center gap-x-2">


            <div onClick={() => setShowProfile(!showProfile)} className='h-10 w-10 rounded-full overflow-hidden cursor-pointer'>
                <img src={auth.avatar ? auth.avatar : '/user.png'} loading="lazy" className='w-full h-full' alt='' />
                {/* <i className="fa-solid fa-angle-down pt-1"></i> */}

            </div>
            <i className="fa-solid fa-angle-down pt-1"></i>
        </div>
        {/* show dashboard */}
        {
            showProfile && <div className='absolute top-12 right-0 rounded-md px-6 py-4 w-56 bg-white shadow-2xl'>
                <div className="flex gap-x-3 items-center">
                    <div className='h-10 w-10 rounded-full overflow-hidden cursor-pointer'>
                        <img src={auth.avatar ? auth.avatar : '/user.png'} loading="lazy" className='w-full h-full' alt='' />
                    </div>
                    <div className='text-xs flex flex-col'>
                        {/* firstname + lastname */}
                        <span className='w-28 text-ellipsis overflow-hidden whitespace-nowrap font-medium'>{auth.firstName + " " + auth.lastName}</span>
                        <span className='w-28 text-ellipsis overflow-hidden whitespace-nowrap'>{auth.email}</span>
                    </div>
                </div>
                <hr className='my-4' />
                <div className='flex flex-col text-sm font-medium text-gray-600 gap-y-4'>
                    <Link to={'/settings/info'} className='flex items-center gap-x-3'>
                        <i className="fa-solid fa-gear text-lg"></i>
                        <span>Setting</span>
                    </Link>
                    <hr />
                    {   auth != false && 
                        auth.roles.includes('ADMIN') &&  <div className="flex flex-col text-sm font-medium text-gray-600 gap-y-4">
                            <Link to={'/admin'} className='flex items-center gap-x-3'>
                        <i className="fa-solid fa-lock text-lg"></i>
                            <span>Management</span>
                        </Link>
                        <hr />
                        </div>
                    }
                   
                    
                    <button onClick={handleSignOut} className='flex items-center gap-x-3'>
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                        <span>Log out</span>
                    </button>
                </div>

            </div>
        }
    </div>

}