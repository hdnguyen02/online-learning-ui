import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { fetchData, showToastError, showToastMessage } from "../global" 
import { useParams } from "react-router-dom"


export default function AddMember() {
  
  const params = useParams()


  const [email, setEmail] = useState('')

  const handleChangeEmail = (event) => {
    setEmail(event.target.value)
  };



  const handleInvite = async (event) => {
    event.preventDefault()

    const id = params.id
    const subUrl = `/groups/${id}/invite?email-user=${email}`
 
    try {
      await fetchData(subUrl, 'POST')
      // nếu không quăng ra lỗi.
      showToastMessage('Gửi lời mời thành công')
    }
    catch (error) {   
      showToastError(error.message)
    }
  }

  return (
    <form onSubmit={handleInvite}>
      <label htmlFor="email">
        <p className="font-medium text-slate-700 pb-2">Địa chỉ email</p>
        <input onChange={handleChangeEmail} id="email" name="email" type="email" className="w-full py-2 rounded-lg px-3" placeholder="Enter email address" />
      </label>
      <div className='flex justify-end mt-4'>
        <button type="submit" className='flex items-center gap-x-2 h-10 px-5 text-sm text-center text-white rounded-md bg-blue-500 sm:w-fit hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300'>
          <span className='text-sm'>Gửi lời mời</span>
        </button>
      </div>
      <ToastContainer />
    </form>
  )

}
