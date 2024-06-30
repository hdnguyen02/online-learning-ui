
import Success from '../component/Success'
import Fail from '../component/Fail'
import { fetchDataWithoutAccessToken,showToastMessage, showToastError } from '../global'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'


export default function ForgotPW() {

    const [email, setEmail] = useState()



    async function handleForgotPW(event) {
        event.preventDefault()
        const subUrl = '/forgot-password'
        const body = { 
            email
        }
        try {
            const { message } = await fetchDataWithoutAccessToken(subUrl, 'POST', body)
            console.log(message)
            showToastMessage(message)
        }
        catch (error) {
           const message = {error}
           showToastError(message)
        }
    }






    return (
        <div className='flex w-full justify-center mt-32'>
            <form onSubmit={handleForgotPW} className='flex flex-col max-w-lg gap-y-6'>
                <h1 className='font-medium text-3xl'>Đặt lại mật khẩu của bạn</h1>
                <p>Hay nhập địa chỉ email ma bạn đa đăng kí. Chúng tôi sẽ gửi cho bạn một liên kết để đăng nhập và đặt lại mật khẩu của bạn.</p>
                <div>
                    <label className='text-sm' htmlFor="email">Email</label>
                    <input
                        onChange={event => setEmail(event.target.value)}
                        type="email"
                        className="w-full rounded-md py-2 px-3 mt-2"
                        placeholder='name@gmail.com'
                        required
                    />
                </div>
                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Gửi</button>


            </form>
            <ToastContainer/>
        </div>
    )
}