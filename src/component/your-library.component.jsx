
import { useNavigate } from "react-router-dom"
import useAuth from "../context/AuthContext"
import { useTranslation } from 'react-i18next';

export default function YourLibrary() {

    const { auth } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();

    return auth &&  <div className="group relative cursor-pointer">

        <div className="flex items-center justify-between space-x-2 bg-transparent">
            <a className="menu-hover font-medium text-black uppercase text-xs" onClick="">
                {t('NAVBAR.YOUR_LIBRARY')}
            </a>
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" className="h-6 w-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </span>
        </div>

        <div
            className="invisible absolute z-50 flex w-[200px] flex-col bg-white py-1 px-4 text-gray-800 shadow-xl group-hover:visible">

        

            <a onClick={() => {navigate('/my-decks')}} className="h-10 flex items-center gap-x-3 border-b border-gray-100 font-semibold hover:text-black">
                <i class="fa-solid fa-layer-group"></i>
                {t('NAVBAR.CARD_SET')}
            </a>

            <a onClick={() => {navigate('/my-cards')}} className="h-10 flex items-center gap-x-3 border-b border-gray-100 font-semibold hover:text-black">
                <i class="fa-solid fa-clone"></i>
                {t('NAVBAR.CARD')}
            </a>

            <a onClick={() => {navigate('/groups/owner')}} className="h-10 flex items-center gap-x-3 border-b border-gray-100 font-semibold hover:text-black">
                <i class="fa-solid fa-user-group"></i>
                {t('NAVBAR.STUDY_GROUP')}
            </a>
        </div>
    </div> 



    // return auth && <div classNameName='relative'>


    //         <button onClick={handleClickLiblary} classNameName='flex gap-x-3'>
    //             <span classNameName='font-medium'>{t('NAVBAR.YOUR_LIBRARY')}</span>
    //             <i classNameName="fa-solid fa-angle-down pt-1"></i>
    //             </button>
      
    //     {
    //         showLiblary && <div classNameName='absolute top-12 left-0 rounded-md px-6 py-4 w-56 bg-white shadow-2xl'>

    //             <div classNameName='flex flex-col text-sm font-medium text-gray-600 gap-y-4'>
    //                 <button onClick={() => {
    //                     setShowLiblary(false)
    //                     navigate('/my-decks')
    //                 }}
    //                     classNameName='flex items-center gap-x-3'>
    //                     <i classNameName="fa-solid fa-folder"></i>
    //                     <span>{t('NAVBAR.CARD_SET')}</span>

    //                 </button>
    //                 <hr />
    //                 <button onClick={() => {
    //                     setShowLiblary(false)
    //                     navigate('/my-cards')
    //                 }} classNameName='flex items-center gap-x-3'>
    //                     <i classNameName="fa-solid fa-repeat"></i>
    //                     <span>{t('NAVBAR.CARD')}</span>
    //                 </button>
    //                 <hr />
    //                 <button onClick={() => {
    //                     setShowLiblary(false)
    //                     navigate('/groups/owner')
    //                 }} classNameName='flex items-center gap-x-3'>
    //                    <i classNameName="fa-solid fa-users"></i>
    //                     <span>{t('NAVBAR.STUDY_GROUP')}</span>
    //                 </button>
        
    //             </div>
    //         </div>}
    // </div>

}