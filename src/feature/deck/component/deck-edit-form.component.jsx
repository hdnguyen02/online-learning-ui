


import Modal from "react-modal";
import { useState } from "react"
import { useTranslation } from 'react-i18next';
import deckService from "../../../service/deck.service";
import Slider from 'react-slick';
import { useEffect } from "react";
import { v4 as uuidv4 } from 'uuid'; // Import v4 từ thư viện uuid
import { ToastContainer } from "react-toastify";
import { handleActionResult } from "../../../global"; 
import Empty from "component/Empty";

const DeckEditFormComponent = ({getDecks, isOpenEditDeck, onCloseEditDeck, idDeckUpdateSelected}) => {


    Modal.setAppElement("#root");

    const { t } = useTranslation();
    const [step, setStep] = useState(0);
    const [querySearchImage, setQuerySearchImage] = useState('');
    const [searchedImage, setSearchedImage] = useState([]);

    const [languages, setLanguages] = useState([])
    const [idCardSelected, setIdCardSelected] = useState(null);



    const [isOpenChooseImage, setIsOpenChooseImage] = useState(false);
    const openChooseImage = (id) => {
        setIsOpenChooseImage(true);
        setQuerySearchImage('');
        setSearchedImage([])
        setIdCardSelected(id);
    }
    const closeChooseImage = () => setIsOpenChooseImage(false);


    const [isOpenChooseAudio, setIsOpenChooseAudio] = useState(false);
    const openChooseAudio = (id) => {
        setIsOpenChooseAudio(true);
        setQueryTransferAudio(''); 
        setIdCardSelected(id); 
    }

    const closeChooseAudio = () => setIsOpenChooseAudio(false);
    // search image. 

    const handleContinue = () => {
        setStep(1);
    }

    const handlePrevious = () => {
        setStep(0);
    }

 

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = { 
            deck: deckUpdate, cards: cardUpdates   
        }
        const isSuccess = await deckService.update(data);

        handleActionResult(isSuccess, 'UPDATE', t); 
        getDecks(); 
        onCloseEditDeck(); 
        // resetData(); 
    }

    const onKeyDownSearchImage = async (e) => {
        if (e.key != 'Enter') return;

        const rawData = await deckService.searchImages(querySearchImage);
        const images = rawData.results.map(image => image.urls.regular);
        setSearchedImage(images);
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
                setLanguages([])
                console.error("Error fetching languages:", error);
            }
        };
        fetchLanguages();
    }, []);

    const [deckUpdate, setDeckUpdate] =  useState(); 
    
    const [cardUpdates, setCardUpdates] = useState(); 



    useEffect(() => {
        const fetchData = async () => {
          try {
            const rawData = await deckService.getDeck(idDeckUpdateSelected);
            setDeckUpdate({ 
                id: rawData.id, 
                name: rawData.name, 
                description: rawData.description, 
                isPublic: rawData.isPublic, 
                configLanguage: rawData.configLanguage
            })

            setCardUpdates(rawData.cards.map(originCard => { 
                return { ...originCard, isOrigin: true }
            })); 
        
            setStep(0); 

        
          } catch (error) {
            console.error("Error fetching deck:", error);
          }
        };
      
        if (idDeckUpdateSelected) {
          fetchData();
        }
      }, [idDeckUpdateSelected]);
      

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const isButtonContinueDisabled = !( deckUpdate?.name.trim() && deckUpdate?.configLanguage.trim());


    const onAddCard = () => {
        const newCard = {
            id: uuidv4(), // Tạo id mới cho card
            term: null,
            definition: null,
            example: null,
            image: null,
            audio: null,
            isOrigin: false // card được thêm vào sau
        };

        setCardUpdates(prevCards => [...prevCards, newCard]);
    };


    const onSelectImage = (imageUrl) => {
        setCardUpdates(prevCards => prevCards.map(card =>
            card.id === idCardSelected ? { ...card, image: imageUrl } : card
        ));
        setTimeout(() => { 
            console.log("debug images"); 
            console.log(cardUpdates); 
        }, 2000)
        setIsOpenChooseImage(false);
    };


    const [queryTransferAudio, setQueryTransferAudio] = useState('');


    const onKeyDownTransferAudio = async (e) => {
        if (e.key !== 'Enter') return;
        setQueryTransferAudio(queryTransferAudio.trim());
    
        try {
            const rawData = await deckService.getVoice(queryTransferAudio, deckUpdate.configLanguage);
            const audio = new Audio(rawData);
            audio.play();

            setCardUpdates(prevCards => prevCards.map(card =>
                card.id === idCardSelected ? { ...card, audio: rawData } : card
            ));
        } catch (error) {
            console.log(error);
        }
    };


    const handleFileChange = (file, cardId, field) => {
        let fileUrl = null;

        if (field === "image") {
            fileUrl = URL.createObjectURL(file);
            setIsOpenChooseImage(false); 
        } else if (field === "audio") {
            fileUrl = URL.createObjectURL(file);
            setIsOpenChooseAudio(false); 
            console.log(fileUrl);
        }
        

        setCardUpdates((prevCards) =>
            prevCards.map((card) =>
                card.id === cardId ? { ...card, [field]: fileUrl } : card
            )
        );
    };


    const onUploadImage = () => {
        document.getElementById(`imageInput-${idCardSelected}`).click(); // upload hình ảnh lên.
    }


    const onUploadAudio = () => { 
        document.getElementById(`audioInput-${idCardSelected}`).click(); // upload hình ảnh lên.
    }


    const onPlayAudio = () => { 
        const selectedCard = cardUpdates.find(cardUpdate => cardUpdate.id === idCardSelected);
        if (!selectedCard.audio) return
        const audio = new Audio(selectedCard.audio); // Tạo đối tượng Audio với URL blob
        audio.play();
    }

    const onDeleteCard = (cardId) => { 
        setCardUpdates(cardUpdates.filter(cardUpdate => cardUpdate.id !== cardId));
    }


    return <div>

        <ToastContainer/>

        <Modal
            isOpen={isOpenEditDeck}
            onRequestClose={onCloseEditDeck}
            style={{
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    zIndex: 1000
                 },
                content: {
                    top: "60px",
                    left: "0",
                    right: "0",
                    bottom: "auto",
                    height: "calc(100vh - 90px)",
                    maxWidth: "92%",
                    margin: "0 auto",
                    // padding: "20px 40px",
                    padding: "0px",
                    borderRadius: "8px", 
                    display: "flex",
                    flexDirection: "column",
                    borderWidth: "0px"
                },
            }}
        >

            <form onSubmit={onSubmit} className="bg-white dark:bg-[#0A092D] h-full px-10 py-8">
                {/* title */}
                <div className="flex items-center justify-between">
                    <h1 className="text-lg font-medium dark:text-white">Hiệu chỉnh bộ thẻ</h1>
                   
                    <button onClick={onCloseEditDeck} className="px-4">
                    <i  className="fa-solid fa-xmark text-3xl cursor-pointer"></i>
                    </button>
                
                
                </div>
                <hr className="mt-4 dark:opacity-10" />

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
                            <span className={`ml-4 font-semibold ${step === 0 ? 'text-blue-600' : 'text-gray-500'}`}>{t('DECK.SET_UP_DECK')}</span>
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
                            <span className={`ml-4 font-semibold ${step === 1 ? 'text-blue-600' : 'text-gray-500'}`}>{t('DECK.SET_UP_CARD')}</span>
                        </li>
                    </ol>
                </div>


                {/* content */}
                <div className="flex-1 mt-8">

                    {step == 0 && <div>

                        <div className="relative rounded-md">

                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor="username">
                                    {t('DECK.NAME')} <span className="text-red-500">*</span>
                                </label>

                                <input
                                    onChange={(e) => setDeckUpdate({ ... deckUpdate, name: e.target.value })}
                                    value={deckUpdate?.name}
                                    className="focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600  appearance-none border dark:text-white dark:outline-none dark:bg-[#2E3856] dark:border-0 rounded-md  w-full py-2 px-3 text-gray-700 leading-tight" id="username" type="text"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600  dark:text-white block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                    {t('DECK.DESCRIPTION')}
                                </label>
                                <textarea
                                    onChange={(e) => setDeckUpdate({ ... deckUpdate, description: e.target.value })}
                                    value={deckUpdate?.description}
                                    className="focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600  appearance-none border dark:bg-[#2E3856] dark:text-white dark:outline-none dark:border-0 rounded-md w-full py-2 px-3 text-gray-700 mb-3 leading-tight" id="description" type="text" />
                            </div>


                            <div className="flex gap-x-8">
                                {/* <div>
                                    <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                        
                                    </select>
                                </div> */}

                                <div className="relative">
                                    <select
                                        onChange={(e) => setDeckUpdate({ ... deckUpdate, configLanguage: e.target.value })}
                                        value={deckUpdate?.configLanguage}
                                        required
                                        className="focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600  dark:bg-[#2E3856] dark:text-white dark:border-0 w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border dark:border-none border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer">
                                        <option value="" disabled>Choose a language</option>
                                        {languages.map((language, index) => (<option key={index} value={language.hl}>{language.value}</option>))}
                                    </select>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="h-5 w-5 ml-1 absolute top-[9px] right-2.5 text-slate-700 dark:text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                    </svg>
                                </div>


                                <div className="flex gap-x-3">
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            onChange={(e) => setDeckUpdate({ ...deckUpdate, isPublic: e.target.checked })}
                                            checked={deckUpdate?.isPublic}
                                        
                                            type="checkbox" className="sr-only peer" />
                                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        <span className="ms-3 text-sm font-medium text-gray-900">Public</span>
                                    </label>

                                </div>
                            </div>




                        </div>

                    </div>}

                    {step == 1 && <div>


                        <div className="mt-6 relative overflow-y-scroll max-h-[380px] h-[380px]">

                            <div id="container-form-card" className="flex flex-col gap-y-6">
                                {
                                cardUpdates?.length != 0 ? (cardUpdates?.map(cardUpdate => (

                                    <div key={cardUpdate.id} className="py-3 mr-4 flex items-center gap-x-8">
                                        <button type="button" onClick={() => onDeleteCard(cardUpdate.id)}>
                                            {/* <img src="/src/assets/image/delete.png" alt="" /> */}
                                            <i class="fa-solid fa-trash"></i>
                                        </button>
                                        <div className="mt-1 flex gap-x-12 justify-between items-center w-full">
                                            <div className="flex flex-col gap-y-1 flex-1">
                                                <div className="flex gap-x-12">
                                                    <div className="flex flex-col flex-1">
                                                        <input
                                                            value={cardUpdate.term}
                                                            onChange={(e) => {
                                                                setCardUpdates(cardUpdates.map(c =>
                                                                    c.id === cardUpdate.id ? { ...c, term: e.target.value } : c
                                                                ));
                                                            }}
                                                            className="bg-transparent py-1 rounded-none border-0 border-b-2 focus:border-indigo-600 border-gray-500 outline-none w-full"
                                                            type="text"
                                                            required
                                                        />
                                                        <label className="dark:text-white mt-2 text-xs text-gray-800 font-medium uppercase">Thuật ngữ<span className="text-red-500">*</span></label>
                                                    </div>
                                                    <div className="flex flex-col flex-1">
                                                        <input
                                                            value={cardUpdate.definition}
                                                            onChange={(e) => {
                                                                setCardUpdates(cardUpdates.map(c =>
                                                                    c.id === cardUpdate.id ? { ...c, definition: e.target.value } : c
                                                                ));
                                                            }}
                                                            required
                                                            className="bg-transparent py-1 rounded-none border-0 border-b-2 border-gray-500 focus:border-indigo-600 outline-none w-full"
                                                            type="text"
                                                        />
                                                        <label className="dark:text-white mt-2 text-xs uppercase text-gray-800 font-medium">Định nghĩa<span className="text-red-500">*</span></label>
                                                    </div>

                                                    <div className="flex flex-col flex-1">
                                                    <input
                                                        className="bg-transparent py-1 rounded-none border-0 border-b-2 border-gray-500 focus:border-indigo-600 outline-none w-full"
                                                        type="text"
                                                        value={cardUpdate.example}
                                                        onChange={(e) => {
                                                            setCardUpdates(cardUpdates.map(c =>
                                                                c.id === cardUpdate.id ? { ...c, example: e.target.value } : c
                                                            ));
                                                        }}
                                                    />
                                                    <label className="dark:text-white mt-2 text-xs uppercase text-gray-800 font-medium">Example</label>
                                                </div>

                                                    
                                                </div>
                                                {/* <div className="flex flex-col flex-1">
                                                    <input
                                                        className="bg-transparent py-1 rounded-none border-0 border-b-2 border-gray-500 focus:border-indigo-600 outline-none w-full"
                                                        type="text"
                                                        value={card.example}
                                                        onChange={(e) => {
                                                            const updatedCards = cards.map(c =>
                                                                c.id === card.id ? { ...c, example: e.target.value } : c
                                                            );
                                                            setCards(updatedCards);
                                                        }}
                                                    />
                                                    <label className="mt-2 text-sm font-medium">Example</label>
                                                </div> */}

                                                {/* file upload */}
                                                {/* upload image */}
                                                <input type="file" id={`imageInput-${cardUpdate.id}`} accept="image/*" onChange={(e) =>
                                                    handleFileChange(e.target.files[0], cardUpdate.id, "image")
                                                }
                                                className="hidden" 
                                                />

                                                {/* upload audio */}
                                                <input type="file" id={`audioInput-${cardUpdate.id}`} accept="mp3/*" onChange={(e) =>
                                                    handleFileChange(e.target.files[0], cardUpdate.id, "audio")
                                                }
                                                className="hidden" 
                                                />

                                            { cardUpdate.audio && <audio id={`audio-${cardUpdate.id}`} controls className="hidden">
                                                                <source src={cardUpdate.audio} type="audio/mp3" />
                                                                Your browser does not support the audio element.
                                                            </audio>
                                            }


                                            </div>
                                            <div className="flex gap-x-3">
                                            
                                                <button
                                                    onClick={() => openChooseImage(cardUpdate.id)}
                                                    type="button"
                                                    className={`w-16 h-16 ${cardUpdate.image ? '' : 'border border-dashed border-gray-500'} rounded flex items-center justify-center`}
                                                >
                                                    {cardUpdate.image ? (
                                                        // Nếu có image, thay thế button bằng hình ảnh
                                                        <img
                                                            src={cardUpdate.image}
                                                            alt="Card image"
                                                            className="w-16 h-16 object-cover" // Đảm bảo hình ảnh vừa với button
                                                        />
                                                    ) : (
                                                        <i class="fa-regular fa-image"></i>
                                                    )}
                                                </button>

                                                <button
                                                    onClick={() => openChooseAudio(cardUpdate.id)}
                                                    type="button"
                                                    className="w-16 h-16 border rounded border-dashed border-gray-500 flex items-center justify-center"
                                                >
                                                    <i class="fa-solid fa-headphones"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                         
                                ))) : (<Empty/>)}
                            </div>

                            <div className="my-6 flex justify-end mr-4">
                                <button onClick={onAddCard} type="button" className="dark:border-white w-full flex gap-x-2 items-center justify-center hover:text-white border border-blue-700 dark:hover:border-none hover:bg-blue-600 focus:outline-none font-medium rounded text-xs uppercase px-5 py-3 text-center">
                                    {/* <i className="fa-solid fa-plus"></i> */}
                                    <span>{t('ACTION.CREATE')}</span>
                                </button>
                            </div>

                        </div>
                    </div>}
                </div>

                {/* footer */}
                <div className="px-6 pb-6 flex justify-end mt-auto pt-4 border-none absolute bottom-4 left-0 right-4">
                    <div className="flex gap-x-3">
                        {
                            step == 0 && <button  onClick={handleContinue}
                                disabled={isButtonContinueDisabled}
                                type="button"
                                className={`group flex cursor-pointer items-center justify-center rounded-md px-6 py-[6px] text-white transition ${isButtonContinueDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-700'
                                    }`}>
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
                        <button type="submit" className="dark:text-white dark:border-white bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-[6px] px-5 border border-blue-500 hover:border-transparent rounded">
                            {t('ACTION.SAVE')}
                        </button>
                    </div>
                </div>
            </form>




            {/* sub modal */}


            <Modal
                isOpen={isOpenChooseImage}
                onRequestClose={closeChooseImage}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        zIndex: 10000
                    },
                    content: {
                        top: "214px",
                        left: "0",
                        right: "0",
                        bottom: "auto",
                        height: "380px",
                        width: "1000px",
                        margin: "0 auto",
                        padding: "20px 40px",
                        borderRadius: "8px",
                        display: "flex",
                        flexDirection: "column",
                    },
                }}
            >
                <div className="flex gap-x-8 p-4">
                    <input
                        onKeyDown={onKeyDownSearchImage}
                        value={querySearchImage}
                        onChange={(e) => setQuerySearchImage(e.target.value)} placeholder="Tìm hình ảnh" className="h-10 w-72 appearance-none border py-2 px-3 text-gray-700 mb-3 leading-tight" id="description" type="text" />
                    <button onClick={onUploadImage} type="button" className="h-10 flex gap-x-2 items-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 text-center">
                        <i className="fa-solid fa-upload"></i>
                        <span>Hoặc tải lên hình ảnh của riêng bạn</span>
                    </button>
                </div>


                <div className="slider-container">
                    <Slider {...settings}>
                        {searchedImage.map((image) => (
                            <div key={image} className="p-2">
                                <img
                                    onClick={() => onSelectImage(image)}
                                    src={image} // Sử dụng ảnh thumb để tiết kiệm băng thông
                                    alt={image}
                                    className="w-full h-52 object-cover cursor-pointer"
                                />
                            </div>
                        ))}
                    </Slider>
                </div>


            </Modal>


            <Modal
                isOpen={isOpenChooseAudio}
                onRequestClose={closeChooseAudio}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        zIndex: 10000
                    },
                    content: {
                        top: "214px",
                        left: "0",
                        right: "0",
                        bottom: "auto",
                        height: "380px",
                        width: "1000px",
                        margin: "0 auto",
                        padding: "20px 40px",
                        borderRadius: "8px",
                        display: "flex",
                        flexDirection: "column",
                    },
                }}
            >
                <div className="flex gap-x-8 p-4">
                    <input
                        onKeyDown={onKeyDownTransferAudio}
                        value={queryTransferAudio}
                        onChange={(e) => setQueryTransferAudio(e.target.value)}
                        placeholder="Chuyển đổi audio" className="h-10 w-72 appearance-none border py-2 px-3 text-gray-700 mb-3 leading-tight" id="description" type="text" />
                    <button onClick={onUploadAudio} type="button" className="h-10 flex gap-x-2 items-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 text-center">
                        <i className="fa-solid fa-upload"></i>
                        <span>Hoặc tải lên audio của riêng bạn</span>
                    </button>

                    <button onClick={onPlayAudio}>
                        <img src="/src/assets/image/volume.png" alt="" />
                    </button>
                </div>
            </Modal>
        </Modal>

    </div>
}


export default DeckEditFormComponent; 