import { useState } from "react"
import { fetchData, showToastError, showToastMessage } from "../global"
import { ToastContainer } from "react-toastify"

export default function ChangePW() {


  const [newPW, setNewPW] = useState()
  const [confirmPw, setComfirmPW] = useState()
  
  async function handleChangePW(event) {
    event.preventDefault()

    if (newPW != confirmPw) {
      showToastError("Mật khẩu và mật khẩu xác nhận không chính xác")
      return 
    }
    else { 
      try {
        const subUrl = '/users/password'
        const {message} = await fetchData(subUrl, 'PUT', {newPassword: newPW})
        showToastMessage(message)
      }
      catch(error) { 
        const {message} = error
        showToastError(message)
      }
    }
    
    
  }

  return <section className="">
  <div className="flex flex-col items-center px-6 py-8 mx-auto lg:py-0">
   
    <div className="w-full p-6 rounded-lg shadow-xl md:mt-0 sm:max-w-md sm:p-8">
      <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
        Thay đổi mật khẩu
      </h2>
      <form onSubmit={handleChangePW} className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
       
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Mật khẩu mới
          </label>
          <input
            onChange={event => setNewPW(event.target.value)}
            type="password"
            name="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            htmlFor="confirm-password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Xác nhận mật khẩu
          </label>
          <input
          onChange={event => setComfirmPW(event.target.value)}
            type="password"
            name="confirm-password"
            id="confirm-password"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            required
          />
        </div>
        <div className="flex items-start">

          
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
         Đặt lại mật khẩu
        </button>
      </form>
    </div>
  </div>
  <ToastContainer/>
</section>

}