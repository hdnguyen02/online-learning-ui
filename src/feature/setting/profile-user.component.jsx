


import { useEffect, useState } from "react";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import userService from "service/user.service";
import { showToastError, showToastMessage, customFormatYYY_MM_DD } from "../../global";
import firebaseService from "service/firebase.service";
import useAuth from "../../context/AuthContext";

export default function InfoUserComponent() {


    Modal.setAppElement("#root");

    const { checkAuth } = useAuth();


    const [isOpenUpdatePW, setIsOpenUpdatePW] = useState(false);

    const [oldPW, setOldPW] = useState();
    const [newPW, setNewPW] = useState();
    const [confirmPW, setConfirmPW] = useState();

    const onSubmitUpdatePW = async () => {

        // gửi lên 3 dữ liệu. 
        const data = { 
            oldPW, newPW, confirmPW 
        }; 
        const isSuccess = await userService.updatePWUser(data); 
        if (isSuccess) showToastMessage("Success"); 
        else showToastMessage("Fail!"); 
        

    }

    const [user, setUser] = useState();



    const onOpenUpdatePW = () => {
        setIsOpenUpdatePW(true);
    }

    const onCloseUpdatePW = () => {
        setIsOpenUpdatePW(false);
    }


    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;


    const stylesModal = {
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 1000
        },
        content: {
            width: '640px',
            height: '410px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '0px',
            borderRadius: "14px", // Kiểm tra dark mode
            borderWidth: "0px",
            backgroundColor: isDarkMode ? '#A092D' : 'while',
            overflow: "hidden"
        },
    }

    const onUpdateAvatar = () => {
        document.getElementById('update-avatar').click();
    }

    const onAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);

            setPreviewAvatar(imageUrl);
            const avatarUrl = await firebaseService.uploadAvatar(file); // Upload file lên Firebase
            await userService.updateAvatarUser({avatar: avatarUrl}); 
            checkAuth(); 
            setUser((prevUser) => ({ ...prevUser, avatar: avatarUrl }));
        }
    };

    const [previewAvatar, setPreviewAvatar] = useState();


    const onSubmitUpdateUser = async (e) => {

        e.preventDefault();

        const data = {  
            firstName: user.firstName, 
            lastName: user.lastName,
            gender: user.gender == "" ? null : user.gender, 
            phone: user.phone, 
            dateOfBirth: user.dateOfBirth
        }
        const isSuccess = await userService.updateUser(data); 
        if (isSuccess) showToastMessage("Success"); 
        else showToastError("Fail!"); 

        checkAuth(); 
        
        
    }



    useEffect(() => {

        const fetchData = async () => {
            const rawData = await userService.getProfileUser();
            if (!rawData) return;
            setUser(rawData);
        }

        fetchData();
    }, []);

    return <div >
        <ToastContainer/>
        <form onSubmit={onSubmitUpdateUser} className="space-y-6">
            <div className="border-b border-gray-900/10 pb-2">
                <h2 className="text-base/7 font-semibold text-gray-900 dark:text-white">Profile</h2>
                <p className="mt-1 text-sm/6 text-gray-600 dark:text-white">This information will be displayed publicly so be careful what you share.</p>

                <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">


                    <div className="col-span-full">
                        <label for="photo" className="block text-sm/6 font-medium text-gray-900 dark:text-white">Photo</label>
                        <div className="mt-2 flex items-center gap-x-3">


                            {
                                previewAvatar ? (
                                    <img
                                        src={previewAvatar}
                                        alt="Avatar Preview"
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                ) : (
                                    <img src={user?.avatar ? user.avatar : '/src/assets/image/india.png'} className="w-10 h-10  rounded-full object-cover" alt="" />
                                )
                            }

                            <button onClick={onUpdateAvatar} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Change</button>

                            <input onChange={onAvatarChange} id="update-avatar" type="file" className="hidden" accept="image/*" />

                        </div>
                    </div>


                </div>
                <div className="mt-8 flex flex-col">
                    {/* <span className="block text-sm/6 font-medium text-gray-900 dark:text-white">Mật khẩu</span> */}
                    <div className="mt-2 flex items-center gap-x-3">
                        
                        <button onClick={onOpenUpdatePW} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="button">Thay đổi mật khẩu</button>
                    </div>
                </div>

            </div>

            <div className="border-b border-gray-900/10">
                <div className="flex items-center justify-between">
                <h2 className="text-base/7 font-semibold text-gray-900 dark:text-white">Personal Information</h2>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Save</button>

                </div>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 pb-6">
                    <div className="sm:col-span-3">
                        <label for="first-name" className="block text-sm/6 font-medium text-gray-900 dark:text-white">First name</label>
                        <div className="mt-2">
                            <input value={user?.firstName} onChange={e => setUser({
                                ...user, firstName: e.target.value
                            })} type="text" name="first-name" id="first-name" autocomplete="given-name" className="dark:bg-[#2E3856] dark:focus:outline-none dark:border-none dark:outline-none dark:text-white block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label for="last-name" className="block text-sm/6 font-medium text-gray-900 dark:text-white">Last name</label>
                        <div className="mt-2">
                            <input value={user?.lastName} onChange={e => setUser({
                                ...user, lastName: e.target.value
                            })} type="text" name="last-name" id="last-name" autocomplete="family-name" className="dark:bg-[#2E3856] dark:focus:outline-none dark:border-none dark:outline-none dark:text-white block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>


                    <div className="sm:col-span-3">
                        <label for="first-name" className="block text-sm/6 font-medium text-gray-900 dark:text-white">Email<span className="text-red-500">*</span></label>
                        <div className="mt-2">
                            <input value={user?.email} disabled type="text" name="first-name" id="first-name" autocomplete="given-name" className="dark:bg-[#2E3856] dark:focus:outline-none dark:border-none dark:outline-none dark:text-white block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label for="last-name" className="block text-sm/6 font-medium text-gray-900 dark:text-white">Date of birth</label>
                        <div className="mt-2">
                            <input value={customFormatYYY_MM_DD(user?.dateOfBirth)} onChange={e => setUser({
                                ...user, dateOfBirth: e.target.value
                            })}
                                type="date" name="last-name" id="last-name" autocomplete="family-name" className="h-[36px] dark:bg-[#2E3856] dark:focus:outline-none dark:border-none dark:outline-none dark:text-white block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>



                    <div className="sm:col-span-3">
                        <label for="first-name" className="block text-sm/6 font-medium text-gray-900 dark:text-white">Phone</label>
                        <div className="mt-2">
                            <input value={user?.phone} onChange={e => setUser({
                                ...user, phone: e.target.value
                            })} type="text" name="first-name" id="first-name" autocomplete="given-name" className="dark:bg-[#2E3856] dark:focus:outline-none dark:border-none dark:outline-none dark:text-white block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label for="last-name" className="block text-sm/6 font-medium text-gray-900 dark:text-white">Gender</label>
                        <div className="mt-2">
                            <select value={user?.gender} onChange={e => setUser({
                                ...user, gender: e.target.value
                            })} type="date" name="last-name" id="last-name" autocomplete="family-name" className="h-[36px] dark:bg-[#2E3856] dark:focus:outline-none dark:border-none dark:outline-none dark:text-white block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                <option value="null">-</option>
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                            </select>
                        </div>
                    </div>

                </div>
            </div>

            {/* <div className="mt-6 flex items-center justify-end gap-x-6">

               
            </div> */}


        </form>




        <Modal

            isOpen={isOpenUpdatePW}
            onRequestClose={onCloseUpdatePW}
            contentLabel='Custom Modal'
            style={stylesModal}
        >

            <form onSubmit={onSubmitUpdatePW} className='bg-white dark:bg-[#0A092D] px-12 py-8 w-full h-full'>
                <div className='flex justify-between items-center'>
                    <span className='text-gray-800 dark:text-white text-lg font-medium'>Thay đổi mật khẩu</span>
                </div>

                <hr className='my-4 dark:opacity-10' />

                <div className='mt-6'>
                    <div className='flex flex-col gap-y-2 w-full'>
                        <label className='text-sm text-gray-800 dark:text-white font-bold' htmlFor=''>
                            Mật khẩu hiện tại
                            <span className='text-red-500'>*</span>
                        </label>
                        <input
                            onChange={(e) => setOldPW(e.target.value)}
                            value={oldPW}
                   
                            type="password"
                            className='dark:bg-[#2E3856] dark:text-white dark:border-none dark:outline-none dark:focus:outline-none block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                            required
                        />
                    </div>

                    <div className='flex flex-col gap-y-2 w-full mt-4'>
                        <label className='text-sm text-gray-800 dark:text-white font-bold' htmlFor=''>
                            Mật khẩu mới<span className="text-red-500">*</span>
                        </label>
                        <input
                            onChange={(e) => setNewPW(e.target.value)}
                            value={newPW}
                            type="password"
                            className='dark:bg-[#2E3856] dark:text-white dark:border-none dark:outline-none dark:focus:outline-none block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                        />
                    </div>

                    <div className='flex flex-col gap-y-2 w-full mt-4'>
                        <label className='text-sm text-gray-800 dark:text-white font-bold' htmlFor=''>
                            Xác nhận mật khẩu mới<span className="text-red-500">*</span>
                        </label>
                        <input
                            onChange={(e) => setConfirmPW(e.target.value)}
                            value={confirmPW}
                            type="password"
                            className='dark:bg-[#2E3856] dark:text-white dark:border-none dark:outline-none dark:focus:outline-none block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                        />
                    </div>

                </div>

                {/* <hr className='my-4 dark:opacity-10 ' /> */}
                <div className='mt-4 flex gap-x-3 justify-end items-center'>
                <button onClick={onCloseUpdatePW} className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>
                    <button
                        type='submit'
                        className='h-10 w-full items-center gap-x-2 px-8 text-sm text-center text-white font-bold rounded-md bg-primary sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300'
                    >
                        Submit
                    </button>
                </div>
            </form>


        </Modal>

    </div>

}