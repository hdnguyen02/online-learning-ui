import { Outlet } from "react-router-dom"

export default function GlobalDeckComponent() {
    return <div className='mx-4 md:mx-48 mt-28'>
        <Outlet />
  </div>
}