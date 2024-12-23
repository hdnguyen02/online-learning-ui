import { useEffect, useState } from 'react';
import { fetchData, showToastError, showToastMessage, customFormatDistanceToNow, notification } from '../global';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import useAuth from '../context/AuthContext';
import { ToastContainer } from 'react-toastify';
import Empty from './Empty';
import { useTranslation } from 'react-i18next';
import groupService from 'service/group.service';
import React from "react";
import { roles } from '../enum/role.enum';
import PreparePaymentComponent from '../feature/group/prepare-payment.component';
import PreparePaymentV2Component from '../feature/group/prepare-payment-v2.component';

export default function OwnerClasses() {

    const appElement = document.getElementById('root');
    Modal.setAppElement(appElement);

    const { auth } = useAuth();

    const [name, setName] = useState();
    const [desc, setDesc] = useState();
    const [isPublic, setIsPublic] = useState();
    const [isOpenCreateClass, setIsOpenCreateClass] = useState(false);
    const [isOpenEditGroup, setIsOpenEditGroup] = useState(false);
    const [ownerClasses, setOwnerClasses] = useState(false);
    const [groupEdit, setGroupEdit] = useState();


    async function handleCreateGroup(event) {
        event.preventDefault();
        const body = {
            name,
            description: desc,
            isPublic
        };

        try {
            const subUrl = '/groups';
            await fetchData(subUrl, 'POST', body);
            await getOwnerGroup();
            showToastMessage(notification.success.create);

            setName('');
            setDesc('');
            setIsPublic(false);
            setIsOpenCreateClass(false);

        } catch (error) {
            showToastError(error.message);
        }
    }

    const stylesModal = {
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 1000
        },
        content: {
            width: '600px',
            height: '400px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px 40px',
            borderRadius: '6px',
            backgroundColor: 'while',
        },
    }

    const onOpenCreateGroup = () => {
        setIsOpenCreateClass(true);
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
    async function getOwnerGroup() {
        const subUrl = `/groups/owner`;
        try {
            const { data: rawData } = await fetchData(subUrl, 'GET');
            console.log(rawData);

            setOwnerClasses(rawData);
        }
        catch (error) {
            console.log(error.code + ' ' + error.message);
        }
    }


    const { t } = useTranslation();
    async function onConfirmDeleteGroup() {
        const isSuccess = await groupService.deleteGroup(idGroupSelected);
        if (isSuccess) showToastMessage(notification.success.delete);
        else showToastError(notification.error.delete);
        setIsOpenDeleteGroup(false);
        getOwnerGroup();

    }


    const [idGroupSelected, setIdGroupSelected] = useState();
    const [isOpenDeleteGroup, setIsOpenDeleteGroup] = useState(false);

    const onDeleteGroup = async (id) => {

        setIdGroupSelected(id);
        setIsOpenDeleteGroup(true);

    }

    const onCloseDeleteGroup = () => {
        setIsOpenDeleteGroup(false);
    }

    // edit group 
    async function onSubmitEditGroup(event) {
        event.preventDefault();
        const subUrl = `/groups/${groupEdit.id}`;
        try {
            const body = {
                name: document.getElementById('edit-name-group').value,
                description: document.getElementById('edit-description-group').value,
                isPublic: document.getElementById('edit-public-checkbox').checked
            }
            const { message } = await fetchData(subUrl, 'PUT', body)
            await getOwnerGroup()
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
            const { data } = await fetchData(subUrl, 'GET'); 
            return data; 
        }
        catch ({ message }) {
            showToastError(message)
        }
    }
    async function onOpenUpdateGroup(id) {
        const group = await getGroup(id);
        setGroupEdit(group);
        setIsOpenEditGroup(true);
    }
    useEffect(() => {
        if (auth.roles.includes(roles.groupActivitiesAccess)) {
            getOwnerGroup();
        }
    }, [])


    if (auth.roles.includes(roles.groupActivitiesAccess)) {
        return ownerClasses && <div className=''>
            {ownerClasses?.length !== 0 ? (
                <div className="mb-8 grid grid-cols-2 gap-8">
                    {ownerClasses.map((ownerClass, index) => (


                        <div key={index} className=" bg-white dark:bg-[#2E3856] dark:border-none shadow flex justify-between gap-x-6 p-5 border rounded-lg">
                            <div className="flex min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto">
                                    <p className="text-sm font-semibold leading-6 text-gray-800 dark:text-white">
                                        {ownerClass.name}
                                    </p>
                                    <span className="text-gray-600 dark:text-gray-200 text-sm">
                                        {customFormatDistanceToNow(ownerClass.createdDate)}
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-x-2 items-center">
                                <button onClick={() => onDeleteGroup(ownerClass.id)} type="button" class="dark:border-white  dark:text-white dark:hover:bg-transparent bg-transparent hover:bg-blue-500 text-blue-700 text-sm hover:text-white py-1 px-4 border border-blue-500  rounded">
                                    <i className="fa-solid fa-trash"></i>
                                 

                                </button>
                                <button onClick={() => onOpenUpdateGroup(ownerClass.id)}
                                    className="dark:border-white  dark:text-white dark:hover:bg-transparent bg-transparent hover:bg-blue-500 text-blue-700 text-sm hover:text-white py-1 px-4 border border-blue-500  rounded">
                                    Edit
                                </button>
                                <Link
                                    to={"/groups/detail-owner/" + ownerClass.id + "/members"}
                                    className="rounded-md bg-blue-800 py-1 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                >
                                    Detail
                                </Link>


                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <Empty />

            )}

            <div className='flex justify-end'>
            <button onClick={onOpenCreateGroup} type="button" className="dark:border-white dark:text-white dark:hover:bg-transparent flex gap-x-2 items-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2 text-center">
                <i className="fa-solid fa-plus"></i>
                <span>{t('ACTION.CREATE')}</span>
            </button>
            </div>

          
            <Modal
                isOpen={isOpenCreateClass}
                onRequestClose={() => setIsOpenCreateClass(false)}
                contentLabel='Custom Modal'
                style={stylesModal}
            >
                <form onSubmit={handleCreateGroup} className=''>
                    <div className='flex justify-between items-center'>
                        <span className='text-gray-800 text-xl font-medium'>Tạo nhóm</span>
                    </div>

                    <hr className='my-4' />

                    <div className='mt-6'>
                        <div className='flex flex-col gap-y-2 w-full'>
                            <label className='text-sm text-gray-800 font-bold' htmlFor=''>
                                Tên nhóm
                                <span className='text-red-500'>*</span>
                            </label>
                            <input
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                type='text'
                                className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                                required
                            />
                        </div>

                        <div className='flex flex-col gap-y-2 w-full mt-4'>
                            <label className='text-sm text-gray-800 font-bold' htmlFor=''>
                                Mô tả nhóm<span className='text-red-500'>*</span>
                            </label>
                            <textarea
                                onChange={(e) => setDesc(e.target.value)}
                                value={desc}
                                type='text'
                                required
                                className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                            />
                        </div>
                        <div className='mt-4'>

                            <label className="inline-flex items-center cursor-pointer">
                                <input onChange={(e) => setIsPublic(e.target.checked)}
                                    checked={isPublic} type="checkbox" className="sr-only peer" />
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                <span className="ms-3 text-sm font-medium text-gray-900">Public</span>
                            </label>
                        </div>
                    </div>
                    <div className='mt-4 flex justify-end items-center'>
                        <button
                            type='submit'
                            className='h-10 w-full items-center gap-x-2 px-8 text-sm text-center text-white font-bold rounded-md bg-primary sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300'
                        >
                            Đồng ý
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Modal edit group */}
            <Modal
                isOpen={isOpenEditGroup}
                onRequestClose={() => setIsOpenEditGroup(false)}
                contentLabel='Custom Modal'
                style={stylesModal}
            >
                <form onSubmit={onSubmitEditGroup} className=''>
                    <div className='flex justify-between items-center   '>
                        <span className='text-gray-800 text-lg font-bold'>Hiệu chỉnh nhóm</span>
                        <button onClick={() => setIsOpenEditGroup(false)} type='button'>
                            <img src='/close.png' className='w-5 h-5' alt='' />
                        </button>
                    </div>

                    <hr className='my-4' />

                    <div className='mt-6'>
                        <div className='flex flex-col gap-y-2 w-full'>
                            <label className='text-sm text-gray-800 font-bold' htmlFor=''>
                                Tên bộ thẻ<span className='text-red-500'>*</span>
                            </label>
                            <input
                                defaultValue={groupEdit?.name}
                                id='edit-name-group'
                                type='text'
                                className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                                required
                            />
                        </div>

                        <div className='flex flex-col gap-y-2 w-full mt-4'>
                            <label className='text-sm text-gray-800 font-bold' htmlFor=''>
                                Mô tả bộ thẻ<span className='text-red-500'>*</span>
                            </label>
                            <textarea
                                defaultValue={groupEdit?.description}
                                id='edit-description-group'
                                type='text'
                                className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                                required
                            />
                        </div>
                        <div className='mt-4'>

                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    defaultChecked={groupEdit?.isPublic}
                                    id='edit-public-checkbox'
                                    type="checkbox" className="sr-only peer" />
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                <span className="ms-3 text-sm font-medium text-gray-900">Public</span>
                            </label>


                        </div>
                    </div>

                    {/* <hr className='my-4' /> */}
                    <div className='mt-4 flex justify-end items-center'>
                        <button
                            type='submit'
                            className='h-10 w-full items-center gap-x-2 px-8 text-sm text-center text-white font-bold rounded-md bg-primary sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300'
                        >
                            Đồng ý
                        </button>
                    </div>
                </form>
            </Modal>


            <Modal
                isOpen={isOpenDeleteGroup}
                onRequestClose={onCloseDeleteGroup}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        zIndex: 1000
                    },
                    content: {
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "540px",
                        height: "200px",
                        borderRadius: "8px",
                        boxShadow: "rgba(0, 0, 0, 0.4) 0px 30px 90px",
                        overflow: "visible",
                    },
                }}
            >
               
                <div className="bg-white rounded-lg max-w-md mx-auto p-4 relative">
                    {/* Header with icon */}
                    <div className="flex items-center">
                        <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto md:mx-0">
                            <img src="/src/assets/image/alert.png" alt="" />
                        </div>
                        <div className="mt-4 text-center md:text-left md:ml-6">
                            <p className="font-bold text-lg">Xóa nhóm</p>
                            <p className="text-sm text-gray-700 mt-1">
                            Bạn sẽ mất tất cả dữ liệu khi xóa nhóm của mình. Không thể hoàn tác hành động này.
                            </p>
                        </div>
                    </div>

                    {/* Footer with action buttons */}
                    <div className="text-center md:text-right mt-4 flex flex-col md:flex-row justify-end gap-2">
                        <button onClick={() => onCloseDeleteGroup()}

                            className="px-4 py-2 bg-gray-200 rounded-lg font-semibold text-sm"
                        >
                            Hủy
                        </button>
                        <button onClick={() => onConfirmDeleteGroup()}

                            className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold text-sm"
                        >
                            Xóa nhóm
                        </button>
                    </div>
                </div>
            </Modal>

            <ToastContainer />

        </div>

        }
        return <div>
            <PreparePaymentV2Component/>
            <ToastContainer />  
        </div>
    }