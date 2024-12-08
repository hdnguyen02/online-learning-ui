import cardService from "service/card.service"
import deckService from "service/deck.service";
import { Link, useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";

export default function JoinCardComponent() {
    Modal.setAppElement("#root");

    const params = useParams();


    const [isAudio, setIsAudio] = useState(false);
    const audioRef = useRef(new Audio("/src/assets/audio/ThienLyOi-JackJ97-13829746.mp3"));

    const [isStart, setIsStart] = useState(false);
    const [isEnd, setIsEnd] = useState(false); // chưa end.
    const [isOpenSetting, setIsOpenSetting] = useState(false);
    const [isOnlyFavorite, setIsOnlyFavorite] = useState(false);

    const onOpenSetting = () => {
        setIsOpenSetting(true);
    }

    const onCloseSetting = () => {
        setIsOpenSetting(false);
    }



    const [deck, setDeck] = useState();

    audioRef.current.onended = () => {
        audioRef.current.play(); // Phát lại bài hát
    };


    const onToggleAudio = () => {
        setIsAudio(!isAudio);

        if (!isAudio) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }
    const [joinCardElements, setJoinCardElements] = useState();


    const onStart = async () => {

        const rawData = await deckService.getJoinCards(params.id, isOnlyFavorite);


        setJoinCardElements(rawData.map(item => ({
            ...item,
            isSelected: false,
            isCorrect: false
        })));
        setIsStart(true);
    }



    const [time, setTime] = useState(0); // Thời gian đếm (tính bằng giây)
    const [showTime, setShowTime] = useState(null); // Lưu ID của setTimeout

    useEffect(() => {
        let timer;
        if (isStart) {
            timer = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        } else {
            setShowTime(time); 
            setTime(0); // Nếu chưa bắt đầu, reset thời gian về 0
        }
        return () => clearInterval(timer); // Dọn dẹp bộ đếm khi game kết thúc
    }, [isStart]);

    // Hàm để format thời gian theo dạng MM:SS
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const onClickElement = (id) => {

        // map qua => sữa thành isSelect => đếm xem số lượng có phải là 2 chưa.     

        setJoinCardElements((prevElements) =>
            prevElements.map((joinCardElement) =>
                joinCardElement.id === id ? { ...joinCardElement, isSelected: !joinCardElement.isSelected } : joinCardElement
            )
        );
    }




    useEffect(() => {

        if (!joinCardElements) return;
        const joinCardElementsSelected = joinCardElements.filter(joinCardElement => joinCardElement.isSelected);


        if (joinCardElementsSelected.length == 2) {
            // so sánh 2 thẻ kia.


            const idJoinCardElementSelectedFirst = joinCardElementsSelected[0].id;
            const idJoinCardElementSelectedSecond = joinCardElementsSelected[1].id;


            if (joinCardElementsSelected[0].key == joinCardElementsSelected[1].key) {
                setJoinCardElements((prevElements) =>
                    prevElements.map((element) =>
                        element.id === idJoinCardElementSelectedFirst || element.id === idJoinCardElementSelectedSecond
                            ? { ...element, isSelected: false, isCorrect: true } : element
                    )
                );

            }
            else {
                setJoinCardElements((prevElements) =>
                    prevElements.map((element) =>
                        element.id === idJoinCardElementSelectedFirst || element.id === idJoinCardElementSelectedSecond
                            ? { ...element, isSelected: false, isCorrect: false } : element
                    )
                );

                const firstElement = document.getElementById(`join-card-element-${idJoinCardElementSelectedFirst}`);
                const secondElement = document.getElementById(`join-card-element-${idJoinCardElementSelectedSecond}`);

                // Xóa class nếu nó đã tồn tại để reset animation
                firstElement.classList.remove('shake');
                secondElement.classList.remove('shake');

                // Bắt buộc trình duyệt áp dụng lại animation bằng cách delay một chút
                setTimeout(() => {
                    firstElement.classList.add('shake');
                    secondElement.classList.add('shake');
                }, 0);

                // Xóa class sau 3 giây
                setTimeout(() => {
                    firstElement.classList.remove('shake');
                    secondElement.classList.remove('shake');
                }, 130);
            }
        }

        // check xem người chơi đã hoàn thành chưa
        

    }, [joinCardElements])


    // Theo giỏi kết thúc game
    useEffect(() => {
        if (!joinCardElements) return; 
        if(!joinCardElements.every(joinCardElement => joinCardElement.isCorrect)) return; 
        
        setTimeout(() => {
            
            setIsStart(false); 
            setIsEnd(true); 
        }, 100)
        

    }, [joinCardElements])

    function onRePlay() { 
        
        setIsEnd(false); 
        onStart(); 
    }



    useEffect(() => {

        fetchData();

        async function fetchData() {
            const rawData = await deckService.getDeck(params.id);
            setDeck(rawData);
        }
    }, [params.id]);

    return <div>
        {/* Giới thiệu */}
        <div className="px-8 pt-4 flex items-center justify-between">
            <div className="flex items-center gap-x-2">
                <img src="/src/assets/image/digital_14210185.png" className="w-9 h-9" alt="" />
                <span className="font-bold text-lg">Ghép thẻ</span>
            </div>

            {
                !isStart ? <span className="font-medium">{deck?.name}</span> : <span><span>{formatTime(time)}</span></span>
            }

            {/* <span className="font-medium">{deck?.name}</span> */}
            <div className="flex items-center gap-x-4">
                <button onClick={onToggleAudio} type="button" className="border py-2 px-3 rounded-lg">
                    {isAudio ? <i className="fa-solid fa-volume-high"></i> : <i className="fa-solid fa-volume-xmark"></i>}
                </button>
                <button onClick={onOpenSetting} className="border py-2 px-3 rounded-lg">Tùy chọn</button>
                <Link to={`/my-decks/${params.id}/learn-cards`} className="border py-2 rounded-lg px-4"><i className="fa-solid fa-xmark"></i></Link>
            </div>

        </div>

        {
            (!isStart && !isEnd) && <div className="mt-24 flex flex-col items-center gap-y-8">
                <img src="/src/assets/image/match_hero.webp" className="w-32" alt="" />
                <span className="text-2xl font-bold">Bạn đã sẵn sàng?</span>
                <span className="w-80 text-center">Hãy ghép tất cả thuật ngữ với định nghĩa của chúng nhanh nhất có thể. Tránh ghép sai, vì bạn sẽ bị phạt thêm thời gian!</span>
                <button onClick={onStart} type="button" className="rounded-lg bg-[#423ED8] font-medium px-32 py-6 text-white">Bắt đầu chơi</button>
            </div>
        }

        {
            (isStart && !isEnd) && <div className="mt-10 mx-24">
                {joinCardElements && (
                    <div className="grid grid-cols-4 gap-8 mx-auto">
                        {joinCardElements.map((joinCardElement, index) => {
                            return (
                                <div key={index} onClick={() => onClickElement(joinCardElement.id)} id={`join-card-element-${joinCardElement.id}`}
                                    className={`cursor-pointer bg-gray-100 dark:bg-[#2E3856] w-full h-44 flex items-center justify-center rounded-lg ${joinCardElement.isCorrect ? "join-card-is-correct" : ""} ${joinCardElement.isSelected ? "join-card-is-selected" : ""}`}
                                >
                                    <span className="text-xl">{joinCardElement.content}</span>

                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        }

        {
            isEnd && <div>

                <div className="mt-14 flex items-center justify-center gap-x-16">

                
                <div className="flex flex-col gap-y-6">
                    <span className="text-3xl font-bold">Bạn thật cừ! Liệu bạn có thể ghép nhanh hơn nữa?</span>
                    <span className="font-medium">Hãy thử đánh bại kỷ lục <em>{showTime} giây</em> của bản thân.</span>
                    <button onClick={onRePlay} className="text-white rounded-lg bg-[#423ED8] font-medium px-6 py-3 w-40">
                        Chơi lại
                    </button>
                
                </div>
                <div>
                    <img src="/src/assets/image/party-popper.png" alt="" />
                </div>

               
                </div>
              
            </div>
        }



        <Modal
            isOpen={isOpenSetting}
            onRequestClose={onCloseSetting}
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
                    height: "200px",
                    width: "700px",
                    margin: "0 auto",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    padding: "0px"
                },
            }}
        >
            <div className="w-full h-full dark:bg-[#0A092D] px-10 py-4">
                <div className="flex justify-end">
                    <button onClick={onCloseSetting} type="button" className="border py-0.5 px-2.5 rounded-lg">
                        <i className="fa-solid fa-xmark text-3xl"></i>
                    </button>
                </div>
                <div>
                    <span className="text-3xl font-bold">Tùy chọn</span>
                    <div className="mt-8 flex items-center justify-between">
                        <span>Chỉ học thuật ngữ có gắn sao</span>

                        <label className="inline-flex items-center cursor-pointer">
                            <input checked={isOnlyFavorite} onChange={e => setIsOnlyFavorite(e.target.checked)} type="checkbox" value="" className="sr-only peer" />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                   
                </div>
            </div>

        </Modal>

    </div>






}