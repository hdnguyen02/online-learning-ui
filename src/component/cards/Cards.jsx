import React, { useMemo,useState, useEffect,useRef } from 'react';
import TableComponent from './TableComponent'
import { fetchData, showToastError, showToastMessage, customFormatDD_MM_YYYY_HH_mm } from '../../global'

import ModalEditCard from './ModalEditCard'
import { ToastContainer } from 'react-toastify'
const App = () => {
    const [data, setData] = useState([])
    const [decks, setDecks] = useState([])
    const refModalEditCard = useRef()

    async function getCards() {
        const subUrl = '/cards'
        try {
            const response = await fetchData(subUrl, 'GET')
            console.log(response)
            setData(response.data)
        }
        catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getCards()
        getDecks()
    }, [])



  const columns = useMemo(() => [
    {
      Header: 'Term',
      accessor: 'term',
    },
    {
      Header: 'Definition',
      accessor: 'definition',
    },
    {
      Header: 'Example',
      accessor: 'example',
    },
    {
      Header: 'Created At',
      accessor: 'createdDate',
      Cell: ({ value }) => customFormatDD_MM_YYYY_HH_mm(value),
    },
    {
      Header: 'Favourite',
      accessor: 'isFavourite',
      Cell: ({ value }) =>
        value ?(
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" checked disabled className="sr-only peer" />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        ) : (
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" disabled className="sr-only peer" />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        ),
    },
    // {
    //   Header: 'Remembered',
    //   accessor: 'isRemembered',
    //   Cell: ({ value }) =>
    //     value ? (
    //       <label className="inline-flex items-center cursor-pointer">
    //         <input type="checkbox" checked disabled className="sr-only peer" />
    //         <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    //       </label>
    //     ) : (
    //       <label className="inline-flex items-center cursor-pointer">
    //         <input type="checkbox" disabled className="sr-only peer" />
    //         <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    //       </label>
    //     ),
    // },
    {
      Header: 'Deck',
      accessor: 'deck.name',
    },
  //   {
  //     Header: 'Action',
  //     Cell: ({ row }) => (
  //       <div className='flex gap-x-4'>
  //         <button onClick={() => handleEdit(row.original.id)}><i class="fa-regular fa-pen-to-square"></i></button>
  //         <button onClick={() => handleDelete(row.original.id)} className='ml-2'><i className="fa-solid fa-trash"></i></button>
  //       </div>
  //     ),
  // },
  ], []) 

  // tiến hành editCard. 

  const handleEdit = (idCard) => {
    refModalEditCard.current.show(idCard)
  }

  async function handleDelete (idCard)  {
    const subUrl = `/cards/${idCard}`
    try { 
        const {message} = await fetchData(subUrl, 'DELETE')
        showToastMessage(message)
        getCards()
    }
    catch({message}) { 
        showToastError(message)
    }
  }

  async function getDecks() {
    try {
        const subUrl = '/decks'
        const response = await fetchData(subUrl, 'GET')
        setDecks(response.data)
    }
    catch (error) { console.log(error.message) }
}



  return (
    <div>
      {/* <h1>My Table</h1> */}
  
      <TableComponent columns={columns}  handleEdit={handleEdit} handleDelete={handleDelete} data={data} getCards={getCards} decks={decks} />
      <ModalEditCard decks={decks} getCards={getCards} ref={refModalEditCard} />
      <ToastContainer />

    </div>
  );
};

export default App
