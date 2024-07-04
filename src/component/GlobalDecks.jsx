import { useEffect, useState } from "react"
import { fetchData, showToastError, showToastMessage } from "../global"
import { ToastContainer } from "react-toastify"
import Modal from 'react-modal'

export default function GlobalDecks() {

    const [isShowDetailDeck, setIsShowDetailDeck] = useState(false)
    const [decks, setDecks] = useState()

    const [detailDeck, setDetailDeck] = useState()




    const appElement = document.getElementById('root')
    Modal.setAppElement(appElement)


    async function getDeckDetail(idDeck) {
        const subUrl = `/decks/${idDeck}`
        try {
            const { data } = await fetchData(subUrl, 'GET')
            console.log(data)
            setDetailDeck(data)
            setIsShowDetailDeck(true)

        }
        catch (error) {
            showToastError(error.message)
        }

    }

    async function getDecks() {

        try {
            const subUrl = '/global/decks'
            const { data } = await fetchData(subUrl, 'GET')
            setDecks(data)
        }
        catch (error) {
            showToastError(error.message)
        }

    }

    async function handleCloneDeck() {
        try {
            const subUrl = `/decks/${detailDeck.id}/clone`
            const { message } = await fetchData(subUrl, 'POST')
            showToastMessage(message)
        }
        catch (error) {
            showToastError(error.message)
        }
    }

    useEffect(() => {
        getDecks()
    }, [])


    const stylesModal = {
        content: {
            width: '800px',
            height: '440px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',

            borderRadius: '2px',
            backgroundColor: 'while',
            outline: 'none',
            // overflow: 'hidden',
        },
    }




    return decks && <>
        <h3 className="uppercase text-sm text-gray-700 mb-8">Bộ thẻ chuyên gia</h3>

        {/*  danh sách thành viên */}
        <div className="mb-12 grid grid-cols-2 gap-12">
            {
                decks.map((deck, index) => <div key={index} className="bg-[#F0F6F6] p-6 rounded">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-4">
                            <div className='rounded-full h-10 w-10 overflow-hidden cursor-pointer'>
                                <img src={deck.user.avatar ? deck.user.avatar : '/user.png'} loading="lazy" className='w-full h-full' alt='' />
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <div className="flex gap-x-2 items-center">
                                    <span className="font-bold text-xl">{deck.name}</span>
                                    <span>({deck.numberCards} thẻ)</span>
                                </div>

                                <div className="flex items-center gap-x-3">
                                    <span className="font-light text-sm">{deck.user.firstName + " " + deck.user.lastName}</span>
                                    {
                                        deck.user.roles.map((role, index) => {
                                            return <span key={index}>
                                                <span className="lowercase text-xs bg-gray-300 p-1 rounded-lg">{role}</span>
                                            </span>
                                        })
                                    }
                                </div>
                                <div className="mt-2 text-gray-700 text-sm text-ellipsis overflow-hidden whitespace-nowrap">{deck.description}</div>
                            </div>
                        </div>
                        <div className="flex gap-x-2">
                            {/* <Link to={`/groups/${globalGroup.id}`} >

                                <span className="ml-1">Chi tiết</span>


                            </Link> */}
                            <button onClick={() => getDeckDetail(deck.id)} className="flex items-center gap-x-2 h-8 text-blue-900 hover:text-white border border-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 text-center">
                                <span>Detail</span>

                                <i className="fa-regular fa-eye"></i>
                            </button>

                            {/* <button className="flex items-center gap-x-2 h-8 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 text-center">
                                <span>Clone</span>

                                <i className="fa-solid fa-download"></i>
                            </button> */}
                        </div>
                    </div>

                </div>)
            }
        </div>

        <div>

        </div>



        <Modal
            isOpen={isShowDetailDeck}
            onRequestClose={() => setIsShowDetailDeck(false)}
            contentLabel='Custom Modal'
            style={stylesModal}
        >
            {detailDeck && <div className="">

                {/* Hiển thị thông tin bộ thẻ */}

                <div className="flex items-center gap-x-4">
                    <div className='rounded-full h-10 w-10 overflow-hidden cursor-pointer'>
                        <img src={detailDeck.user.avatar ? detailDeck.user.avatar : '/user.png'} loading="lazy" className='w-full h-full' alt='' />
                    </div>
                    <div className="flex flex-col gap-y-2 flex-1">
                        <div className="flex gap-x-2 items-center">
                            <span className="font-bold text-xl">{detailDeck.name}</span>
                            <span>({detailDeck.numberCards} thẻ)</span>
                        </div>

                        <div className="flex items-center gap-x-3">
                            <span className="font-light text-sm">{detailDeck.user.firstName + " " + detailDeck.user.lastName}</span>
                            {/* <span className="text-xs bg-gray-300 p-1 rounded-lg">Giáo viên</span> */}
                            {
                                detailDeck.user.roles.map((role, index) => {
                                    return <span key={index}>
                                        <span className="text-xs bg-gray-300 p-1 rounded-lg">{role}</span>
                                    </span>
                                })
                            }
                        </div>
                        <div className="mt-2 text-gray-700 text-sm text-ellipsis overflow-hidden whitespace-nowrap">{detailDeck.description}</div>
                    </div>

                    <div>
                        <button onClick={handleCloneDeck} className="flex items-center gap-x-2 h-8 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 text-center">
                            <span>Clone</span>

                            <i className="fa-solid fa-download"></i>
                        </button>
                    </div>
                </div>


                <hr className="my-4" />


                <table className="w-full text-sm text-left rtl:text-right text-gray-500 h-[100px] overflow-y-scroll">
                    <thead className="text-sm text-gray-700 uppercase">
                        <tr>

                            <th scope="col" className="px-6 py-5">
                                Thuật ngữ
                            </th>
                            <th scope="col" className="px-6 py-5">
                                Định nghĩa
                            </th>
                            <th scope="col" className="px-6 py-5">
                                Example
                            </th>


                        </tr>
                    </thead>
                    <tbody>
                        {detailDeck.cards.map((card, index) => (
                            <tr key={index} className="odd:bg-gray-100 even:bg-white">

                                <td className="px-6 py-5 font-medium">
                                    {card.term}
                                </td>
                                <td className="px-6 py-5">
                                    {card.definition}
                                </td>
                                <td className="px-6 py-5">
                                    {card.example ? card.example : 'None'}
                                </td>


                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>}
        </Modal>

        <ToastContainer />
    </>
}