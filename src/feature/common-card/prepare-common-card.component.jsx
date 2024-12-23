import { useEffect, useState } from "react"

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchData } from "../../global";

export default function PrepareCardComponent() {

    const params = useParams();

    const [commonDeck, setCommonDeck] = useState(); 
    

    async function getCommonDeck() { 
        try { 
            const subUrl = '/common-decks/' + params.id; 
            const { data } = await fetchData(subUrl, 'GET'); 
            console.log(data); 
            setCommonDeck(data); 
        }
        catch(error) { 
            console.log(error.message);
        }
    }

    useEffect(() => {
        getCommonDeck();
    }, [params.id]);

    return <div className="px-32 text-[#F6F7FB]">
        <h3 className="font-bold text-gray-700 dark:text-[#F6F7FB] text-3xl">{commonDeck?.name}</h3>
        <div className="mt-8     font-medium">
            <div>
                <span className="text-gray-800 dark:text-white">Trò chơi và hoạt động</span>
                <div style={{ fontWeight: "400" }} className="mt-6 flex gap-x-5 text-sm">
                    <Link to={`/groups/common-decks/${params.id}/learn-cards/join`} className="bg-[#F6F7FB] dark:bg-[#2E3856] py-6 px-16 flex items-center flex-col gap-y-2 rounded-lg cursor-pointer">
                    
                    <i className="fa-solid fa-layer-group  text-[#4255FF] text-3xl"></i>
                        <span className="text-gray-800 font-medium">Ghép thẻ</span>
                    </Link>

                    <Link to={`/groups/common-decks/${params.id}/learn-cards/test`} className="bg-[#F6F7FB] dark:bg-[#2E3856] py-6 px-16 flex items-center flex-col gap-y-2 rounded-lg cursor-pointer">
                    <i className="fa-brands fa-elementor  text-[#4255FF] text-3xl"></i>
                        <span className="text-gray-800 font-medium">Kiểm tra</span>
                    </Link>
                    <Link to={`/groups/common-decks/${params.id}/learn-cards/study`} className="bg-[#F6F7FB] dark:bg-[#2E3856] py-6 px-16 flex items-center flex-col gap-y-2 rounded-lg cursor-pointer">
                    <i className="fa-solid fa-file-import text-[#4255FF] text-3xl"></i>
                        <span className="text-gray-800 font-medium">Thẻ ghi nhớ</span>
                    </Link>

                </div>
            </div>

            <div className="mt-12">
                <span className="font-bold text-gray-800 dark:text-white">Thuật ngữ cho học phần này ({commonDeck?.quantityCards})</span>
                <div className="mt-6 bg-[#F6F7FB] dark:bg-[#0A092D] p-4 dark:p-0">
                    {
                        commonDeck?.cards.map((card, index) => {
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
                                    {/* <i onClick={() => ontoggleFavourite(card.id, card.isFavourite)} className={`cursor-pointer fa-regular fa-star text-xl font-light ${card.isFavourite ? 'text-yellow-500' : ''}`}></i> */}
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