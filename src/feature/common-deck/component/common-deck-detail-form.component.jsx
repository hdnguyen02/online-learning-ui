

import Modal from "react-modal";
import { useState } from "react"
import { useTranslation } from 'react-i18next';
import deckService from "service/deck.service";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Empty from "component/Empty";
import commonDeckService from "service/common-deck.service";
import { fetchData, showToastError, showToastMessage, showToastMessageV2 } from "../../../global";
import { sub } from "date-fns";

const CommonDeckDetailFormComponent = ({ isOpenDetailCommonDeck, onCloseDetailCommonDeck, idCommonDeckDetailSelected }) => {


    Modal.setAppElement("#root");

    const { t } = useTranslation();
    const [step, setStep] = useState(0);

    const [languages, setLanguages] = useState([]);
    const [commonDeck, setCommonDeck] = useState();

    const handleContinue = () => {
        setStep(1);
    }

    const handlePrevious = () => {
        setStep(0);
    }

    const onPlayAudio = (id) => {
        const audio = document.getElementById(`audio-${id}`);
        audio?.play();
    }

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const rawData = await deckService.getAllLanguage();
                const languages = rawData.map(data => {
                    return {
                        hl: data.code,
                        value: data.nameInternational
                    };
                });

                setLanguages(languages);
            } catch (error) {
                setLanguages([]);
                console.error("Error fetching languages:", error);
            }
        };
        fetchLanguages();
    }, []);


    const onCloneCommonDeck = async () => { 

        // đã có id rồi. c
        const subUrl = `/groups/common-decks/${idCommonDeckDetailSelected}/clone`; 
        try { 
            await fetchData(subUrl, 'POST'); 
            showToastMessageV2("Clone thành công!", () => { 
                onCloseDetailCommonDeck(); 
            });
        }   
        catch(error) { 
            const { message } = error; 
            showToastError(message); 
        }     
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const rawData = await commonDeckService.getCommonDeck(idCommonDeckDetailSelected);
                setCommonDeck({
                    id: rawData.id,
                    name: rawData.name,
                    description: rawData.description,
                    configLanguage: rawData.configLanguage,
                cards: rawData.cards
                })
                setStep(0);


            } catch (error) {
                console.error("Error fetching deck:", error);
            }
        };

        if (isOpenDetailCommonDeck && idCommonDeckDetailSelected) {
            fetchData();
        }
    }, [isOpenDetailCommonDeck]);

    return <div>

        <ToastContainer />
        <Modal
            isOpen={isOpenDetailCommonDeck}
            onRequestClose={onCloseDetailCommonDeck}
            style={{
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    zIndex: 1000
                },
                content: {
                    top: "90px",
                    left: "0",
                    right: "0",
                    bottom: "auto",
                    height: "calc(100% - 120px)",
                    maxWidth: "90%",
                    margin: "0 auto",
                    padding: "20px 40px",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                },
            }}
        >

            <form>
                {/* title */}
                <div className="flex items-center justify-between">
                    <h1 className="text-lg font-medium">Chi tiết bộ thẻ</h1>

                    <button onClick={onCloseDetailCommonDeck} className="px-4">
                        <i className="fa-solid fa-xmark text-3xl cursor-pointer"></i>
                    </button>



                </div>
                <hr className="mt-4" />

                {/*  steps */}
                <div className="mt-3 relative">
                    <ol className="flex items-center w-full justify-between relative">
                        {/* Step 1 */}
                        <li className={`flex items-center w-full relative z-10 ${step === 0 ? 'text-blue-600' : 'text-gray-500'}`}>
                            <span className={`flex items-center justify-center w-10 h-10 ${step === 0 ? 'bg-blue-100' : 'bg-gray-100'} rounded-full lg:h-12 lg:w-12 shrink-0`}>
                                <svg
                                    className={`w-3.5 h-3.5 ${step === 0 ? 'text-blue-600' : 'text-gray-500'} lg:w-4 lg:h-4`}
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 16 12"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M1 5.917 5.724 10.5 15 1.5"
                                    />
                                </svg>
                            </span>
                            <span className={`ml-4 font-semibold ${step === 0 ? 'text-blue-600' : 'text-gray-500'}`}>Bộ thẻ</span>
                        </li>

                        {/* Step Connector */}
                        <div className="absolute inset-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[12px] flex items-center justify-between z-0">
                            <div className={`h-1 w-full ${step === 0 ? 'bg-blue-100' : 'bg-blue-600'}`}></div>
                        </div>

                        {/* Step 2 */}
                        <li className={`flex justify-end items-center w-full relative z-10 ${step === 1 ? 'text-blue-600' : 'text-gray-500'}`}>
                            <span className={`flex items-center justify-center w-10 h-10 ${step === 1 ? 'bg-blue-100' : 'bg-gray-100'} rounded-full lg:h-12 lg:w-12 shrink-0`}>
                                <svg
                                    className={`w-4 h-4 ${step === 1 ? 'text-blue-600' : 'text-gray-500'} lg:w-5 lg:h-5`}
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 16"
                                >
                                    <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
                                </svg>
                            </span>
                            <span className={`ml-4 font-semibold ${step === 1 ? 'text-blue-600' : 'text-gray-500'}`}>Thẻ</span>
                        </li>
                    </ol>
                </div>


                {/* content */}
                <div className="flex-1 mt-4">

                    {step == 0 && <div>

                        <div className="relative rounded-md">

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                    {t('DECK.NAME')} <span className="text-red-500">*</span>
                                </label>

                                <input
                                    value={commonDeck?.name}
                                    disabled
                                    className="appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight" id="username" type="text"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                    {t('DECK.DESCRIPTION')}
                                </label>
                                <textarea

                                    value={commonDeck?.description}
                                    disabled
                                    className=" appearance-none border  w-full py-2 px-3 text-gray-700 mb-3 leading-tight" id="description" type="text" />
                            </div>


                            <div className="flex gap-x-8">
                                <div className="relative">
                                    <select
                                        value={commonDeck?.configLanguage}
                                        required
                                        disabled
                                        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer">
                                        <option value="" disabled>Choose a language</option>
                                        {languages.map((language, index) => (<option key={index} value={language.hl}>{language.value}</option>))}
                                    </select>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                    </svg>
                                </div>

                                {/* clone */}

                               

                                <button onClick={() => onCloneCommonDeck()} type="button" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1.5 px-4 rounded inline-flex items-center">
                                    <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                                    <span>Clone</span>
                                </button>



                                {/* <div className="flex gap-x-3">
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            checked={commonDeck?.isPublic}

                                            type="checkbox" className="sr-only peer" />
                                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        <span className="ms-3 text-sm font-medium text-gray-900">Public</span>
                                    </label>

                                </div> */}
                            </div>
                        </div>
                    </div>}

                    {step == 1 && <div>
                        <div className="mt-6 relative overflow-y-scroll max-h-[340px] h-[340px]">

                            <div id="container-form-card" className="flex flex-col gap-y-6">
                                {
                                    commonDeck?.cards.length != 0 ? (commonDeck?.cards.map(card => (

                                        <div key={card.id} className="py-3 mr-4 flex items-center gap-x-8">

                                            <div className="mt-1 flex gap-x-12 justify-between items-center w-full">
                                                <div className="flex flex-col gap-y-1 flex-1">
                                                    <div className="flex gap-x-12">
                                                        <div className="flex flex-col flex-1">
                                                            <input
                                                                value={card.term}

                                                                className="bg-transparent py-1 rounded-none border-0 border-b-2 focus:border-green-500 border-gray-500 outline-none w-full"
                                                                type="text"
                                                                required
                                                            />
                                                            <label className="mt-2 text-xs text-gray-800 font-medium uppercase">Thuật ngữ<span className="text-red-500">*</span></label>
                                                        </div>
                                                        <div className="flex flex-col flex-1">
                                                            <input
                                                                value={card.definition}

                                                                required
                                                                className="bg-transparent py-1 rounded-none border-0 border-b-2 border-gray-500 focus:border-green-500 outline-none w-full"
                                                                type="text"
                                                            />
                                                            <label className="mt-2 text-xs uppercase text-gray-800 font-medium">Định nghĩa<span className="text-red-500">*</span></label>
                                                        </div>

                                                        <div className="flex flex-col flex-1">
                                                            <input
                                                                className="bg-transparent py-1 rounded-none border-0 border-b-2 border-gray-500 focus:border-green-500 outline-none w-full"
                                                                type="text"
                                                                value={card.example}

                                                            />
                                                            <label className="mt-2 text-xs uppercase text-gray-800 font-medium">Example</label>
                                                        </div>


                                                    </div>



                                                    {card.audio && <audio id={`audio-${card.id}`} controls className="hidden">
                                                        <source src={card.audio} type="audio/mp3" />
                                                        Your browser does not support the audio element.
                                                    </audio>
                                                    }


                                                </div>
                                                <div className="flex gap-x-3">

                                                    <button
                                                        type="button"
                                                        className={`w-16 h-16 ${card.image ? '' : 'border border-dashed border-gray-500'} rounded flex items-center justify-center`}
                                                    >
                                                        {card.image ? (
                                                            // Nếu có image, thay thế button bằng hình ảnh
                                                            <img
                                                                src={card.image}
                                                                alt="Card image"
                                                                className="w-16 h-16 object-cover" // Đảm bảo hình ảnh vừa với button
                                                            />
                                                        ) : (
                                                            <img
                                                                src="/src/assets/image/image.png"
                                                                className="w-5"
                                                                alt="Image"
                                                            />
                                                        )}
                                                    </button>

                                                    <button
                                                        onClick={() => onPlayAudio(card.id)}
                                                        type="button"
                                                        className="w-16 h-16 border rounded border-dashed border-gray-500 flex items-center justify-center"
                                                    >
                                                        <img
                                                            src="/src/assets/image/volume.png"
                                                            className="w-5"
                                                            alt="Volume"
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    ))) : (<Empty />)}
                            </div>
                        </div>
                    </div>}
                </div>

                {/* footer */}
                <div className="flex justify-end mt-auto pt-4 border-t absolute bottom-4 left-0 right-4">
                    <div className="flex gap-x-3">
                        {
                            step == 0 && <button onClick={handleContinue}

                                type="button"
                                className="group flex cursor-pointer items-center justify-center rounded-md px-6 py-[6px] text-white transition bg-blue-700">
                                <span className="group flex w-full items-center justify-center rounded py-1 text-center font-bold">{t('ACTION.CONTINUE')}</span>
                                <svg className="flex-0 ml-4 h-6 w-6 transition-all group-hover:ml-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        }
                        {
                            step == 1 && <div onClick={handlePrevious} className="group flex cursor-pointer items-center justify-center rounded-md bg-blue-700 px-6 py-[6px] text-white transition">
                                <svg className="flex-0 mr-4 h-6 w-6 transition-all group-hover:mr-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                <span className="group flex w-full items-center justify-center rounded py-1 text-center font-bold">{t('ACTION.PREVIOUS')}</span>
                            </div>
                        }

                    </div>
                </div>
            </form>
        </Modal>

    </div>
}


export default CommonDeckDetailFormComponent; 