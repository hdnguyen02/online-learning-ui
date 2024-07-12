import { useEffect, useState } from "react"
import { fetchData, showToastError, showToastMessage } from "../global"
import { Link } from "react-router-dom"
import Modal from 'react-modal'
import useAuth from "../context/AuthContext"
import { ToastContainer } from 'react-toastify'
import Empty from "./Empty"


export default function OwnerClasses() {

    const appElement = document.getElementById('root')
    Modal.setAppElement(appElement)

    const { auth } = useAuth()

    const [name, setName] = useState()
    const [desc, setDesc] = useState()
    const [isOpenCreateClass, setIsOpenCreateClass] = useState(false)
    const [isOpenEditGroup, setIsOpenEditGroup] = useState(false)
    const [ownerClasses, setOwnerClasses] = useState(false)
    const [groupEdit, setGroupEdit] = useState()


    async function handleCreateClass(event) {
        event.preventDefault()
        const isPublic = document.getElementById('public-checkbox').checked
        const body = {
            name,
            description: desc,
            isPublic
        }

        try {
            const subUrl = '/groups'
            const { message } = await fetchData(subUrl, 'POST', body)
            await getOwnerClass()
            showToastMessage(message)

            setName('')
            setDesc('')
            setIsOpenCreateClass(false)

        } catch (error) {
            showToastError(error.message)
        }
    }

    // thiết lập học thẻ 


    const stylesModalCreateClass = {
        content: {
            width: '600px',
            height: '380px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '40px',
            borderRadius: '8px',
            backgroundColor: 'while',
            border: '0px',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
        },
    }



    async function handlePayment() {
        // số tiền 299k => gửi trả về lại cho người dùng. 
        const email = auth.email
        const subUrl = `/payment?email=${email}`
        try {
            const { data } = await fetchData(subUrl, 'GET')
            const urlPayment = data
            window.open(urlPayment, '_blank');

        }
        catch (error) {
            console.log(error.message)
        }

    }
    async function getOwnerClass() {
        const subUrl = `/groups/owner`
        try {
            const response = await fetchData(subUrl, 'GET')
            setOwnerClasses(response.data)
        }
        catch (error) {
            console.log(error.code + ' ' + error.message)
        }
    }

    async function handleDeleteGroup(idGroup) {
        const subUrl = `/groups/${idGroup}`
        try {
            const { message } = await fetchData(subUrl, 'DELETE')
            await getOwnerClass()
            showToastMessage(message)
        }
        catch ({ message }) {
            showToastError(message)
        }
    }

    // edit group 
    async function handleEditGroup(event) {
        event.preventDefault()
        const subUrl = `/groups/${groupEdit.id}`
        try {
            const body = {
                name: document.getElementById('edit-name-group').value,
                description: document.getElementById('edit-description-group').value, 
                isPublic: document.getElementById("edit-public-checkbox").checked 
            }
            const { message } = await fetchData(subUrl, 'PUT', body)
            await getOwnerClass()
            setIsOpenEditGroup(false)
            showToastMessage(message)
        }
        catch ({ message }) {
            showToastError(message)
        }
    }
    async function getGroup(idGroup) {
        const subUrl = `/groups/${idGroup}`
        try {
            const { data } = await fetchData(subUrl, 'GET')
            return data
        }
        catch ({ message }) {
            showToastError(message)
        }
    }
    async function handleShowModalEditGroup(idGroup) {
        const group = await getGroup(idGroup)
        setGroupEdit(group)
        setIsOpenEditGroup(true)
        // console.log(document.getElementById("edit-public-checkbox"))
        // document.getElementById("edit-public-checkbox").checked = group.isPublic 
        
    }


    useEffect(() => {
        if (auth.roles.includes('TEACHER')) {
            getOwnerClass()
        }
    }, [])


    function renderUnlockedUser() {
        return <div className="flex items-center justify-center flex-col gap-y-3">
            <h1 className="text-3xl font-bold text-center">Online learning - For teachers</h1>
            <div className="flex justify-center">
                <button onClick={handlePayment} className='gap-x-2 flex items-center h-10 px-8 text-sm text-center rounded-md font-bold bg-yellow-400 sm:w-fit hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-200'>

                    <span className='text-sm'>Buy</span>
                    <i className="fa-solid fa-unlock"></i>
                </button>
            </div>

        </div>
    }

    if (auth.roles.includes('TEACHER')) {
        return ownerClasses && <div>
          
            {ownerClasses?.length != 0 ?
                (
                    <div className="mb-8 grid grid-cols-2 gap-8">
                        {
                            ownerClasses.map((ownerClass, index) => <div key={index} className="bg-[#F0F6F6] p-6 rounded">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-x-4">
                                        <div className='rounded-full h-10 w-10 overflow-hidden cursor-pointer'>
                                            <img src={ownerClass.owner.avatar ? ownerClass.owner.avatar : '/user.png'} loading="lazy" className='w-full h-full' alt='' />
                                        </div>
                                        <div className="flex flex-col gap-y-2">
                                            <div className="flex gap-x-2 items-center">
                                                <span className="font-bold text-xl">{ownerClass.name}</span>
                                                <span>({ownerClass.quantityMembers} member)</span>
                                            </div>

                                            <div className="flex items-center gap-x-3">
                                                <span className="font-light text-sm">{ownerClass.owner.firstName + " " + ownerClass.owner.lastName}</span>
                                                {/* <span className="text-xs bg-gray-300 p-1 rounded-lg">Giáo viên</span> */}
                                                {
                                                    ownerClass.owner.roles.map((role, index) => {
                                                        return <span key={index}>
                                                            <span className="lowercase text-xs bg-gray-300 p-1 rounded-lg">{role}</span>
                                                        </span>
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-x-2">

                                        <button onClick={() => handleDeleteGroup(ownerClass.id)} className="flex items-center gap-x-2 h-8 text-red-600 hover:text-white border border-red-500 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-200 font-medium rounded-lg text-sm px-3 text-center">
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                        <button
                                            onClick={() => handleShowModalEditGroup(ownerClass.id)}
                                            className="flex items-center h-8 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 text-center">
                                            <i className="fa-solid fa-pen"></i>
                                        </button>
                                        <Link to={`/groups/detail-owner/${ownerClass.id}/members`} className="flex items-center h-8 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 text-center">
                                            <span className="ml-1">Detail</span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="mt-2 text-gray-700 text-sm text-ellipsis overflow-hidden whitespace-nowrap">{ownerClass.description}</div>
                            </div>)
                        }
                    </div>
                ) : (<Empty />)
            }
              <div className="flex justify-start">
                <button className="mb-4">
                    <img
                        onClick={() => setIsOpenCreateClass(true)}
                        src='/plus.png'
                        className='w-9'
                        alt=''
                    />
                </button>
            </div>
            <Modal
                isOpen={isOpenCreateClass}
                onRequestClose={() => setIsOpenCreateClass(false)}
                contentLabel='Custom Modal'
                style={stylesModalCreateClass}
            >
                <form onSubmit={handleCreateClass} className=''>
                    <div className='flex justify-between'>
                        <h3 className='text-gray-800 text-2xl font-bold'>Create group</h3>
                        <button onClick={() => setIsOpenCreateClass(false)} type='button'>
                            <img src='/close.png' className='w-5 h-5' alt='' />
                        </button>
                    </div>

                    <hr className='my-4' />

                    <div className='mt-6'>
                        <div className='flex flex-col gap-y-2 w-full'>
                            <label className='text-sm text-gray-600 font-bold' htmlFor=''>
                                Name
                            </label>
                            <input
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                type='text'
                                className='h-10 px-4 rounded-lg'
                                required
                            />
                        </div>

                        <div className='flex flex-col gap-y-2 w-full mt-4'>
                            <label className='text-sm text-gray-600 font-bold' htmlFor=''>
                                description
                            </label>
                            <input
                                onChange={(e) => setDesc(e.target.value)}
                                value={desc}
                                type='text'
                                className='h-10 px-4 rounded-lg'
                                required
                            />
                        </div>
                    </div>

                    <hr className='my-4' />
                    <div className='mt-4 flex justify-between items-center'>
                        {/* checkbox public => công khai lớp hay không */}
                        <div className="flex items-center">
                            <input id="public-checkbox" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                            <label htmlFor="public-checkbox" className="ms-2 text-sm font-medium text-gray-900">Public</label>
                        </div>
                        <button
                            type='submit'
                            className='h-10 w-full items-center gap-x-2 px-8 text-sm text-center text-white font-bold rounded-md bg-primary sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300'
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Modal edit group */}
            <Modal
                isOpen={isOpenEditGroup}
                onRequestClose={() => setIsOpenEditGroup(false)}
                contentLabel='Custom Modal'
                style={stylesModalCreateClass}
            >
                <form onSubmit={handleEditGroup} className=''>
                    <div className='flex justify-between'>
                        <h3 className='text-gray-800 text-2xl font-bold'>Edit group</h3>
                        <button onClick={() => setIsOpenEditGroup(false)} type='button'>
                            <img src='/close.png' className='w-5 h-5' alt='' />
                        </button>
                    </div>

                    <hr className='my-4' />

                    <div className='mt-6'>
                        <div className='flex flex-col gap-y-2 w-full'>
                            <label className='text-sm text-gray-600 font-bold' htmlFor=''>
                                Name
                            </label>
                            <input
                                defaultValue={groupEdit?.name}
                                id="edit-name-group"
                                type='text'
                                className='h-10 px-4 rounded-lg'
                                required
                            />
                        </div>

                        <div className='flex flex-col gap-y-2 w-full mt-4'>
                            <label className='text-sm text-gray-600 font-bold' htmlFor=''>
                                description
                            </label>
                            <input
                                defaultValue={groupEdit?.description}
                                id="edit-description-group"
                                type='text'
                                className='h-10 px-4 rounded-lg'
                                required
                            />
                        </div>
                    </div>

                    <hr className='my-4' />
                    <div className='mt-4 flex justify-between items-center'>
                        {/* checkbox public => công khai lớp hay không */}
                        <div className="flex items-center">
                            <input defaultChecked={groupEdit?.isPublic} id="edit-public-checkbox" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                            <label htmlFor="edit-public-checkbox" className="ms-2 text-sm font-medium text-gray-900">Public</label>
                        </div>
                        <button
                            type='submit'
                            className='h-10 w-full items-center gap-x-2 px-8 text-sm text-center text-white font-bold rounded-md bg-primary sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300'
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </Modal>

            <ToastContainer />

        </div>


    }
    else {
        return renderUnlockedUser()
    }





}