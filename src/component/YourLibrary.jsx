import { useState } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../context/AuthContext"
import { useTranslation } from 'react-i18next';

export default function YourLibrary() {

    const { auth } = useAuth()
    const [showLiblary, setShowLiblary] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation();


    function handleClickLiblary() {
        setShowLiblary(!showLiblary)
    }



    return auth && <div className='relative'>
        {/*  */}

            <button onClick={handleClickLiblary} className='flex gap-x-3'>
                <span className='font-medium'>{t('NAVBAR.YOUR_LIBRARY')}</span>
                <i className="fa-solid fa-angle-down pt-1"></i>
                </button>
      
        {/* show dashboard */}
        {
            showLiblary && <div className='absolute top-12 left-0 rounded-md px-6 py-4 w-56 bg-white shadow-2xl'>

                <div className='flex flex-col text-sm font-medium text-gray-600 gap-y-4'>
                    <button onClick={() => {
                        setShowLiblary(false)
                        navigate('/my-decks')
                    }}
                        className='flex items-center gap-x-3'>
                        <i className="fa-solid fa-folder"></i>
                        <span>{t('NAVBAR.CARD_SET')}</span>

                    </button>
                    <hr />
                    {/* <button onClick={() => {
                        setShowLiblary(false)
                        navigate('/my-cards')
                    }} className='flex items-center gap-x-3'>
                        <i className="fa-solid fa-repeat"></i>
                        <span>{t('NAVBAR.CARD')}</span>
                    </button> */}
                    {/* <hr /> */}
                    <button onClick={() => {
                        setShowLiblary(false)
                        navigate('/groups/owner')
                    }} className='flex items-center gap-x-3'>
                       <i className="fa-solid fa-users"></i>
                        <span>{t('NAVBAR.STUDY_GROUP')}</span>
                    </button>
        
                </div>
            </div>}
    </div>





    // return <div className="relative">
    //     <button onClick={handleClickLiblary} className='flex gap-x-3'>
    //         <span className='font-medium text-[#282E3E]'>Thư viện của bạn</span>
    //         <i className="fa-solid fa-angle-down pt-1"></i>
    //     </button>
    //     {showLiblary && <div className="absolute bg-[#F0F6F6] top-12 rounded-lg p-4 w-[450px] shadow-2xl">
    //         {/* header */}
    //         <div className="text-gray-600 font-bold px-2">
    //             <Link to={'/my-decks'} >bộ thẻ</Link>
    //             <Link to={'/my-cards'} className="ml-12">Thẻ</Link>
    //             {/* Phần lớp học load động +> cập nhập thông tin */}
    //             <button className="ml-12">Lớp học</button>

    //         </div>
    //         <hr className="my-4" />
    //         <div className="overflow-y-scroll h-24">
    //             {
    //                 decks.map((deck, index) => <div key={index}>
    //                     <div className="p-2 flex justify-between">
    //                         <span>{deck.name}</span>
    //                         <i className="fa-solid fa-arrow-trend-up"></i>
    //                     </div>
    //                 </div>)
    //             }
    //         </div>

    //         <hr className="my-4" />
    //         <button className="text-blue-600 text-lg px-2">Xem tất cả</button>
    //     </div>

    //     }



    // </div>
}