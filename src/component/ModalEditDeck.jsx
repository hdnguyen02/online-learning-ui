import React, { useState } from "react"
import { fetchData, showToastMessage, showToastError } from "../global"
import { ToastContainer } from "react-toastify"

const ModelEditDeck = React.forwardRef(({ getDecks }, ref) => {

    const [isShow, setIsShow] = useState(false)
    const [id, setId] = useState()
    const [deck, setDeck] = useState()
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    

    async function show(idDeck) {
        setId(idDeck)
        await getDeck(idDeck)
        setIsShow(true)
    }

    function close() {
        setIsShow(false)
    }

    async function getDeck(idDeck) { 
        const subUrl = `/decks/${idDeck}`
        try { 
            const {data} = await fetchData(subUrl, 'GET')
            setDeck(data)
        }
        catch(error) { 
            showToastError(error.message)
        }
    }

    async function handleEditDeck(event) {
        event.preventDefault()

        const subUrl = `/decks/${id}` 
        const isPublic = document.getElementById('public-checkbox').checked
 
        const body = {name, description, isPublic}
        try { 
            const {message} = await fetchData(subUrl, 'PUT', body)
            await getDecks()
            showToastMessage(message)
            close()
        }
        catch({message}) {
            showToastError(message)
        }
    }

    React.useImperativeHandle(ref, () => ({
        show
    }));

    return (isShow && deck && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
        <div className="bg-white p-6 rounded-lg shadow-lg z-50">
            <div className="flex justify-between px-4 items-center font-bold text-lg">
                <span>Edit card set</span>
                <button onClick={close} className="">
                    <i className="fa-solid fa-xmark text-4xl text-gray-500"></i>
                </button>
            </div>
            {/* form */}    
            <div className="relative w-[500px]">
                <form onSubmit={handleEditDeck} className="relative rounded-md">

                    <div className="p-4 md:p-5 space-y-4">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Name of card set* <span className='text-ctred'>*</span></label>
                            <input defaultValue={deck.name} onChange={event => setName(event.target.value)} id='name-deck' type="text" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="English" />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Description of card set</label>
                            <input defaultValue={deck.description} onChange={event => setDescription(event.target.value)} id='description-deck' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                        </div>
                        <div className="flex items-center mb-4">
                            <input defaultChecked={deck.isPublic} id="public-checkbox" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                            <label htmlFor="public-checkbox" className="ms-2 text-sm font-medium text-gray-900">Public</label>
                        </div>
                    </div>
                  
                    <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b">
                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>
                    </div>
                </form>
            </div>
        </div>
        <ToastContainer/>
    </div>)
})

export default ModelEditDeck