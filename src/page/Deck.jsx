import { Outlet } from 'react-router-dom'




function Deck() {
  return (
    <div className='mx-4 md:mx-24 mt-28'>
      <Outlet />
    </div>
  )

}
export default Deck