import { useEffect, useState } from "react"
import deckService from "service/deck.service"
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchData } from "../../global";

export default function PrepareCardComponent() {

    const params = useParams();




    const [deck, setDeck] = useState();

    const [openItem, setOpenItem] = useState(null);

    const toggleItem = (item) => {
        setOpenItem(openItem === item ? null : item);
    };


    const ontoggleFavourite = async (id, isFavourite) => { 
        const value = !isFavourite;
        const subUrl = `/cards/${id}/favourite?value=${value}`;

        try { 
            await fetchData(subUrl, 'PUT'); 
            await getDeck(); 
        }
        catch(error) {
            const {message} = error; 
            console.log(message); 
        }



    }

    async function getDeck() {
        const rawData = await deckService.getDeck(params.id);
        setDeck(rawData);
    }

    useEffect(() => {
        getDeck();
    }, [params.id]);


    return <div className="px-32 text-[#F6F7FB]">
        <h3 className="font-bold text-gray-700 dark:text-[#F6F7FB] text-3xl">{deck?.name}</h3>
        <div className="mt-8 font-medium">
            <div>
                <span className="text-gray-800 dark:text-white">Trò chơi và hoạt động</span>
                <div style={{ fontWeight: "400" }} className="mt-6 flex gap-x-5 text-sm">
                    <Link to={`/my-decks/${params.id}/learn-cards/join`} className="bg-[#F6F7FB] dark:bg-[#2E3856] py-6 px-14 flex items-center flex-col rounded-lg cursor-pointer">
                        <img src="/src/assets/image/digital_14210185.png" className="w-9 h-9" alt="" />
                        <span className="">Ghép thẻ</span>
                    </Link>

                    <Link to={`/my-decks/${params.id}/learn-cards/test`} className="bg-[#F6F7FB] dark:bg-[#2E3856] py-6 px-14 flex items-center flex-col rounded-lg cursor-pointer">
                        <img src="/src/assets/image/testing_18289665.png" className="w-9 h-9" alt="" />
                        <span>Kiểm tra</span>
                    </Link>
                    <Link to={`/my-decks/${params.id}/learn-cards/study`} className="bg-[#F6F7FB] dark:bg-[#2E3856] py-6 px-14 flex items-center flex-col rounded-lg cursor-pointer    ">
                        <img src="/src/assets/image/credit-card_5552728.png" className="w-9 h-9" alt="" />
                        <span>Thẻ ghi nhớ</span>
                    </Link>

                </div>
            </div>

            <div className="mt-12">
                <span className="font-bold text-gray-800 dark:text-white">Thuật ngữ cho học phần này ({deck?.quantityCards})</span>
                <div className="mt-6 bg-[#F6F7FB] dark:bg-[#0A092D] p-4 dark:p-0">
                    {
                        deck?.cards.map((card, index) => {
                            return <div key={index} className="h-16 mt-3 px-6 py-1 bg-white dark:bg-[#2E3856] text-gray-800 dark:text-white rounded flex items-center">
                                <div style={{ fontWeight: "400" }} className="w-1/5 border-r border-gray-300">
                                    {card.term}
                                </div>
                                <div style={{ fontWeight: "400" }} className="w-1/5  border-r border-gray-300 ml-8">{card.definition}</div>
                                <div
                                    style={{ fontWeight: "400" }}
                                    className="w-2/5 ml-8 overflow-hidden text-ellipsis whitespace-nowrap"
                                >
                                    {card.example}
                                </div>
                                <div className="ml-8 flex gap-x-4">
                                    <i onClick={() => ontoggleFavourite(card.id, card.isFavourite)} className={`cursor-pointer fa-regular fa-star text-xl font-light ${card.isFavourite ? 'text-yellow-500' : ''}`}></i>
                                    <i className="fa-solid fa-headphones text-xl"></i>
                                </div>

                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    </div>
}