import Modal from "react-modal";
import { Link, useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react";
import deckService from "service/deck.service";
import './card.css';
import { t } from "i18next";

export default function TestCardComponent() {

    Modal.setAppElement("#root");

    const params = useParams();

    const maxNumberOfQuestions = 15;
    const [isStart, setIsStart] = useState(false);
    const [isEnd, setIsEnd] = useState(false);
    const [isOpenSetting, setIsOpenSetting] = useState(true);
    const [isOnlyFavorite, setIsOnlyFavorite] = useState(false);
    const [numberOfQuestions, setNumberOfQuestions] = useState(maxNumberOfQuestions);
    const [optionType, setOptionType] = useState("TERM");
    const [progressBar, setProgressBar] = useState({
        numberQuestions: null,
        numberQuestionsCompleted: null
    });

    const [questions, setQuestions] = useState();

    const optionTypes = [
        { value: "TERM", label: "Thuật ngữ" },
        { value: "DEFINITION", label: "Định nghĩa" },
        { value: "BOTH", label: "Cả hai" },
    ]


    const onOpenSetting = () => {
        setIsOpenSetting(true);
    }

    const onCloseSetting = () => {
        setIsOpenSetting(false);
    }

    const [deck, setDeck] = useState();

    const onStart = async () => {

        const rawData = await deckService.getTestCards(params.id, numberOfQuestions, optionType, isOnlyFavorite);

        if (!rawData) return;

        const dict = rawData.map(item => ({ ...item, answers: item.answers.map(answer => ({ isSelected: false, ...answer })), isCompleted: false, idChoose: null }));

        setProgressBar({
            numberQuestions: dict.length,
            numberQuestionsCompleted: 0
        });

        setQuestions(dict);
        setIsStart(true);
    }

    const onChooseAnswer = (event, id, idAnswer) => {

        setQuestions(questions.map(question => {

            if (question.id == id) {

                const idChoose = question.idChoose != idAnswer ? idAnswer : null;
                const isCompleted = question.idChoose != idAnswer ? true : false;
                return {
                    ...question, isCompleted, idChoose, answers: question.answers.map(answer => {
                        if (answer.id == idAnswer) {
                            return {
                                ...answer, isSelected: !answer.isSelected
                            }
                        }
                        else {
                            return {
                                ...answer, isSelected: false
                            }
                        }

                    })
                }
            }
            else return question;

        }))
    }




    useEffect(() => {
        if (!questions) return;
        const numberQuestionsCompleted = questions.filter(question => question.isCompleted).length;
        setProgressBar({
            ...progressBar,
            numberQuestionsCompleted
        });

    }, [questions])


    useEffect(() => {
        fetchData();
        async function fetchData() {
            const rawData = await deckService.getDeck(params.id);
            setDeck(rawData);
        }
    }, [params.id]);


    return <div>

        <div className="fixed left-0 right-0 top-0 dark:bg-[#0A092D]">



            <div className="px-8 pt-4 flex items-center justify-between">
                <div className="flex items-center gap-x-2">
                    <img src="/src/assets/image/testing_18289665.png" className="w-8 h-8" alt="" />
                    <span className="font-bold">Kiểm tra</span>
                </div>

                <div className="flex flex-col items-center">
                    {
                        (isStart && !isEnd) && <span>{`${progressBar.numberQuestionsCompleted}/${progressBar.numberQuestions}`}</span>
                    }

                    <span className="font-medium">{deck?.name}</span>
                </div>



                {/* <span className="font-medium">{deck?.name}</span> */}
                <div className="flex items-center gap-x-4">

                    <button
                        disabled={isStart}
                        onClick={onOpenSetting}
                        className="border py-2 px-3 rounded-lg disabled:cursor-not-allowed text-sm"
                    >
                        Tùy chọn
                    </button>

                    <Link to={`/my-decks/${params.id}/learn-cards`} className="border py-[6px] rounded-lg px-4"><i className="fa-solid fa-xmark text-sm"></i></Link>
                </div>

            </div>

            {
                (isStart && !isEnd) && <div className="progress-bar mt-2.5">
                    {[...Array(progressBar.numberQuestions)].map((_, index) => (
                        <div
                            key={index}
                            className={`step ${index < progressBar.numberQuestionsCompleted ? 'completed' : ''}`}
                        >
                            {/* {index + 1} */}
                        </div>
                    ))}
                </div>

            }

        </div>

        {
            (!isStart && !isEnd) && <div className="mt-24 flex flex-col items-center gap-y-8">
                <img src="/src/assets/image/match_hero.webp" className="w-32" alt="" />
                <span className="text-2xl font-bold">Bạn đã sẵn sàng?</span>
                <span className="w-80 text-center">Câu hỏi dưới dạng trắc nghiệm, chọn thuật ngữ hoặc định nghĩa đúng</span>
                <button onClick={onStart} type="button" className="rounded-lg bg-[#423ED8] font-medium px-32 py-6 text-white">Bắt đầu kiểm tra</button>
            </div>
        }


        {
            (isStart && !isEnd) && <div>

                <div className="mx-auto mt-28 w-1/2">
                    {
                        questions?.map((question, index) => {
                            return <div key={index} className="dark:bg-[#2E3856] mb-12 px-9 py-6 rounded-lg">
                                {/* Header */}
                                <div className="flex justify-between">
                                    <div className="flex items-center gap-x-2">
                                        <span className="text-sm font-medium">{question.type}</span>
                                        <i class="mt-0.5 text-xs fa-solid fa-volume-high"></i>
                                    </div>

                                    <div>
                                        <span className="text-xs dark:text-gray-400">{`${index + 1}/${questions.length}`}</span>
                                    </div>
                                </div>
                                {/* Câu hỏi */}
                                <div className="flex mt-8 justify-between">
                                    <span>{question.questionContent}</span>
                                    <div className="h-40">
                                        {question.image &&
                                            <img src={question.image} className="object-contain h-full w-full" alt="" />

                                        }
                                    </div>
                                </div>
                                {/* Câu hỏi */}
                                <div className="mt-8">

                                    <span className="text-sm font-medium">chọn đáp án đúng</span>
                                    <div className="mt-5 grid grid-cols-2 gap-6">
                                        {
                                            question.answers.map((answer, index) => {
                                                return <div onClick={e => onChooseAnswer(e, question.id, answer.id)} key={index} data-question={question.id} className={`p-4 rounded-lg answer cursor-pointer ${answer.isSelected ? 'is-choose-answer' : ''}`}>
                                                    {answer.contentAnswer}
                                                </div>
                                            })
                                        }

                                    </div>
                                </div>

                            </div>
                        })
                    }
                    <div>

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
                    height: "600px",
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
                        <label>Câu hỏi (tối đa 15)</label>

                        <input type="number" value={numberOfQuestions} onChange={e => setNumberOfQuestions(e.target.value)} className="dark:bg-[#2E3856] px-2 py-2 w-16 rounded-lg dark:text-white dark:border-none dark:outline-none dark:focus:outline-none text-gray-900" />
                    </div>


                    <div className="mt-8 flex items-center justify-between">
                        <label>Câu hỏi (tối đa 15)</label>

                        <select value={optionType} onChange={e => setOptionType(e.target.value)} className="dark:bg-[#2E3856] px-2 py-2 w-32 rounded-lg dark:text-white dark:border-none dark:outline-none dark:focus:outline-none text-gray-900" >
                            {
                                optionTypes.map(optionType => {
                                    return <option key={optionType.value} value={optionType.value}>
                                        {optionType.label}
                                    </option>
                                })
                            }
                        </select>
                    </div>
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