import { useEffect, useState } from 'react'
import { fetchData, showToastError, showToastMessage } from '../global'
import { ToastContainer } from 'react-toastify'
import Modal from 'react-modal'
import Empty from './Empty'
import { Link } from 'react-router-dom'
import { customFormatDistanceToNow } from '../global'

export default function GlobalDecks() {
  const [isShowDetailDeck, setIsShowDetailDeck] = useState(false); 
  const [decks, setDecks] = useState(); 

  const [searchTerm, setSearchTerm] = useState();
  const [detailDeck, setDetailDeck] = useState();

  const appElement = document.getElementById('root');
  Modal.setAppElement(appElement);

  async function getDeck(idDeck) {
    const subUrl = `/decks/${idDeck}`;
    try {
      const { data } = await fetchData(subUrl, 'GET');
      setDetailDeck(data);
      setIsShowDetailDeck(true);
      console.log(data)
    } catch (error) {
      showToastError(error.message)
    }
  }

  async function getDecks() {
    try {
      const subUrl = '/global/decks'
      const { data } = await fetchData(subUrl, 'GET')
      setDecks(data)
    } catch (error) {
      showToastError(error.message)
    }
  }

  async function handleCloneDeck() {
    try {
      const subUrl = `/decks/${detailDeck.id}/clone`
      const { message } = await fetchData(subUrl, 'POST')
      showToastMessage(message)
    } catch (error) {
      showToastError(error.message)
    }
  }

  useEffect(() => {
    getDecks()
  }, [])

  // useEffect(() => {

    
  //   if (searchTerm == '') { 
  //     getDecks()
  //   }

  //   else { 
  //     if (decks != null) { 
  //       const searchDecks = decks.filter(deck =>
  //         deck.name.toLowerCase()?.includes(searchTerm?.toLowerCase())
  //       )
  //       setDecks(searchDecks);
  //     }
  //   }
  // }, [decks, searchTerm])

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
    },
  }

  return (
    decks && (
      <>
        <div className='profile flex gap-x-3 items-center justify-between h-12'>
          <span className='font-medium uppercase text-sm'>Expert card set</span>
          <div className='flex gap-x-8 items-center'>
            <div className='max-w-md mx-auto'>
              <div className='relative'>
                <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                  <svg
                    className='w-4 h-4 text-gray-500'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 20 20'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                    />
                  </svg>
                </div>
                <input
                  onChange={(event) => {
                    setSearchTerm(event.target.value)
                  }}
                  type='search'
                  id='decks-search'
                  className='block w-full  px-4 h-10 ps-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
                  placeholder='Name, description...'
                />
              </div>
            </div>
          </div>
        </div>

        <hr className='my-8 dark:opacity-10'></hr>

        {decks.length != 0 ? (
          <div className='mb-12 grid grid-cols-2 gap-12'>
            {decks.map((deck, index) => (
              <div key={index}>
                <span className='text-xs uppercase'>
                  {customFormatDistanceToNow(deck.createdDate)}
                </span>
                <div className='bg-[#F0F6F6] p-6 rounded mt-2'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-x-4'>
                      <div className='rounded-full h-10 w-10 overflow-hidden cursor-pointer'>
                        <img
                          src={
                            deck.user.avatar ? deck.user.avatar : '/user.png'
                          }
                          loading='lazy'
                          className='w-full h-full'
                          alt=''
                        />
                      </div>
                      <div className='flex flex-col gap-y-2'>
                        <div className='flex gap-x-2 items-center'>
                          <span className='font-bold text-xl'>{deck.name}</span>
                          <span>({deck.quantityClones} clone - {deck.quantityCards} card)</span>
                        </div>

                        <div className='flex items-center gap-x-3'>
                          <Link
                            to={`/users/${deck.user.email}`}
                            className='text-sm underline text-blue-600'
                          >
                            {deck.user.firstName + ' ' + deck.user.lastName}
                          </Link>

                          {deck.user.roles.map((role, index) => {
                            return (
                              <span key={index}>
                                <span className='lowercase text-xs bg-gray-300 p-1 rounded-lg'>
                                  {role}
                                </span>
                              </span>
                            )
                          })}
                        </div>
                        <div className='mt-2 text-gray-700 text-sm text-ellipsis overflow-hidden whitespace-nowrap'>
                          {deck.description}
                        </div>
                      </div>
                    </div>
                    <div className='flex gap-x-2 flex-col'>
                      <button
                        onClick={() => getDeck(deck.id)}
                        className='flex items-center gap-x-2 h-8 text-blue-900 hover:text-white border border-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 text-center'
                      >
                        <span>Detail</span>
                        <i className='fa-regular fa-eye'></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Empty />
        )}

        <Modal
          isOpen={isShowDetailDeck}
          onRequestClose={() => setIsShowDetailDeck(false)}
          contentLabel='Custom Modal'
          style={stylesModal}
        >
          {detailDeck?.cards.length != 0 ? (
            <div className=''>
              <div className='flex items-center gap-x-4'>
                <div className='rounded-full h-10 w-10 overflow-hidden cursor-pointer'>
                  <img
                    src={
                      detailDeck?.user.avatar
                        ? detailDeck?.user.avatar
                        : '/user.png'
                    }
                    loading='lazy'
                    className='w-full h-full'
                    alt=''
                  />
                </div>
                <div className='flex flex-col gap-y-2 flex-1'>
                  <div className='flex gap-x-2 items-center'>
                    <span className='font-bold text-xl'>
                      {detailDeck?.name}
                    </span>
                    <span>({detailDeck?.quantityCards} thẻ)</span>
                  </div>

                  <div className='flex items-center gap-x-3'>
                    <Link
                      to={`/users/${detailDeck?.user.email}`}
                      className='font-light text-sm text-blue-600 underline'
                    >
                      {detailDeck?.user.firstName +
                        ' ' +
                        detailDeck?.user.lastName}
                    </Link>

                    {detailDeck?.user.roles.map((role, index) => {
                      return (
                        <span key={index}>
                          <span className='text-xs bg-gray-300 p-1 rounded-lg'>
                            {role}
                          </span>
                        </span>
                      )
                    })}
                  </div>
                  <div className='mt-2 text-gray-700 text-sm text-ellipsis overflow-hidden whitespace-nowrap'>
                    {detailDeck?.description}
                  </div>
                </div>

                <div className='flex gap-x-2 items-center'>
                  <span className='text-sm'>
                    {detailDeck?.quantityClones} clone
                  </span>
                  <button
                    onClick={handleCloneDeck}
                    className='flex items-center gap-x-2 h-8 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 text-center'
                  >
                    <span>Clone</span>

                    <i className='fa-solid fa-download'></i>
                  </button>
                </div>
              </div>

              <hr className='my-4 dark:opacity-10' />

              <table className='w-full text-sm text-left rtl:text-right text-gray-500 h-[100px] overflow-y-scroll'>
                <thead className='text-sm text-gray-700 uppercase'>
                  <tr>
                    <th scope='col' className='px-6 py-5'>
                      Term
                    </th>
                    <th scope='col' className='px-6 py-5'>
                      definition
                    </th>
                    <th scope='col' className='px-6 py-5'>
                      Example
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {detailDeck?.cards.map((card, index) => (
                    <tr key={index} className='odd:bg-gray-100 even:bg-white'>
                      <td className='px-6 py-5 font-medium'>{card.term}</td>
                      <td className='px-6 py-5'>{card.definition}</td>
                      <td className='px-6 py-5'>
                        {card.example ? card.example : 'None'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Empty />
          )}
        </Modal>

        <ToastContainer />
      </>
    )
  )
}
