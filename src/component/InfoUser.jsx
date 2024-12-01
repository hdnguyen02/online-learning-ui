
import { useEffect, useState } from "react"
import { baseUrl, showToastMessage, showToastError } from "../global"
import { ToastContainer } from "react-toastify"
import useAuth from "../context/AuthContext"

export default function InfoUser() {


    const { auth, checkAuth } = useAuth(); 

    const [user, setUser] = useState(); 
    async function getUser() {
        setUser(auth)
    }


    async function handleChangeInfo(event) {
        event.preventDefault(); 
        const accessToken = localStorage.getItem('accessToken'); 
        const url = `${baseUrl}/users/info`; 
        const elFirstName = document.getElementById('first-name'); 
        const elLastName = document.getElementById('last-name'); 
        const elGender = document.getElementById('gender');
        const elPhone = document.getElementById('phone');
        const elDateOfBirth = document.getElementById('date-of-birth');
        const elAvatar = document.getElementById('input-avatar');
        const formData = new FormData();


        formData.append('firstName', elFirstName.value)  
        formData.append('lastName', elLastName.value)
        formData.append('gender', elGender.value)
        formData.append('phone', elPhone.value)
        formData.append('dateOfBirth', elDateOfBirth.value)
        formData.append('avatar', elAvatar.files[0])
        try {
            const jsonRp = await fetch(url, {
                method: 'PUT',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
            })
            const { message} = await jsonRp.json()
            if (!jsonRp.ok) {
                throw new Error(message)
            }
            checkAuth()
            showToastMessage('Hiệu chỉnh thông tin thành công')
        
        }
        catch (error) {
            showToastError(error.message)
        }
    }

    

    useEffect(() => {
        getUser()
    }, [getUser])

    return (user && <div className="flex justify-center items-center w-full px-12">
        <div className="flex flex-col items-center shadow-2xl sm:max-w-lg p-12 rounded-lg">
            <form
                onSubmit={handleChangeInfo}
                className="w-full max-w-lg"
            >
              
                <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Personal information
                </h2>
                <div className="mt-4 flex flex-wrap md:-mx-3 mb-4">
                    <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="first-name"
                        >
                            First name
                        </label>
                        <input defaultValue={user.firstName}
                            name="first-name"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 rounded-lg py-3 px-4 leading-tight focus:bg-white"
                            id="first-name"
                            type="text"
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="last-name"
                        >
                            Last name
                        </label>
                        <input defaultValue={user.lastName}
                            name="last-name"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 rounded-lg py-3 px-4 leading-tight focus:bg-white"
                            id="last-name"
                            type="text"
                        />
                    </div>
                </div>
                <div className="flex flex-wrap md:-mx-3 mb-4">
                    <div className="w-full px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Gender
                        </label>
                        <select defaultValue={user.gender ? user.gender : ''}
                            name="gender"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 rounded-lg py-3 px-4 leading-tight focus:bg-white"
                            id="gender"
                        >
                            <option value="null">-</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-wrap md:-mx-3 mb-4">
                    <div className="w-full px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Email
                        </label>
                        <input defaultValue={user.email}
                            readOnly
                            name="email"
                            className="appearance-none block w-full bg-gray-300 text-gray-700 rounded-lg py-3 px-4 mb-3 leading-tight focus:bg-white"
                            id="email"
                        >

                        </input>
                    </div>
                </div>
              
                <div className="flex flex-wrap md:-mx-3 mb-4">
                    <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-first-name"
                        >
                            Phone
                        </label>
                        <input
                            defaultValue={user.phone ? user.phone : ''}
                            name="phone"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 rounded-lg py-3 px-4 leading-tight focus:bg-white"
                            id="phone"
                            type="text"
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-last-name">
                            Date of birth
                        </label>
                        <input defaultValue={user.dateOfBirth ? user.dateOfBirth : ''}
                            name="dateOfBirth"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 rounded-lg py-3 px-4 leading-tight focus:bg-white"
                            id="date-of-birth"
                            type="date"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label>
                        <span className="mr-4 text-sm font-light">Upload a profile picture</span>
                        <input name="avatar" id="input-avatar" type="file" accept="image/*" className="border-0" />
                    </label>
                    {/* role */}
                </div>
                <div>
                
                {user.roles.map((role, index) => {
                          return (
                            <span key={index}>
                              <span className='lowercase text-xs mr-2 bg-gray-300 p-1 rounded-lg'>
                                {role}
                              </span>
                            </span>
                          )
                        })}
                </div>
                <div className="mt-6 flex justify-end">

                    <button
                        type="submit"
                        className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
        <ToastContainer/>
    </div>)
}