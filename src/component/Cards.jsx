
import { useRef, useState, useEffect } from 'react'
import { fetchData, convertValueFromSelect } from '../global'
import Success from './Success'
import Fail from './Fail'
import ModalCreateCard from './ModalCreateCard'
import ModelEditCard from './ModelEditCard'

export default function Cards() {

    const [cards, setCards] = useState()

    async function getCards() {
        const subUrl = '/cards'
        try {
            const response = await fetchData(subUrl, 'GET')
            setCards(response.data)
        }
        catch (error) {
            console.log(error.message)
        }
    }
    const [decks, setDecks] = useState()
    const refSuccess = useRef()
    const refFail = useRef()
    const refModalCreateCard = useRef()
    const refModelEditCard = useRef()
    const [searchContent, setSearchContent] = useState('')
    const [showFilterDeck, setShowFilterDeck] = useState()
    const [showFilterIsRemember, setShowFilterIsRemember] = useState()
    const [showFilterisFavourite, setShowFilterisFavourite] = useState()


    async function getDecks() {
        try {
            const subUrl = '/decks'
            const response = await fetchData(subUrl, 'GET')
            setDecks(response.data)
        }
        catch (error) { console.log(error.message) }
    }

    function handleEditCard(event, idCard) {
        refModelEditCard.current.show(idCard)
    }


    async function handleShowModalCreateCard() {
        refModalCreateCard.current.show()
    }



    async function handleFilter(event) {
        const idDeck = convertValueFromSelect(document.getElementById('filter-deck').value) // nếu là null thì vẫn là null thôi. 
        const isFavourite = convertValueFromSelect(document.getElementById('filter-is-favourite').value)
        const isRemembered = convertValueFromSelect(document.getElementById('filter-is-remembered').value)


        const target = event.target
        const field = target.name


        if (field == 'filter-deck') {
            // render nó ra. 
            if (idDeck) {
                // tìm ra tên của nó 
                const deck = decks.find(deck => deck.id === +idDeck)
                // nối chuỗi vào. 
                setShowFilterDeck('Bộ thẻ: ' + deck.name)
            }
            else {
                setShowFilterDeck(null) // không có show ra. 
            }
        }
        else if (field == 'filter-is-favourite') {
            if (isFavourite != null) {
                setShowFilterisFavourite('Yêu thích: ' + isFavourite)
            }
            else {
                setShowFilterisFavourite(null)
            }
        }
        else if (field == 'filter-is-remembered') {
            if (isRemembered != null) {
                setShowFilterIsRemember('Đã nhớ: ' + isRemembered)
            }
            else {
                setShowFilterIsRemember(null)
            }

        }


        let subUrl = `/cards/filter?`
        if (idDeck) subUrl += `idDeck=${idDeck}`
        if (isFavourite != null) subUrl += `&isFavourite=${isFavourite}`
        if (isRemembered != null) subUrl += `&isRemembered=${isRemembered}`

        try {
            const response = await fetchData(subUrl, 'GET')
            setCards(response.data)
        }
        catch (error) { console.log(error.message) }
    }

    function handleCheckAll(event) {
        const checkboxCards = document.querySelectorAll('input[name="checkbox-card"]')
        const target = event.target
        checkboxCards.forEach(checkboxCard => {
            checkboxCard.checked = target.checked
        })
    }

    async function handleDeleteCards(event) {
        const checkboxCards = document.querySelectorAll('input[name="checkbox-card"]') // trả về nodeList 
        const checkedCheckboxes = Array.from(checkboxCards).filter(checkbox => checkbox.checked);
        const idCards = checkedCheckboxes.map(checkedCheckbox => checkedCheckbox.value)
        if (idCards.length == 0) {
            refFail.current.show('Bạn chưa chọn thẻ nào!', 2000)
            return
        }
        const queryString = idCards.map(id => `ids=${encodeURIComponent(id)}`).join('&')
        const subUrl = `/cards?${queryString}`
        try {
            const response = await fetchData(subUrl, 'DELETE')
            getCards()
            refSuccess.current.show(response.message, 2000)
        }
        catch (error) {
            refFail.current.show('Xóa thẻ thất bại!', 2000)
        }
    }

    function handleDeleteFilter() {
        const slDeck = document.getElementById('filter-deck')
        const slIsFavourite = document.getElementById('filter-is-favourite')
        const slIsRemembered = document.getElementById('filter-is-remembered')
        slDeck.value = slIsFavourite.value = slIsRemembered.value = 'null'
        setShowFilterDeck(null)
        setShowFilterIsRemember(null)
        setShowFilterisFavourite(null)
        getCards()
    }

    useEffect(() => {
        getDecks()
        getCards()
    }, [])

    useEffect(() => {
        async function search() {
            const subUrl = `/cards/search?content=${searchContent}`
            try {
                const response = await fetchData(subUrl, 'GET')
                setCards(response.data)
            }
            catch (error) { console.log(error.message) }
        }
        search()
    }, [searchContent])


    function dropdownFilter() {
        return <form className='menu-dropdown hidden z-10 border px-8 pt-10 pb-16 origin-top-right absolute left-0 w-[500px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
            <div className='flex justify-between'>
                <span className='text-xl font-medium'>Filters</span>
                <button type='button' onClick={handleDeleteFilter} className='text-sm text-red-500 underline'>delete filter</button>
            </div>

            <div className='flex gap-y-4 flex-col mt-4'>

                <p className='text-sm flex items-center gap-x-3'>
                    <i className="fa-solid fa-angle-down"></i>
                    <span>Bộ thẻ</span>
                </p>
                <select onChange={handleFilter} className='h-10 w-full px-3' name="filter-deck" id="filter-deck">
                    <option value="null">-</option>
                    {decks && decks.map((deck) => (
                        <option key={deck.id} value={deck.id}>{deck.name}</option>
                    ))}
                </select>
            </div>
            <div className='flex gap-y-4 flex-col mt-6'>
                <p className='text-sm flex items-center gap-x-3'>
                    <i className="fa-solid fa-angle-down"></i>
                    <span>Yêu thcíh</span>
                </p>
                <select onChange={handleFilter} className='h-10 w-full px-3' name="filter-is-favourite" id="filter-is-favourite">
                    <option value="null">-</option>
                    <option value="false">Không</option>
                    <option value="true">Có</option>
                </select>
            </div>
            <div className='flex gap-y-4 flex-col mt-6'>
                <p className='text-sm flex items-center gap-x-3'>
                    <i className="fa-solid fa-angle-down"></i>
                    <span>Đã nhớ</span>
                </p>
                <select onChange={handleFilter} className='h-10 w-full px-3' name="filter-is-remembered" id="filter-is-remembered">
                    <option value="null">-</option>
                    <option value="false">Không</option>
                    <option value="true">Có</option>
                </select>
            </div>
        </form>
    }

    return <div>
        <ModalCreateCard decks={decks} getCards={getCards} ref={refModalCreateCard} />
        <ModelEditCard decks={decks} getCards={getCards} ref={refModelEditCard} />
        <div className='flex justify-between mt-10'>

            <div className='flex gap-x-8 items-center h-12'>

                <div className='flex items-center gap-x-8'>
                    <button onClick={handleDeleteCards}>
                        <img src="delete.png" className='w-9' alt="" />
                    </button>
                    <button onClick={handleShowModalCreateCard} className=''>
                        <img src="plus.png" className='w-9' alt="" />
                    </button>

                </div>

                {/* search */}
                <button className='flex items-center gap-x-2 h-10 px-5 text-sm text-center text-white rounded-md bg-green-600 sm:w-fit hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-gray-300'>
                    <span className='text-sm'>Học thẻ</span>
                </button>

            </div>
            <div className='flex items-center gap-x-12'>
                <div className='filter-dropdown relative'>
                    <button type="submit" className="h-10 flex items-center gap-x-2 px-5 text-sm text-center text-white rounded-md bg-primary sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300">
                        <i className="fa-solid fa-filter"></i>
                        <span className='pb-[0.5px]'>Lọc</span>
                        <i className="fa-solid fa-angle-down pt-[0.5px]"></i>
                    </button>
                    {dropdownFilter()}
                </div>

                <div className="max-w-md mx-auto">
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input onChange={(event) => {
                            setSearchContent(event.target.value)
                        }} type="search" id="decks-search" className="block w-full  px-4 h-10 ps-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Thuật ngữ, Định nghĩa ..." />
                    </div>
                </div>
            </div>


        </div>

        <hr className='my-8'></hr>

        {cards &&
            <div className=''>
                <div className="relative overflow-x-auto sm:rounded-md">
                    <div className='flex justify-end gap-x-10 text-sm'>
                        {/* render các thuộc tính được chọn => phải giá trị phải khác null */}
                        {/* { 
                            fieldsFilter.map(fieldFilter => (<span>{fieldFilter}</span>))
                        } */}
                        {showFilterDeck &&
                            <div className='bg-[#D6E4FF] py-2 px-4 rounded-3xl text-blue-700 flex gap-x-2 items-center'>
                                <span >{showFilterDeck}</span>
                                <i className="fa-solid fa-xmark"></i>
                            </div>
                        }
                        {
                            showFilterisFavourite &&
                            <div className='bg-[#D6E4FF] py-1 px-4 rounded-3xl text-blue-700 flex gap-x-2 items-center'>
                                <span >{showFilterisFavourite}</span>
                                <i className="fa-solid fa-xmark"></i>
                            </div>
                        }


                        {
                            showFilterIsRemember &&
                            <div className='bg-[#D6E4FF] py-1 px-4 rounded-3xl text-blue-700 flex gap-x-2 items-center'>
                                <span >{showFilterIsRemember}</span>
                                <i className="fa-solid fa-xmark"></i>
                            </div>
                        }

                    </div>
                    {cards.length != 0 ?
                        (<table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-sm text-gray-700 uppercase">
                                <tr>
                                    <th scope="col" className="px-6 py-5 font-medium  text-gray-900 whitespace-nowrap">
                                        <input onChange={handleCheckAll} type='checkbox' />
                                    </th>
                                    <th scope="col" className="px-6 py-5">
                                        Thuật ngữ
                                    </th>
                                    <th scope="col" className="px-6 py-5">
                                        Định nghĩa
                                    </th>
                                    <th scope="col" className="px-6 py-5">
                                        Bộ thẻ
                                    </th>
                                    <th scope="col" className="px-6 py-5">
                                        Ngày tạo
                                    </th>
                                    <th className='text-center'>Hiệu chỉnh</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cards.map(card => (
                                    <tr key={card.id} className="odd:bg-gray-100 even:bg-white">
                                        <th scope="row" className="px-6 py-5 font-medium text-gray-900 whitespace-nowrap">
                                            <input name='checkbox-card' value={card.id} type="checkbox" />
                                        </th>
                                        <td className="px-6 py-5 font-medium">
                                            {card.term}
                                        </td>
                                        <td className="px-6 py-5">
                                            {card.definition}
                                        </td>
                                        <td className="px-6 py-5">
                                            {card.deck.name}
                                        </td>
                                        <td className="px-6 py-5">
                                            {card.createAt}

                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <button
                                                onClick={event => {
                                                    handleEditCard(event, card.id)
                                                }}
                                                type='button'
                                            >
                                                <i className="fa-regular fa-pen-to-square text-xl"></i>
                                            </button>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>)
                        : (<div>
                            <span className='text-sm'>Không có dữ liệu</span>
                        </div>)
                    }
                    {/* <hr className='my-4' /> */}
                </div>
            </div>
        }
        <Success ref={refSuccess} />
        <Fail ref={refFail} />
    </div>
}