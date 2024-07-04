import { useEffect, useState } from "react"
import { ToastContainer } from 'react-toastify'
import Modal from 'react-modal'
import { fetchData, showToastError, showToastMessage, baseUrl } from "../global"
import { useParams } from "react-router-dom"
import { useLocation, Link } from "react-router-dom"
import Empty from "./Empty"


export default function OwnerCommonDecks() {
    const appElement = document.getElementById('root')
    Modal.setAppElement(appElement)

    const location = useLocation()


    const params = useParams()
    const [isOpenDetailCommonDeck, setIsOpenDetailCommonDeck] = useState(false)
    const [isOpenCreateCommonDeck, setIsOpenCreateCommonDeck] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [commonDecks, setCommonDecks] = useState()
    const [isOpenCreateCard, setIsOpenCreateCard] = useState(false)
    const [isOpenEditCard, setIsOpenEditCard] = useState(false)


    // tạo cards => lấy hàm tạo card qua đây +> 





    // idGroup, name, description

    async function handleCreateCommonDeck(event) {
        event.preventDefault()
        const subUrl = '/common-decks'
        const body = { name, description, idGroup: params.id }

        // tiếp tục thêm vào 
        try {
            const { message } = await fetchData(subUrl, 'POST', body)
            // load lại dữ liệu
            await getCommonDecks()
            showToastMessage(message)
            setName('')
            setDescription('')
            setIsOpenCreateCommonDeck(false)
        }
        catch (error) {
            showToastError(error.message)
        }
    }


    async function getCommonDecks() {
        const subUrl = '/common-decks?idGroup=' + params.id
        try {
            const { data } = await fetchData(subUrl, 'GET')
            setCommonDecks(data)
        }
        catch (error) {
            showToastError(error.message)
        }
    }

    const [detailCommonDeck, setDetailCommonDeck] = useState()

    // viêt hàm lấy ra chi tiết => gọi tới id. 
    async function getDetailCommonDeck(idCommonDeck) {
        const subUrl = `/common-decks/${idCommonDeck}`
        try {
            const { data } = await fetchData(subUrl, 'GET')
            setDetailCommonDeck(data)

        }
        catch (error) {
            showToastError(error.message)
        }
    }



    async function handleCreateCard(event) {
        event.preventDefault()
        const inputTermCard = document.getElementById('card-term')
        const inputDefinitionCard = document.getElementById('card-definition')
        const inputExampleCard = document.getElementById('card-example')
        const inputImageCard = document.getElementById('card-image')
        const inputAudioCard = document.getElementById('card-audio')





        const formData = new FormData()
        formData.append('idCommonDeck', detailCommonDeck.id)
        formData.append('term', inputTermCard.value)
        formData.append('definition', inputDefinitionCard.value)
        formData.append('example', inputExampleCard.value)

        const accessToken = localStorage.getItem('accessToken')
        const url = `${baseUrl}/common-cards`
        if (inputAudioCard.files.length > 0) {
            formData.append('audio', inputAudioCard.files[0])
        }
        if (inputImageCard.files.length > 0) {
            formData.append('image', inputImageCard.files[0])
        }
        try {
            const jsonRp = await fetch(url, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
            })
            const response = await jsonRp.json()
    
            if (!jsonRp.ok) {
                throw new Error(response.message)
            }

            // load lại card cho người dùng 
            await getDetailCommonDeck(detailCommonDeck.id)

            inputTermCard.value = ''
            inputDefinitionCard.value = ''
            inputExampleCard.value = ''
            inputAudioCard.value = null
            inputImageCard.value = null
            showToastMessage(response.message)

        }
        catch (error) {
            showToastError(error.message)
        }


        // setIsOpenCreateCard(false)

    }

    async function handleDeleteCard() {
        // thực hiện xóa đi => 

        const eCheckboxCards = document.querySelectorAll('[data-id-card]')
        const checkedCheckboxes = Array.from(eCheckboxCards).filter(checkbox => checkbox.checked)
        const idCards = checkedCheckboxes.map(checkedCheckbox => checkedCheckbox.value)
        console.log(idCards)
        if (idCards.length == 0) {
            showToastError('Bạn chưa chọn thẻ nào!')
            return
        }

        const queryString = idCards.map(id => `ids=${encodeURIComponent(id)}`).join('&')
        const subUrl = `/cards?${queryString}`
        try {
            const { message } = await fetchData(subUrl, 'DELETE')
            // sau khi xóa xong => load lại
            await getDetailCommonDeck(detailCommonDeck.id) // load lại bộ thẻ hiện tại.
            showToastMessage(message)
        }
        catch (error) {
            showToastError("Xóa thẻ thất bại")
        }

    }

    function handleCheckAllCards(event) {
        const checked = event.target.checked
        // truy vấn ra toàn bộ những thẻ đang tồn tại có data-id-card và xét giá trị theo checked 
        const eCheckboxCards = document.querySelectorAll('[data-id-card]')
        eCheckboxCards.forEach(eCheckboxCard => {
            eCheckboxCard.checked = checked
        })
    }
    const [card, setCard] = useState()



    async function getCard(idCard) {
        const subUrl = `/cards/${idCard}`
        try {
            const { data } = await fetchData(subUrl, 'GET')
            setCard(data)
            console.log(data)
        }
        catch (error) {
            showToastError(error.message)
        }
    }



    async function handleEditCard(event, idCard) {
        // show lên modal hiệu chỉnh card => copy về
        // trước tiên cần lấy thẻ về => sau đó hiệu chỉnh thoải mái
        /// trước tiên cần đợi để lấy về => khi nhấn vào submit +> hàm mới được gọi. 
        event.preventDefault()
        const accessToken = localStorage.getItem('accessToken')

        const url = `${baseUrl}/cards/${card.id}` // dựa vào id
        const formData = new FormData()

        const inputTermCard = document.getElementById('edit-card-term')
        const inputDefinitionCard = document.getElementById('edit-card-definition')
        const inputExampleCard = document.getElementById('edit-card-example')
        const inputImageCard = document.getElementById('edit-card-image')
        const inputAudioCard = document.getElementById('edit-card-audio')



        formData.append('term', inputTermCard.value)
        formData.append('definition', inputDefinitionCard.value)
        formData.append('example', inputExampleCard.value)

        if (inputAudioCard.files.length > 0) {
            formData.append('audio', inputAudioCard.files[0])
        }
        if (inputImageCard.files.length > 0) {
            formData.append('image', inputImageCard.files[0])
        }

        try {
            const jsonRp = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: formData
            })
            const { message } = await jsonRp.json()
            if (!jsonRp.ok) {
                throw new Error(message)
            }
            await getDetailCommonDeck(detailCommonDeck.id)
            setIsOpenEditCard(false)
            showToastMessage(message)

        }
        catch (error) {
            const { message } = error
            showToastError(message)
        }
    }


    useEffect(() => {

        getCommonDecks()

        // load lên dữ liệu 

    }, [])


    const [isOpenEditCommonDeck, setIsOpenEditCommonDeck] = useState(false)

    async function handleEditCommonDeck(event) {
        event.preventDefault() // ngăn chặn không cho nó submit
        const subUrl = `/common-decks/${detailCommonDeck.id}`
        try {
            const body = {
                name: document.getElementById('edit-common-deck-name').value,
                description: document.getElementById('edit-common-deck-description').value
            }
            console.log(body)
            const { message } = await fetchData(subUrl, 'PUT', body)
            await getCommonDecks()
            showToastMessage(message)
        } catch (error) {
            showToastError(error.message)
        }
    }



    async function handleDeleteCommonDeck(idCommonDeck) {
        const subUrl = `/common-decks/${idCommonDeck}`
        try {
            const { message } = await fetchData(subUrl, 'DELETE')
            await getCommonDecks()
            showToastMessage(message)
        } catch (error) {
            showToastError(error.message)
        }
    }





    const stylesModalParent = {
        content: {

            width: '1000px',
            height: '580px',
            top: '55%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '40px',
            borderRadius: '8px',
            backgroundColor: 'while',
            border: '0px',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',

        },
    }


    const stylesModalCreateCommonDeck = {
        content: {
            width: '1000px',
            height: '580px',
            top: '55%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '40px',
            borderRadius: '8px',
            backgroundColor: 'while',
            border: '0px',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
        },
    }

    const stylesModalCard = {
        content: {
            width: '1000px',
            height: '580px',
            top: '55%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '40px',
            borderRadius: '8px',
            backgroundColor: 'while',
            border: '0px',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
        },
    }

    return <div>
        {
            location.pathname.includes('owner') && <div className="flex justify-end">
                <button className="mb-4">
                    <img
                        onClick={() => setIsOpenCreateCommonDeck(true)}
                        src='/plus.png'
                        className='w-9'
                        alt=''
                    />
                </button>
            </div>
        }


        {/* hiển thị danh sách bộ thẻ ở đây. */}

        {commonDecks &&
            <div className=''>
                <div className="relative overflow-x-auto sm:rounded-lg">

                    {commonDecks.length != 0 ?
                        (<table className="w-full text-sm text-left rtl:text-right text-gray-500 mb-24">
                            {/* <thead className="text-sm text-gray-700 uppercase">
                                <tr>
                                  
                                    <th scope="col" className="px-8 py-5 font-light">
                                        Tên
                                    </th>
                                    <th scope="col" className="px-8 py-5 font-light">
                                        Số thẻ
                                    </th>
                                    <th scope="col" className="px-8 py-5 font-light">
                                        Ngày tạo
                                    </th>
                    
                                </tr>   
                            </thead> */}
                            <tbody>
                                {commonDecks.map((commonDeck, index) => (
                                    <tr onClick={() => {
                                        setIsOpenDetailCommonDeck(true)
                                        getDetailCommonDeck(commonDeck.id)

                                    }} key={index} className="odd:bg-gray-100 even:bg-white">
                                        <th scope="row" className="px-8 py-5 text-gray-900 text-sm uppercase whitespace-nowrap">
                                            {commonDeck.name}
                                        </th>
                                        <td className="font-medium px-8 py-5">
                                            {commonDeck.quantityCards} thẻ
                                        </td>
                                        <td className="font-medium px-8 py-5">
                                            {commonDeck.createAt}
                                        </td>
                                        {
                                            location.pathname.includes('owner') && <td className="font-medium px-8 py-5">
                                                <button onClick={event => {
                                                    event.stopPropagation()
                                                    handleDeleteCommonDeck(commonDeck.id)
                                                }}><i className="fa-solid fa-trash"></i></button>
                                            </td>
                                        }

                                        {
                                            location.pathname.includes('owner') && <td className="font-medium px-8 py-5">

                                                <button onClick={(event) => {
                                                    event.stopPropagation()
                                                    setIsOpenEditCommonDeck(true)
                                                    getDetailCommonDeck(commonDeck.id)
                                                }}><i className="fa-solid fa-pen"></i></button>
                                            </td>
                                        }


                                    </tr>
                                ))}

                            </tbody>
                        </table>


                        ) : (<Empty/>)
                    }
                    {/* <hr className='my-4' /> */}
                </div>

                {/* ))} */}
            </div>
        }


        {/* edit common Deck */}
        <Modal
            isOpen={isOpenEditCommonDeck}
            onRequestClose={() => setIsOpenEditCommonDeck(false)}
            contentLabel='Custom Modal'
            style={stylesModalParent}
        >
            <form onSubmit={handleEditCommonDeck} className=''>
                <div className='flex justify-between'>
                    <h3 className='text-gray-800 text-2xl font-bold'>Hiệu chỉnh học phần</h3>
                    <button onClick={() => setIsOpenCreateCommonDeck(false)} type='button'>
                        <img src='/close.png' className='w-5 h-5' alt='' />
                    </button>
                </div>

                <hr className='my-4' />

                <div className='mt-6'>
                    <div className='flex flex-col gap-y-2 w-full'>
                        <label className='text-sm text-gray-600 font-bold' htmlFor=''>
                            Tên
                        </label>
                        <input
                            defaultValue={detailCommonDeck?.name}
                            id="edit-common-deck-name"
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
                            defaultValue={detailCommonDeck?.description}
                            id="edit-common-deck-description"
                            type='text'
                            className='h-10 px-4 rounded-lg'
                            required
                        />
                    </div>
                </div>

                <hr className='my-4' />
                <div className='mt-4 flex justify-end items-center'>
                    {/* checkbox public => công khai lớp hay không */}

                    <button
                        type='submit'
                        className='h-10 w-full items-center gap-x-2 px-8 text-sm text-center text-white font-bold rounded-md bg-primary sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300'
                    >
                        Hiệu chỉnh
                    </button>
                </div>
            </form>
        </Modal>


        <Modal
            isOpen={isOpenCreateCommonDeck}
            onRequestClose={() => setIsOpenCreateCommonDeck(false)}
            contentLabel='Custom Modal'
            style={stylesModalCreateCommonDeck}
        >
            <form onSubmit={handleCreateCommonDeck} className=''>
                <div className='flex justify-between'>
                    <h3 className='text-gray-800 text-2xl font-bold'>Tạo học phần</h3>
                    <button onClick={() => setIsOpenCreateCommonDeck(false)} type='button'>
                        <img src='/close.png' className='w-5 h-5' alt='' />
                    </button>
                </div>

                <hr className='my-4' />

                <div className='mt-6'>
                    <div className='flex flex-col gap-y-2 w-full'>
                        <label className='text-sm text-gray-600 font-bold' htmlFor=''>
                            Tên
                        </label>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
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
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            type='text'
                            className='h-10 px-4 rounded-lg'
                            required
                        />
                    </div>
                </div>

                <hr className='my-4' />
                <div className='mt-4 flex justify-end items-center'>
                    {/* checkbox public => công khai lớp hay không */}

                    <button
                        type='submit'
                        className='h-10 w-full items-center gap-x-2 px-8 text-sm text-center text-white font-bold rounded-md bg-primary sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300'
                    >
                        Tạo
                    </button>
                </div>
            </form>
        </Modal>


        {/* modal detail common deck */}
        <Modal
            isOpen={isOpenCreateCommonDeck}
            onRequestClose={() => setIsOpenCreateCommonDeck(false)}
            contentLabel='Custom Modal'
            style={stylesModalCreateCommonDeck}
        >
            <form onSubmit={handleCreateCommonDeck} className=''>
                <div className='flex justify-between'>
                    <h3 className='text-gray-800 text-2xl font-bold'>Tạo học phần</h3>
                    <button onClick={() => setIsOpenCreateCommonDeck(false)} type='button'>
                        <img src='/close.png' className='w-5 h-5' alt='' />
                    </button>
                </div>

                <hr className='my-4' />

                <div className='mt-6'>
                    <div className='flex flex-col gap-y-2 w-full'>
                        <label className='text-sm text-gray-600 font-bold' htmlFor=''>
                            Tên
                        </label>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
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
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            type='text'
                            className='h-10 px-4 rounded-lg'
                            required
                        />
                    </div>
                </div>

                <hr className='my-4' />
                <div className='mt-4 flex justify-end items-center'>
                    {/* checkbox public => công khai lớp hay không */}

                    <button
                        type='submit'
                        className='h-10 w-full items-center gap-x-2 px-8 text-sm text-center text-white font-bold rounded-md bg-primary sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300'
                    >
                        Tạo
                    </button>
                </div>
            </form>
        </Modal>


        <Modal
            isOpen={isOpenDetailCommonDeck}
            onRequestClose={() => setIsOpenDetailCommonDeck(false)}
            contentLabel='Custom Modal'
            style={stylesModalParent}
        >
            {detailCommonDeck && <div className="">

                {/* Hiển thị thông tin bộ thẻ */}

                <div className="flex items-center gap-x-4">
                    {/* <div className='rounded-full h-10 w-10 overflow-hidden cursor-pointer'>
                        <img src={detailCommonDeck.user.avatar ? detailDeck.user.avatar : '/user.png'} loading="lazy" className='w-full h-full' alt='' />
                    </div> */}
                    <div className="flex flex-col gap-y-2 flex-1">
                        <div className="flex gap-x-2 items-center">
                            <span className="font-bold text-xl">{detailCommonDeck.name}</span>
                            <span>({detailCommonDeck.quantityCards} thẻ)</span>
                        </div>

                        <div className="flex items-center gap-x-3">
                            <span className="font-light text-sm">{detailCommonDeck.group.name}</span>
                            <span className="text-xs bg-gray-300 p-1 rounded-lg">Giáo viên</span>
                        </div>
                        <div className="mt-2 text-gray-700 text-sm text-ellipsis overflow-hidden whitespace-nowrap">{detailCommonDeck.description}</div>
                    </div>

                    <div className="flex gap-x-4">
                        <button onClick={() => setIsOpenCreateCard(true)} className="w-32 flex items-center justify-center gap-x-2 h-8 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 text-center">
                            <span>Thêm thẻ</span>

                            <i className="fa-solid fa-download"></i>
                        </button>
                        <button onClick={handleDeleteCard} className="w-32 flex items-center justify-center gap-x-2 h-8 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 text-center">
                            <span>Xóa thẻ</span>

                            <i className="fa-solid fa-trash"></i>
                        </button>
                        <Link to={`/common-decks/${detailCommonDeck.id}/learn-cards`} className="w-32 flex items-center justify-center gap-x-2 h-8 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 text-center">
                            <span>Học thẻ</span>
                            {/* chuyển người dùng tới phần học thẻ */}
                            <i className="fa-solid fa-graduation-cap"></i>
                        </Link>
                    </div>
                </div>


                <hr className="my-4" />


                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-sm text-gray-700 uppercase">
                        <tr>
                            <th className="px-3">
                                <input onChange={handleCheckAllCards} type="checkbox" className="w-4 h-4" />
                            </th>
                            <th scope="col" className="px-6 py-5">
                                Thuật ngữ
                            </th>
                            <th scope="col" className="px-6 py-5">
                                Định nghĩa
                            </th>
                            <th scope="col" className="px-6 py-5">
                                Example
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {detailCommonDeck.cards.map((card, index) => (
                            <tr key={index} className="odd:bg-gray-100 even:bg-white">
                                <th className="px-3">
                                    <input data-id-card value={card.id} type="checkbox" className="w-4 h-4" />
                                </th>
                                <td className="px-6 py-5 font-medium">
                                    {card.term}
                                </td>
                                <td className="px-6 py-5">
                                    {card.definition}
                                </td>
                                <td className="px-6 py-5">
                                    {card.example ? card.example : 'None'}
                                </td>
                                <th className="px-6 py-5">
                                    <button onClick={async () => {
                                        await getCard(card.id)
                                        setIsOpenEditCard(true)

                                    }}>
                                        <i className="fa-solid fa-pen"></i>
                                    </button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>}


            {/* Thêm card vào */}
            <Modal
                isOpen={isOpenCreateCard}
                onRequestClose={() => setIsOpenCreateCard(false)}
                contentLabel='Custom Modal'
                style={stylesModalCard}
            >
                {/* <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40"> */}
                <div>
                    <div className="p-6">
                        <button onClick={() => setIsOpenCreateCard(false)} className="pr-2">
                            <i className="fa-solid fa-arrow-left text-3xl"></i>
                        </button>
                    </div>
                    <form onSubmit={handleCreateCard} className="site-create rounded-lg p-6">
                        <div className="flex items-center justify-between gap-x-8">
                            <div className="w-full border-r pr-6 border-gray-400">
                                <div className="flex-col md:flex-row flex justify-between gap-x-16 mt-4">
                                    <div className="flex flex-col w-full gap-y-3">
                                        <label htmlFor="card-term">Term</label>
                                        <input id="card-term" className="bg-transparent h-10 px-4" type="text" />
                                    </div>

                                    <div className="mt-4 md:mt-0 flex flex-col w-full gap-y-3">
                                        <label htmlFor="">Definition</label>
                                        <input id="card-definition" className="bg-transparent h-10 px-4" type="text" />

                                    </div>
                                </div>
                                <div className="flex-col md:flex-row flex justify-between gap-x-16 mt-4">
                                    <div className="flex flex-col w-full gap-y-3">
                                        <label htmlFor="">Example</label>
                                        <input id="card-example" className="bg-transparent h-10 px-4" type="text" />
                                    </div>
                                    <div className="mt-4 md:mt-0 flex flex-col w-full gap-y-3">
                                        <label>Deck</label>
                                        <input readOnly value={detailCommonDeck?.name} type="text" className="bg-transparent h-10 px-4" />
                                    </div>
                                </div>
                            </div>
                            <div className="site-file flex flex-col gap-y-3">
                                <span>Iamge</span>
                                <input id="card-image" type="file" />
                                <span>Audio</span>
                                <input id="card-audio" type="file" />
                            </div>
                        </div>

                        <hr className="my-12"></hr>
                        <div className='flex justify-between items-center'>


                            {/* chỉ có chủ của gr mới tạo được */}
                            {/* owner */}



                            <button className='bg-green-500 hover:bg-green-400 text-white h-10 w-24 justify-center border-b-4 border-green-700 hover:border-green-500 rounded flex items-center gap-x-2'>
                                <span className='text-sm'>Create card</span>
                                <i className="hidden md:block fa-solid fa-plus"></i>
                            </button>
                        </div>
                    </form>
                </div>
                {/* </div> */}
            </Modal>

            {/* Hiệu chỉnh card */}

            <Modal
                isOpen={isOpenEditCard}
                onRequestClose={() => setIsOpenEditCard(false)}
                contentLabel='Custom Modal'
                style={stylesModalCard}
            >
                {/* <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40"> */}

                <div>
                    <div className="p-6">
                        <button onClick={() => setIsOpenEditCard(false)} className="pr-2">
                            <i className="fa-solid fa-arrow-left text-3xl"></i>
                        </button>
                    </div>
                    <form onSubmit={handleEditCard} className="site-create rounded-lg p-6">
                        <div className="flex items-center justify-between gap-x-8">
                            <div className="w-full border-r pr-6 border-gray-400">
                                <div className="flex-col md:flex-row flex justify-between gap-x-16 mt-4">
                                    <div className="flex flex-col w-full gap-y-3">
                                        <label htmlFor="card-term">Term</label>
                                        <input defaultValue={card?.term} id="edit-card-term" className="bg-transparent h-10 px-4" type="text" />
                                    </div>

                                    <div className="mt-4 md:mt-0 flex flex-col w-full gap-y-3">
                                        <label htmlFor="">Definition</label>
                                        <input defaultValue={card?.definition} id="edit-card-definition" className="bg-transparent h-10 px-4" type="text" />

                                    </div>
                                </div>
                                <div className="flex-col md:flex-row flex justify-between gap-x-16 mt-4">
                                    <div className="flex flex-col w-full gap-y-3">
                                        <label htmlFor="">Example</label>
                                        <input defaultValue={card?.example} id="edit-card-example" className="bg-transparent h-10 px-4" type="text" />
                                    </div>
                                    <div className="mt-4 md:mt-0 flex flex-col w-full gap-y-3">
                                        <label>Deck</label>
                                        <input readOnly value={detailCommonDeck?.name} type="text" className="bg-transparent h-10 px-4" />
                                    </div>
                                </div>
                            </div>
                            <div className="site-file flex flex-col gap-y-3">
                                <span>Image</span>
                                <input id="edit-card-image" type="file" />
                                <span>Audio</span>
                                <input id="edit-card-audio" type="file" />
                            </div>
                        </div>

                        <hr className="my-12"></hr>
                        <div className='flex justify-between items-center'>



                            <button className='bg-green-500 hover:bg-green-400 text-white h-10 w-24 justify-center border-b-4 border-green-700 hover:border-green-500 rounded flex items-center gap-x-2'>
                                <span className='text-sm'>Edit</span>
                                <i className="hidden md:block fa-solid fa-plus"></i>
                            </button>
                        </div>
                    </form>
                </div>



            </Modal>

        </Modal>

        <ToastContainer />



    </div>
}