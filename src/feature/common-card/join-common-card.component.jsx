


import deckService from "service/deck.service";
import { Link, useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { fetchData } from "../../global";
import { da } from "date-fns/locale";
import { sub } from "date-fns";

export default function JoinCommonCardComponent() {
    Modal.setAppElement("#root");

    const params = useParams();
    const [quantity, setQuantity] = useState(); 


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


        try { 
            const paramQuantity = quantity ? quantity : deck.cards.length; 
            const subUrl = `/common-decks/${params.id}/join-cards?quantity=${paramQuantity}`;
            const { data } = await fetchData(subUrl, 'GET'); 


            setJoinCardElements(data.map(item => ({
                ...item,
                isSelected: false,
                isCorrect: false
            })));
            setIsStart(true);
            
        }
        catch(error) { 
            console.log(error.message); 
        }

        


        
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
        if (!joinCardElements.every(joinCardElement => joinCardElement.isCorrect)) return;

        setTimeout(() => {

            setIsStart(false);
            setIsEnd(true);
        }, 100)


    }, [joinCardElements])

    function onRePlay() {

        setIsEnd(false);
        onStart();
    }


    const onChangeQuantity = (event) => { 
        const value = event.target.value;   

        if (value > deck?.cards.length){
            console.log("1"); 
            setQuantity(deck.cards.length);
         
        } 
     
       
    }

    useEffect(() => {

       

        async function getCommonDeck() {
            const subUrl = '/common-decks/' + params.id;
            try {
                const {data} = await fetchData(subUrl, 'GET'); 
                setDeck(data);
                setQuantity(data.cards.length); 
            }
            catch (error) { 
                console.log(error.message);
            }

        }

        getCommonDeck();

    }, [params.id]);

    return <div className="bg-[#0A092D]">
        {/* Giới thiệu */}
        <div className="bg-[#0A092D] fixed left-0 right-0 top-0 px-8 pt-4 flex items-center justify-between">
            <div className="flex items-center gap-x-2">
                <img src="/src/assets/image/digital_14210185.png" className="w-9 h-9" alt="" />
                <span className="font-bold text-lg text-white">Ghép thẻ</span>
            </div>

            {
                !isStart ? <span className="font-medium text-white">{deck?.name}</span> : <span><span className="text-white">{formatTime(time)}</span></span>
            }

            {/* <span className="font-medium">{deck?.name}</span> */}
            <div className="flex items-center gap-x-4">
                <button onClick={onToggleAudio} type="button" className="border py-2 px-3 rounded-lg">
                    {isAudio ? <i className="fa-solid fa-volume-high"></i> : <i className="fa-solid fa-volume-xmark text-white"></i>}
                </button>
                <button
                    disabled={isStart}
                    onClick={onOpenSetting}
                    className={`border py-2 px-3 rounded-lg ${isStart ? "cursor-not-allowed opacity-50 text-white" : "text-white"}`}
                >Tùy chọn</button>
                <Link to={`/groups/common-decks/${params.id}/learn-cards`} className="border py-2 rounded-lg px-4"><i className="fa-solid fa-xmark text-white"></i></Link>
            </div>

        </div>

        {
            (!isStart && !isEnd) && <div className="py-24 flex flex-col items-center gap-y-8 h-screen">
                <img src="/src/assets/image/match_hero.webp" className="w-32" alt="" />
                <span className="text-2xl font-bold text-white">Bạn đã sẵn sàng?</span>
                <span className="w-80 text-center text-white">Hãy ghép tất cả thuật ngữ với định nghĩa của chúng nhanh nhất có thể. Tránh ghép sai, vì bạn sẽ bị phạt thêm thời gian!</span>
                <button onClick={onStart} type="button" className="rounded-lg bg-[#423ED8] font-medium px-32 py-6 text-white">Bắt đầu chơi</button>
            </div>
        }

        {
            (isStart && !isEnd) && <div className="py-24 mx-24 min-h-screen">
                {joinCardElements && (
                    <div className="grid grid-cols-4 gap-8 mx-auto">
                        {joinCardElements.map((joinCardElement, index) => {
                            return (
                                <div key={index} onClick={() => onClickElement(joinCardElement.id)} id={`join-card-element-${joinCardElement.id}`}
                                    className={`cursor-pointer bg-[#2E3856] w-full h-44 flex items-center justify-center rounded-lg ${joinCardElement.isCorrect ? "join-card-is-correct" : ""} ${joinCardElement.isSelected ? "join-card-is-selected" : ""}`}
                                >
                                    <span className="text-xl text-white">{joinCardElement.content}</span>

                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        }

        {
            isEnd && <div>

                <div className="py-32 flex justify-center gap-x-16 min-h-screen">
                    <div className="flex flex-col gap-y-6">
                        <span className="text-3xl font-bold text-white">Bạn thật cừ! Liệu bạn có thể ghép nhanh hơn nữa?</span>
                        <span className="font-medium text-white">Hãy thử đánh bại kỷ lục <em>{showTime} giây</em> của bản thân.</span>
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
            <div className="w-full h-full bg-[#0A092D] px-10 py-4">
                <div className="flex justify-end">
                    <button onClick={onCloseSetting} type="button" className="border py-0.5 px-2.5 rounded-lg text-white">
                        <i className="fa-solid fa-xmark text-3xl"></i>
                    </button>
                </div>
                <div>
                    <span className="text-3xl font-bold text-white">Tùy chọn</span>
                    <div className="mt-8 flex items-center justify-between">
                        <label className="text-white">Số thẻ (tối đa {deck?.cards.length})</label>

                        {/* <label className="inline-flex items-center cursor-pointer">
                            <input checked={isOnlyFavorite} onChange={e => setIsOnlyFavorite(e.target.checked)} type="checkbox" value="" className="sr-only peer" />
                            <div className="relative w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-blue-600"></div>
                        </label> */}

                        <input type="number" value={quantity} onChange={event => onChangeQuantity(event)} className="bg-[#2E3856] px-2 py-2 w-16 rounded-lg text-white border-none outline-none focus:outline-none border-gray-300" />
                    </div>

                </div>
            </div>

        </Modal>

    </div>






}