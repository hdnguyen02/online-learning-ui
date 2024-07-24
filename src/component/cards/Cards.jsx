import React, { useMemo,useState, useEffect,useRef } from 'react';
import TableComponent from './TableComponent'
import { fetchData, showToastError, showToastMessage } from '../../global';
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


    // hàm thêm thẻ.



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
      accessor: 'createAt',
      Cell: ({ value }) => new Date(value).toLocaleDateString(),
    },
    {
      Header: 'Favourite',
      accessor: 'isFavourite',
      Cell: ({ value }) => (value ? 'Yes' : 'No'),
    },
    {
      Header: 'Remembered',
      accessor: 'isRemembered',
      Cell: ({ value }) => (value ? 'Yes' : 'No'),
    },
    {
      Header: 'Deck',
      accessor: 'deck.name',
    },
    {
      Header: 'Actions',
      Cell: ({ row }) => (
        <div>
          <button onClick={() => handleEdit(row.original.id)}><i class="fa-regular fa-pen-to-square"></i></button>
          <button onClick={() => handleDelete(row.original.id)} className='ml-2'><i className="fa-solid fa-trash"></i></button>
        </div>
      ),
  },
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
