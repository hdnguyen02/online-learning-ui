
import { useEffect, useState } from "react"
import { baseUrl, showToastMessage, showToastError } from "../../global"
import { ToastContainer } from "react-toastify"
import useAuth from "context/AuthContext"

export default function InfoUserComponent() {


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
            const { message } = await jsonRp.json()
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

    // return (user && <div className="flex justify-center items-center w-full px-12">
    //     <div className="flex flex-col items-center shadow-2xl sm:max-w-lg p-12 rounded-lg">
    //         <form
    //             onSubmit={handleChangeInfo}
    //             className="w-full max-w-lg"
    //         >

    //             <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
    //             Personal information
    //             </h2>
    //             <div className="mt-4 flex flex-wrap md:-mx-3 mb-4">
    //                 <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
    //                     <label
    //                         className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
    //                         htmlFor="first-name"
    //                     >
    //                         First name
    //                     </label>
    //                     <input defaultValue={user.firstName}
    //                         name="first-name"
    //                         className="appearance-none block w-full bg-gray-200 text-gray-700 rounded-lg py-3 px-4 leading-tight focus:bg-white"
    //                         id="first-name"
    //                         type="text"
    //                     />
    //                 </div>
    //                 <div className="w-full md:w-1/2 px-3">
    //                     <label
    //                         className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
    //                         htmlFor="last-name"
    //                     >
    //                         Last name
    //                     </label>
    //                     <input defaultValue={user.lastName}
    //                         name="last-name"
    //                         className="appearance-none block w-full bg-gray-200 text-gray-700 rounded-lg py-3 px-4 leading-tight focus:bg-white"
    //                         id="last-name"
    //                         type="text"
    //                     />
    //                 </div>
    //             </div>
    //             <div className="flex flex-wrap md:-mx-3 mb-4">
    //                 <div className="w-full px-3">
    //                     <label
    //                         className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
    //                         htmlFor="grid-password"
    //                     >
    //                         Gender
    //                     </label>
    //                     <select defaultValue={user.gender ? user.gender : ''}
    //                         name="gender"
    //                         className="appearance-none block w-full bg-gray-200 text-gray-700 rounded-lg py-3 px-4 leading-tight focus:bg-white"
    //                         id="gender"
    //                     >
    //                         <option value="null">-</option>
    //                         <option value="male">Male</option>
    //                         <option value="female">Female</option>
    //                     </select>
    //                 </div>
    //             </div>
    //             <div className="flex flex-wrap md:-mx-3 mb-4">
    //                 <div className="w-full px-3">
    //                     <label
    //                         className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
    //                         htmlFor="grid-password"
    //                     >
    //                         Email
    //                     </label>
    //                     <input defaultValue={user.email}
    //                         readOnly
    //                         name="email"
    //                         className="appearance-none block w-full bg-gray-300 text-gray-700 rounded-lg py-3 px-4 mb-3 leading-tight focus:bg-white"
    //                         id="email"
    //                     >

    //                     </input>
    //                 </div>
    //             </div>

    //             <div className="flex flex-wrap md:-mx-3 mb-4">
    //                 <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
    //                     <label
    //                         className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
    //                         htmlFor="grid-first-name"
    //                     >
    //                         Phone
    //                     </label>
    //                     <input
    //                         defaultValue={user.phone ? user.phone : ''}
    //                         name="phone"
    //                         className="appearance-none block w-full bg-gray-200 text-gray-700 rounded-lg py-3 px-4 leading-tight focus:bg-white"
    //                         id="phone"
    //                         type="text"
    //                     />
    //                 </div>
    //                 <div className="w-full md:w-1/2 px-3">
    //                     <label
    //                         className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
    //                         htmlFor="grid-last-name">
    //                         Date of birth
    //                     </label>
    //                     <input defaultValue={user.dateOfBirth ? user.dateOfBirth : ''}
    //                         name="dateOfBirth"
    //                         className="appearance-none block w-full bg-gray-200 text-gray-700 rounded-lg py-3 px-4 leading-tight focus:bg-white"
    //                         id="date-of-birth"
    //                         type="date"
    //                     />
    //                 </div>
    //             </div>
    //             <div className="mb-4">
    //                 <label>
    //                     <span className="mr-4 text-sm font-light">Upload a profile picture</span>
    //                     <input name="avatar" id="input-avatar" type="file" accept="image/*" className="border-0" />
    //                 </label>
    //                 {/* role */}
    //             </div>
    //             <div>

    //             {user.roles.map((role, index) => {
    //                       return (
    //                         <span key={index}>
    //                           <span className='lowercase text-xs mr-2 bg-gray-300 p-1 rounded-lg'>
    //                             {role}
    //                           </span>
    //                         </span>
    //                       )
    //                     })}
    //             </div>
    //             <div className="mt-6 flex justify-end">

    //                 <button
    //                     type="submit"
    //                     className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    //                 >
    //                     Submit
    //                 </button>
    //             </div>
    //         </form>
    //     </div>
    //     <ToastContainer/>
    // </div>)

    return <form>
        <div class="space-y-8">
            <div class="border-b border-gray-900/10 pb-6">
                <h2 class="text-base/7 font-semibold text-gray-900">Profile</h2>
                <p class="mt-1 text-sm/6 text-gray-600">This information will be displayed publicly so be careful what you share.</p>

                <div class="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">


                    <div class="col-span-full">
                        <label for="photo" class="block text-sm/6 font-medium text-gray-900">Photo</label>
                        <div class="mt-2 flex items-center gap-x-3">
                            <svg class="size-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon">
                                <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" />
                            </svg>
                            <button type="button" class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Change</button>
                        </div>
                    </div>

                </div>
            </div>

            <div class="border-b border-gray-900/10">
                <h2 class="text-base/7 font-semibold text-gray-900">Personal Information</h2>


                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 pb-6">
                    <div class="sm:col-span-3">
                        <label for="first-name" class="block text-sm/6 font-medium text-gray-900">First name</label>
                        <div class="mt-2">
                            <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="last-name" class="block text-sm/6 font-medium text-gray-900">Last name</label>
                        <div class="mt-2">
                            <input type="text" name="last-name" id="last-name" autocomplete="family-name" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>


                    <div class="sm:col-span-3">
                        <label for="first-name" class="block text-sm/6 font-medium text-gray-900">Email</label>
                        <div class="mt-2">
                            <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="last-name" class="block text-sm/6 font-medium text-gray-900">Date of birth</label>
                        <div class="mt-2">
                            <input type="date" name="last-name" id="last-name" autocomplete="family-name" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>



                    <div class="sm:col-span-3">
                        <label for="first-name" class="block text-sm/6 font-medium text-gray-900">Phone</label>
                        <div class="mt-2">
                            <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="last-name" class="block text-sm/6 font-medium text-gray-900">Gender</label>
                        <div class="mt-2">
                            <select type="date" name="last-name" id="last-name" autocomplete="family-name" class="block w-full rounded-md bg-white px-3 py-[9px] text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                <option value="null">-</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </div>

                </div>
            </div>


        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">

            <button type="submit" class="rounded-md bg-indigo-600 px-5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
        </div>
    </form>

}