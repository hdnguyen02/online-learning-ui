
import { useRef, useState, useEffect } from 'react'
import { fetchData, showToastError, showToastMessage } from '../global'
import { ToastContainer } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import DeleteDeck from './DeleteDeck'

import ModalCreateDeck from './ModalCreateDeck'
import ModalEditDeck from './ModalEditDeck'
import Modal from "react-modal"

function Decks() {

    const [decks, setDecks] = useState()

    const appElement = document.getElementById("root");
    Modal.setAppElement(appElement)
    
    const navigate = useNavigate()


    const refModalCreateDeck = useRef()
    const refModalEditDeck = useRef()
    const [idDeckDelete, setIdDeckDelete] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    

    const [isShowModalStudy, setIsShowModalStudy] = useState(false)



    const showModalStudystyles = {
        content: {
          width: "400px",
          height: "100px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: 'while',
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
     
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          outline: "none",
          overflow: "auto",
          display: "flex", 
          justifyContent: 'center',
          alignItems: 'center'

        },
      };


    


    async function handleDeleteDeck() {
        const subUrl = `/decks/${idDeckDelete}`
        try {
            await fetchData(subUrl, 'DELETE')
            await getDecks()
            showToastMessage("Xóa bộ thẻ thành công")
            
        }
        catch (error) {
            showToastError(error.message)
        }
        handleCancel()
        setIdDeckDelete(null)
    }

    function handleCancel() {
        document.getElementById('popup-delete-deck').style.display = 'none'
        setIdDeckDelete(null)
    }

    function showPopupDeleteDeck(event, id) {
        event.stopPropagation()
        document.getElementById('popup-delete-deck').style.display = 'flex'
        setIdDeckDelete(id)
    }


    async function getDecks(searchDecks) {
        let subUrl
        if (searchDecks && searchDecks != '') subUrl = `/decks?searchTerm=${searchDecks}`
        else subUrl = `/decks`
        try {
            const response = await fetchData(subUrl, 'GET')
            setDecks(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    function handleEditDeck(id) {
        refModalEditDeck.current.show(id)
    }

    function handleLearnCard(numberCards, idDeck) { 
        if (numberCards == 0) {
            setIsShowModalStudy(true)
        }
        else { 
            const url = `/my-decks/${idDeck}/learn-cards`
            navigate(url)
        }
    }


    useEffect(() => {
        getDecks(searchTerm)
    }, [searchTerm])




    return <div>
        <ModalCreateDeck ref={refModalCreateDeck} />
        <ModalEditDeck ref={refModalEditDeck} />
        <div className='profile flex gap-x-3 items-center justify-between h-12'>
            <span className='font-medium uppercase text-sm'>Bộ thẻ của bạn</span>
            <div className='flex gap-x-8 items-center'>
                <button onClick={() => { refModalCreateDeck.current.show() }} className=''>
                    <img src="plus.png" className='w-9' alt="" />
                </button>
                <div className="max-w-md mx-auto">
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input onChange={(event) => {
                            setSearchTerm(event.target.value)
                        }} type="search" id="decks-search" className="block w-full  px-4 h-10 ps-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Tên, mô tả..." />
                    </div>
                </div>
            </div>
        </div>

        <hr className='my-8'></hr>

        {decks &&
            <div className=''>
                <div className="relative overflow-x-auto sm:rounded-lg">

                    {decks.length != 0 ?
                        (<table className="w-full text-sm text-left rtl:text-right text-gray-500 mb-24">
                           <thead className="text-sm text-gray-700 uppercase">
                                <tr>
                                  
                                    <th scope="col" className="px-8 py-5 font-light">
                                        Thuật ngữ
                                    </th>
                                    <th scope="col" className="px-8 py-5 font-light">
                                        Số thẻ
                                    </th>
                                    <th scope="col" className="px-8 py-5 font-light">
                                        Ngày tạo
                                    </th>
                                    <th scope="col" className="px-8 py-5 font-light">
                                        Public
                                    </th>
                                    <th scope="col" className="px-8 py-5 font-light">
                                        Action
                                    </th>
                                
                                </tr>   
                            </thead>
                            <tbody>
                                {decks.map((deck, index) => (
                                    <tr key={index} className="odd:bg-gray-100 even:bg-white">
                                        <th scope="row" className="px-8 py-5 text-gray-900 text-sm uppercase whitespace-nowrap">
                                            {deck.name}
                                        </th>
                                        <td className="font-medium px-8 py-5">
                                            {deck.numberCards}
                                        </td>
                                        <td className="font-medium px-8 py-5">
                                            {deck.createAt}
                                        </td>
                                        <td className="font-medium px-8 py-5">
                                            {deck.isPublic ? 'True' : 'False'}
                                        </td>

                                        <td className='px-8 py-5 flex gap-x-6'>
                                            <button onClick={() => handleLearnCard(deck.numberCards, deck.id)}>
                                                {/* to={`/decks/${deck.id}/learn-cards`} */}
                                                <i className="fa-solid fa-graduation-cap text-xl"></i>
                                            </button>
                                            <button onClick={() => handleEditDeck(deck.id)} ><i className="fa-regular fa-pen-to-square text-xl"></i>
                                            </button>

                                            <button onClick={(event) => showPopupDeleteDeck(event, deck.id)}>
                                            <i className="fa-regular fa-trash-can text-xl"></i>
                                        </button>
                                        </td>
                                   
                                    

                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    
                        
                    ) : (<div>
                            <span className='text-sm'>Không có dữ liệu</span>
                        </div>)
                    }
                    {/* <hr className='my-4' /> */}
                </div>

                {/* ))} */}
            </div>
        }
        <DeleteDeck idDeckDelete={idDeckDelete} handleCancle={handleCancel} handleDeleteDeck={handleDeleteDeck} />

        <Modal
        isOpen={isShowModalStudy}
        onRequestClose={() => setIsShowModalStudy(false)}
        contentLabel="Custom Modal"
        style={showModalStudystyles}
      >
        <p className='text-center'>Bạn chưa có thẻ nào trong bộ thẻ, <Link to={'/cards'} className='text-blue-700 underline'>Tạo bộ thẻ</Link>
        </p>
      </Modal>
      <ToastContainer/>
    </div>
}

export default Decks