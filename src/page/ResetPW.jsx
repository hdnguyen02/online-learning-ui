
import { fetchData, showToastMessage, showToastError } from '../global'
import { ToastContainer } from 'react-toastify'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function ForgotPW() {

    const location = useLocation()

    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    async function handleResetPW(event) {
        event.preventDefault()

        if (newPassword !== confirmPassword) {
            
            failRef.current.show('New password and confirmation password do not match!')
            return
        }
        // lấy ra token trên url đó. 
        const searchParams = new URLSearchParams(location.search)
        const accessToken = searchParams.get('access-token')

        
        try {
            const subUrl = '/reset-password'
            localStorage.setItem('accessToken', accessToken)
            const body = {
                newPassword, accessToken
            }
            console.log(body)
            const {message} = await fetchData(subUrl, 'POST', body)
            showToastMessage(message)
            }
            catch (error) {
                const {message} = error
                showToastError(message)
            }
    }


    return (
        <div className='flex w-full justify-center mt-32'>
            <form onSubmit={handleResetPW} className='flex flex-col max-w-lg gap-y-6'>
                <h1 className='font-medium text-3xl'>Reset your password</h1>
                <p>Reset password and confirm password, please do not share this link with anyone!</p>
                <div>
                    <label className='text-sm' htmlFor="email">Password</label>
                    <input
                        onChange={event => setNewPassword(event.target.value)}
                        type="password"
                        className="w-full rounded-md py-2 px-3 mt-2"
                        required
                        minLength={6}
                    />
                </div>
                <div>
                    <label className='text-sm' htmlFor="email">Confirm password</label>
                    <input
                        onChange={event => setConfirmPassword(event.target.value)}
                        type="password"
                        className="w-full rounded-md py-2 px-3 mt-2"
                        required
                        minLength={6}
                    />
                </div>
                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Gửi</button>
            </form>
            <ToastContainer/>
        </div>
    )
}