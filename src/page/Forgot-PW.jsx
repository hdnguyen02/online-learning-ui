
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
                <h1 className='font-medium text-3xl'>Reset your password</h1>
                <p>Please enter the email address you registered with. We'll send you a link to log in and reset your password.</p>
                <div>
                    <label className='text-sm' htmlFor="email">Email<span className='text-red-500'>*</span></label>
                    <input
                        onChange={event => setEmail(event.target.value)}
                        type="email"
                        className="mt-2 dark:bg-[#2E3856] dark:text-white dark:outline-none dark:border-none block w-full rounded-md bg-white px-4 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                        placeholder='name@gmail.com'
                        required
                    />
                </div>
                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>


            </form>
            <ToastContainer/>
        </div>
    )
}