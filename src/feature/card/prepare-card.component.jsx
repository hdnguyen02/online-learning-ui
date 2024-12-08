import { useEffect, useState } from "react"
import deckService from "service/deck.service"
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
export default function PrepareCardComponent() {

    const params = useParams();




    const [deck, setDeck] = useState();

    const [openItem, setOpenItem] = useState(null);

    const toggleItem = (item) => {
        setOpenItem(openItem === item ? null : item);
    };



    useEffect(() => {


        async function fetchData() {

            const rawData = await deckService.getDeck(params.id);
            setDeck(rawData);

        }
        fetchData();




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

                    <div className="bg-[#F6F7FB] dark:bg-[#2E3856] py-6 px-14 flex items-center flex-col rounded-lg cursor-pointer">
                        <img src="/src/assets/image/testing_18289665.png" className="w-9 h-9" alt="" />
                        <span>Kiểm tra</span>
                    </div>

                    <div className="bg-[#F6F7FB] dark:bg-[#2E3856] py-6 px-14 flex items-center flex-col rounded-lg cursor-pointer    ">
                        <img src="/src/assets/image/credit-card_5552728.png" className="w-9 h-9" alt="" />
                        <span>Thẻ ghi nhớ</span>
                    </div>

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
                                    <i class="fa-regular fa-star text-xl"></i>
                                    <i className="fa-solid fa-headphones text-xl"></i>
                                </div>

                            </div>
                        })
                    }


                </div>

            </div>


            {/* <div id="accordion-collapse" data-accordion="collapse">
                <h2 id="accordion-collapse-heading-1">
                    <button type="button" class="flex items-center justify-between w-full p-5 font-medium rtl:text-right border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
                        <span className="font-bold">Thuật ngữ cho học phần này ({deck?.quantityCards})</span>
                        <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
                        </svg>
                    </button>
                </h2>
                <div id="accordion-collapse-body-1" class="hidden" aria-labelledby="accordion-collapse-heading-1">
                    <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                        <p class="mb-2 text-gray-500 dark:text-gray-400">Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.</p>
                        <p class="text-gray-500 dark:text-gray-400">Check out this guide to learn how to <a href="/docs/getting-started/introduction/" class="text-blue-600 dark:text-blue-500 hover:underline">get started</a> and start developing websites even faster with components on top of Tailwind CSS.</p>
                    </div>
                </div>
                <h2 id="accordion-collapse-heading-2">
                    <button type="button" class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-2" aria-expanded="false" aria-controls="accordion-collapse-body-2">
                        <span>Is there a Figma file available?</span>
                        <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
                        </svg>
                    </button>
                </h2>
                <div id="accordion-collapse-body-2" class="hidden" aria-labelledby="accordion-collapse-heading-2">
                    <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
                        <p class="mb-2 text-gray-500 dark:text-gray-400">Flowbite is first conceptualized and designed using the Figma software so everything you see in the library has a design equivalent in our Figma file.</p>
                        <p class="text-gray-500 dark:text-gray-400">Check out the <a href="https://flowbite.com/figma/" class="text-blue-600 dark:text-blue-500 hover:underline">Figma design system</a> based on the utility classes from Tailwind CSS and components from Flowbite.</p>
                    </div>
                </div>
                <h2 id="accordion-collapse-heading-3">
                    <button type="button" class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-3" aria-expanded="false" aria-controls="accordion-collapse-body-3">
                        <span>What are the differences between Flowbite and Tailwind UI?</span>
                        <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
                        </svg>
                    </button>
                </h2>
                <div id="accordion-collapse-body-3" class="hidden" aria-labelledby="accordion-collapse-heading-3">
                    <div class="p-5 border border-t-0 border-gray-200 dark:border-gray-700">
                        <p class="mb-2 text-gray-500 dark:text-gray-400">The main difference is that the core components from Flowbite are open source under the MIT license, whereas Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone components, whereas Tailwind UI offers sections of pages.</p>
                        <p class="mb-2 text-gray-500 dark:text-gray-400">However, we actually recommend using both Flowbite, Flowbite Pro, and even Tailwind UI as there is no technical reason stopping you from using the best of two worlds.</p>
                        <p class="mb-2 text-gray-500 dark:text-gray-400">Learn more about these technologies:</p>
                        <ul class="ps-5 text-gray-500 list-disc dark:text-gray-400">
                            <li><a href="https://flowbite.com/pro/" class="text-blue-600 dark:text-blue-500 hover:underline">Flowbite Pro</a></li>
                            <li><a href="https://tailwindui.com/" rel="nofollow" class="text-blue-600 dark:text-blue-500 hover:underline">Tailwind UI</a></li>
                        </ul>
                    </div>
                </div>
            </div> */}



        </div>
    </div>
}