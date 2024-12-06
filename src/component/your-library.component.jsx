
import { useNavigate } from "react-router-dom"
import useAuth from "../context/AuthContext"
import { useTranslation } from 'react-i18next';

export default function YourLibrary() {

    const { auth } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();

    return auth &&  <div className="group relative cursor-pointer">

        <div className="flex items-center justify-between space-x-2 bg-transparent">
            <span className="menu-hover font-bold text-black uppercase text-xs">
                {t('NAVBAR.YOUR_LIBRARY')}
            </span>
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                    stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </span>
        </div>

        <div
            className="invisible absolute z-50 flex w-[200px] flex-col bg-white py-1 px-4 text-gray-800 shadow-xl group-hover:visible">

        

            <a onClick={() => {navigate('/my-decks')}} className="h-10 flex items-center gap-x-3 border-b border-gray-100 font-semibold hover:text-black">
                <i className="fa-solid fa-layer-group"></i>
                {t('NAVBAR.CARD_SET')}
            </a>

            <a onClick={() => {navigate('/my-cards')}} className="h-10 flex items-center gap-x-3 border-b border-gray-100 font-semibold hover:text-black">
                <i className="fa-solid fa-clone"></i>
                {t('NAVBAR.CARD')}
            </a>

            <a onClick={() => {navigate('/groups/owner')}} className="h-10 flex items-center gap-x-3 border-b border-gray-100 font-semibold hover:text-black">
                <i className="fa-solid fa-user-group"></i>
                {t('NAVBAR.STUDY_GROUP')}
            </a>
        </div>
    </div> 

}