import useAuth from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';


export default function YourProfile() {

    const navigate = useNavigate()
    const { auth, signOut } = useAuth();
    const { t } = useTranslation();



    function handleSignOut() {
        signOut();
        navigate('/');
    }


    return auth && <div className="group relative cursor-pointer mt-2">

        <div className="flex items-center justify-between space-x-2 pb-2 bg-transparent">
            <div className='h-9 w-9 rounded-full overflow-hidden cursor-pointer'>
                <img src={auth.avatar ? auth.avatar : '/user.png'} loading="lazy" className='w-full h-full' alt='' />
            </div>
            {/* <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" className="h-6 w-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </span> */}
        </div>

        <div
            className="invisible absolute z-50 flex w-[200px] flex-col bg-white py-1 px-4 text-gray-800 shadow-xl group-hover:visible">

            <a className="h-10 flex items-center gap-x-3 border-b border-gray-100 font-semibold hover:text-black">
                <div className='text-xs flex flex-col'>
                    {/* firstname + lastname */}
                    {(auth.firstName || auth.lastName) && (
                        <span className="w-28 text-ellipsis overflow-hidden whitespace-nowrap font-medium">
                            {`${auth.firstName || ""} ${auth.lastName || ""}`.trim()}
                        </span>
                    )}

                    <span className='w-28 text-ellipsis overflow-hidden whitespace-nowrap'>{auth.email}</span>
                </div>
            </a>

            <Link to={'/settings/profile'} className="h-10 flex items-center gap-x-3 border-b border-gray-100 font-semibold hover:text-black  uppercase text-xs">
                <i className="fa-solid fa-gear"></i>
                <span>Setting</span>
            </Link>

            {auth.roles.includes('ADMIN') &&
                <Link to={'/admin'} className='h-10 flex items-center gap-x-3 border-b border-gray-100 font-semibold hover:text-black  uppercase text-xs'>
                    <i className="fa-solid fa-lock"></i>
                    <span>Management</span>
                </Link>
            }

            <a onClick={handleSignOut} className="h-10 flex items-center gap-x-3 border-b border-gray-100 font-semibold hover:text-black  uppercase text-xs">
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                <span>Log out</span>
            </a>
        </div>
    </div>


}