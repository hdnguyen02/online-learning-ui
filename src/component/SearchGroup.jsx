import { useEffect, useState } from "react"
import { fetchData } from "../global"
import { Link } from "react-router-dom"


function SearchClass() {

  const [searchTerm, setSearchTerm] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [groups, setGroups] = useState([])


  function renderGroups() {
    return groups.map((group, index) => {
      return <Link to={'/groups/' + group.id} key={index} className="px-6 py-2 flex justify-between items-center">
        <span>{group.name}</span>
        <i className="fa-solid fa-arrow-trend-up"></i>
      </Link>


    })
  }

  const handleSearch = async () => {

    setSearchTerm(searchTerm.trim())
    if (searchTerm == '') {
      setShowSearch(false)
      return
    }

    const subUrl = '/global/groups?searchTerm=' + searchTerm
    const { data } = await fetchData(subUrl, 'GET')
    setGroups(data)

    if (groups.length != 0) setShowSearch(true)
    else setShowSearch(false)

  }

  useEffect(() => {
    handleSearch()
  }, [searchTerm])

  function handleOnBlur() {
    setTimeout(() => {
      document.getElementById('group-search').value = ''
      setShowSearch(false)
      setGroups([])
    }, 300)

  }

  return <div className=''>
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
        onChange={e => setSearchTerm(e.currentTarget.value)}
        onBlur={handleOnBlur}
        type='search'
        id='group-search'
        placeholder="Nhóm học tập..."
        className='block w-60  px-4 h-10 ps-10 text-sm text-gray-900 border border-gray-300 rounded-3xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
      />
      {
        showSearch && <div className="top-12 absolute bg-white w-60 h-52 rounded-md shadow-lg overflow-y-scroll py-3">
          {renderGroups()}
        </div>
      }
    </div>



  </div>
}

export default SearchClass