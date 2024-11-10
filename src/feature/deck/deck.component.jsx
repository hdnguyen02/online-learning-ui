import { Outlet } from 'react-router-dom'

function Deck() {
  return (
    <div className='mx-4 md:mx-48 mt-28 mb-28'>
      <Outlet />
    </div>
  )
}
export default Deck