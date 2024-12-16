import Modal from "react-modal";
import { Link, useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react";
import deckService from "service/deck.service";
import './card.css';
import { t } from "i18next";
import { PieChart, Pie, Cell } from "recharts";

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
    const [isOpenOverviewQuestions, setIsOpenOverviewQuestions] = useState(true);
    const [progressBar, setProgressBar] = useState({
        numberQuestions: null,
        numberQuestionsCompleted: null
    });
    const [isOpenWarning, setIsOpenWarning] = useState(false);

    const onOPenWarning = () => {
        setIsOpenWarning(true);
    }

    const onCloseWarning = () => {
        setIsOpenWarning(false);
    }

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
    }, [questions]);


    useEffect(() => {
        fetchData();
        async function fetchData() {
            const rawData = await deckService.getDeck(params.id);
            setDeck(rawData);
        }
    }, [params.id]);


    function onOpenOverviewQuestions() {
        setIsOpenOverviewQuestions(true);
    }

    function onCloseOverviewQuestions() {
        setIsOpenOverviewQuestions(false);
    }

    function onScrollQuestion(id) {
        const questionElement = document.getElementById(`question-${id}`);
        if (questionElement) {
            const yOffset = -430; // 28 * 4 (theo Tailwind, 1 đơn vị = 4px)
            const yPosition = questionElement.getBoundingClientRect().top + window.scrollY + yOffset;

            window.scrollTo({
                top: yPosition,
                behavior: 'smooth',
            });
        }
    }




    // tính toán thông số 
    const [overview, setOverview] = useState();
    const [percentCorrect, setPercentCorrect] = useState();
    const handleComputedResultTest = () => {
        setIsEnd(true);



        window.scrollTo(0, 0);
        // tính toán ra số phần trăm câu hỏi + tiến hành set lại câu sai và câu đúng. 
        // tính toán đúng sai
        const totalQuestion = questions.length;
        const countWrongAnswer = questions.filter(question => question.correctAnswer.id != question.idChoose).length;
        const countCorrectAnswer = questions.filter(question => question.correctAnswer.id == question.idChoose).length;
        const percentCorrect = (countCorrectAnswer / totalQuestion) * 100;
        const roundedPercentCorrect = parseFloat(percentCorrect.toFixed(2)); // làm tròn 2 chữ số thập phân

        setPercentCorrect(roundedPercentCorrect);
        setOverview([
            { name: "countWrongAnswer", value: countWrongAnswer },
            { name: " countCorrectAnswer", value: countCorrectAnswer },
        ])

        setQuestions(questions.map(question => {
            const isCorrected = question.correctAnswer.id == question.idChoose ? true : false;
            return {
                ...question, isCorrected
            }
        }));

    }


    const onSubmitQuestions = () => {
        // 

        // xem xét số câu hỏi xem sao
        const numberQuestionsNotCompleted = questions.filter(question => !question.isCompleted).length;
        if (numberQuestionsNotCompleted) {
            onOPenWarning();
            return;
        }

        handleComputedResultTest();

    }


    const onConfirmSubmitQuestions = () => {



        onCloseWarning();
        handleComputedResultTest();
    }

    const COLORS = ["#FF8042", "#00C49F"]; // Màu cho phần đúng và sai


    return <div>

        <div className="fixed left-0 right-0 top-0 dark:bg-[#0A092D] z-50! bg-white">



            <div className="px-8 pt-4 flex items-center justify-between">
                <div className="flex items-center gap-x-2">
                    <img src="/src/assets/image/testing_18289665.png" className="w-8 h-8" alt="" />
                    <span className="font-bold">Kiểm tra</span>
                </div>

                <div className="flex flex-col items-center">
                    {
                        (isStart && !isEnd) && <span className="text-base font-bold">{`${progressBar.numberQuestionsCompleted}/${progressBar.numberQuestions}`}</span>
                    }
                    <span className="font-medium">{deck?.name}</span>
                </div>

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
            (isStart && !isEnd) && <div className="pb-24">

                <div className="mx-auto mt-28 w-1/2 box-border">
                    {
                        questions?.map((question, index) => {
                            return <div key={index} className="dark:bg-[#2E3856] bg-[#F6F7FB] shadow mb-12 px-9 py-6 rounded-lg">
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
                                    <div className="mt-5 grid grid-cols-2 gap-6 box-border!">
                                        {
                                            question.answers.map((answer, index) => {
                                                return <div onClick={e => onChooseAnswer(e, question.id, answer.id)} key={index} id={`question-${question.id}`} className={` p-4 rounded-lg answer cursor-pointer ${answer.isSelected ? 'is-choose-answer' : ''}`}>
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


                {/* Submit */}

                <div className="w-1/2 mx-auto mt-12 flex flex-col items-center gap-12">
                    <img src="/src/assets/image/check.png" alt="" />
                    <span className="font-bold text-2xl">Tất cả đã xong! Bạn đã sẵn sàng gửi bài kiểm tra?</span>
                    <button onClick={onSubmitQuestions} className="w-52 rounded-lg bg-[#423ED8] font-medium py-5 text-white">
                        Gửi bài kiểm tra
                    </button>
                </div>
            </div>
        }


        {
            (isStart || isEnd) && <div className="fixed top-28 left-8">
                {!isOpenOverviewQuestions && <i onClick={onOpenOverviewQuestions} class="fa-solid fa-bars text-2xl cursor-pointer"></i>}
                {isOpenOverviewQuestions && <i onClick={onCloseOverviewQuestions} className="fa-solid fa-xmark text-2xl cursor-pointer"></i>}
                {
                    isOpenOverviewQuestions && <div className="mt-2 flex flex-col gap-y-2 dark:text-[#8F99B4] text-sm font-medium">
                        <span className="dark:text-[#88B1FF]">Danh sách câu hỏi</span>
                        {
                            questions?.map((question, index) => {
                                return <div onClick={() => onScrollQuestion(question.id)} key={index} className="flex items-center gap-x-2">
                                    {
                                        isEnd && (
                                            question?.isCorrected ? (
                                                <i className="fa-solid fa-check text-green-500"></i>
                                            ) : (
                                                <i className="fa-regular fa-circle-xmark text-red-500"></i>
                                            )
                                        )
                                    }

                                    <span className={`cursor-pointer ${question.isCompleted ? "dark:text-orange-500 text-blue-500" : ""
                                        }`}>{index + 1}</span>
                                </div>
                            })
                        }
                    </div>
                }

            </div>
        }


        {
            isEnd && <div className="mt-28 mx-auto w-1/2">

                {/* Header */}
                <div>
                    <div>
                        <span className="text-3xl font-bold">Đừng bỏ cuộc bây giờ! Hãy tin tưởng vào quá trình này.</span>
                    </div>
                    <div className="mt-6 flex gap-x-12">
                        <div className="w-1/2">
                            <div className="text-xl font-bold dark:text-gray-400">
                                Your time: 1 min
                            </div>
                            <div className="mt-8 flex gap-x-8 items-center">
                                <div style={{ position: "relative", width: 150, height: 150 }}>
                                    {/* Biểu đồ tròn */}
                                    <PieChart width={150} height={150}>
                                        <Pie
                                            data={overview}
                                            dataKey="value"
                                            cx="50%"  // Vị trí theo chiều ngang
                                            cy="50%"  // Vị trí theo chiều dọc
                                            innerRadius={45}  // Điều chỉnh bán kính phần trong
                                            outerRadius={70}  // Điều chỉnh bán kính phần ngoài
                                            fill="#8884d8"
                                            startAngle={90}
                                            endAngle={450}
                                            paddingAngle={5}
                                        >
                                            {overview?.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                    </PieChart>

                                    {/* Phần trăm ở giữa */}
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "50%",
                                            left: "50%",
                                            transform: "translate(-50%, -50%)",
                                            fontSize: "16px",  // Giảm kích thước chữ cho phù hợp
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {percentCorrect}%
                                    </div>
                                </div>

                                <div className="w-full">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-[#00C49F] text-xl">Correct</span>
                                        <span className="font-medium text-[#00C49F] text-xl">{overview[1].value}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-[#FF8042] text-xl">Incorrect</span>
                                        <span className="font-medium text-[#FF8042] text-xl">{overview[0].value}</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="w-1/2">
                            <div className="text-xl font-bold dark:text-gray-400">
                                Next steps
                            </div>
                            <div className="mt-10">


                                <div className="cursor-pointer dark:bg-[#2E3856] bg-[#F6F7FB] shadow h-32 rounded-lg p-4 flex gap-x-3">
                                    <div className="w-16 flex items-center">
                                        <img src="/src/assets/image/replay.png" alt="" />
                                    </div>

                                    <div className="flex flex-col gap-y-2 justify-center">
                                        <span className="w-32 bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-lg dark:bg-purple-900 dark:text-white">{overview[1].value} Thuật ngữ sai</span>
                                        <span className="dark:text-purple-300">Ôn luyện thuật ngữ trong chế độ học</span>
                                        <span className="text-xs">Ôn luyện các thuật ngữ bạn bỏ lỡ cho đến khi bạn nắm chắc</span>
                                    </div>
                                </div>
                                <div className="cursor-pointer mt-5 dark:bg-[#2E3856] bg-[#F6F7FB] shadow h-32 rounded-lg p-4 flex gap-x-3">
                                    <div className="w-16 flex items-center">
                                        <img src="/src/assets/image/form.png" alt="" />
                                    </div>

                                    <div className="flex flex-col gap-y-2 justify-center">
                                        <span className="dark:text-purple-300">Làm bài kiểm tra mới</span>
                                        <span className="text-xs">Hãy thử một bài kiểm tra khác để tăng sự tự tin của bạn</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>


                {/* body câu hỏi */}
                <div className="mt-12">
                    <span className="text-xl font-bold dark:text-gray-400">Your answers</span>
                    <div className="mt-12">


                        {


                            questions?.map((question, index) => {
                                return <div key={index} className="dark:bg-[#2E3856] bg-[#F6F7FB] mb-12 px-9 py-6 rounded-lg">
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
                                        {
                                            question?.isCorrected == false ? <span className="text-sm font-medium text-red-500">Đừng nản chí, học là một quá trình</span> : 
                                            <span className="text-sm font-medium text-green-500">Bạn đã trả lời đúng</span>
                                        }
                                        
                                        <div className="mt-5 grid grid-cols-2 gap-6">
                                            {
                                                question.answers.map((answer, index) => {


                                                    if (answer.id == question.correctAnswer.id) {
                                                        return <div key={index} id={`question-${question.id}`} className="flex gap-x-3 items-center  p-4 rounded-lg  cursor-pointer !border-2 !border-green-500">
                                                                <i className="fa-solid fa-check text-green-500"></i>
                                                                <span>{answer.contentAnswer}</span>
                                                             
                                                        </div>
                                                    }
                                                    if (answer.isSelected) { // Nguời dùng lưạ chọn không chính xác. 
                                                        return <div key={index} id={`question-${question.id}`} className="flex gap-x-3 items-center p-4 rounded-lg  cursor-pointer !border-2 !border-red-500">
                                                            <i class="fa-solid fa-x text-red-500"></i>
                                                            <span>{answer.contentAnswer}</span>
                                                        </div>
                                                    }
                                                    return <div key={index} id={`question-${question.id}`} className="p-4 rounded-lg answer cursor-pointer">
                                                        {answer.contentAnswer}
                                                    </div>



                                                })
                                            }
                                        </div>
                                    </div>

                                </div>
                            })

                        }
                    </div>

                </div>


            </div>
        }


        <Modal
            isOpen={isOpenWarning}
            onRequestClose={onCloseWarning}
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
                    height: "240px",
                    width: "700px",
                    margin: "0 auto",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    padding: "0px",
                    // borderWidth: "0px"
                },
            }}
        >
            <div className="w-full h-full dark:bg-[#0A092D] px-10 py-12">


                <div className="flex flex-col gap-y-4 items-center">
                    <span className="font-bold text-3xl">Có vẻ như bạn đã bỏ qua một số câu hỏi</span>
                    <span className="text-lg">Bạn muốn xem lại các câu hỏi đã bỏ qua hay gửi bài kiểm tra ngay bây giờ?</span>
                    {/* <hr className="dark:opacity-40"/> */}
                </div>

                <div className="mt-6 flex justify-end gap-x-4">
                    <button onClick={onCloseWarning} type="button" class="px-5 m h-10 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Hủy</button>
                    <button onClick={onConfirmSubmitQuestions} type="button" className="rounded-lg bg-[#423ED8] font-medium h-10 text-white px-8">Gửi bài kiểm tra</button>
                </div>


            </div>

        </Modal>




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
                    height: "360px",
                    width: "700px",
                    margin: "0 auto",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    padding: "0px",
                    // borderWidth: "0px"
                },
            }}
        >
            <div className="w-full h-full dark:bg-[#0A092D] px-10 py-4">
                <div className="flex justify-end">
                    <button onClick={onCloseSetting} type="button" className="border-none py-0.5 px-2.5 rounded-lg">
                        <i className="fa-solid fa-xmark text-3xl"></i>
                    </button>
                </div>

                <div>
                    <span className="text-3xl font-bold">Tùy chọn</span>

                    <div className="mt-8 flex items-center justify-between">
                        <label>Câu hỏi (tối đa 15)</label>

                        <input type="number" value={numberOfQuestions} onChange={e => setNumberOfQuestions(e.target.value)} className="dark:bg-[#2E3856] px-2 py-2 w-16 rounded-lg dark:text-white dark:border-none dark:outline-none dark:focus:outline-none border border-gray-300 text-gray-900" />
                    </div>


                    <div className="mt-8 flex items-center justify-between">
                        <label>Trả lời với</label>

                        <select value={optionType} onChange={e => setOptionType(e.target.value)} className="dark:bg-[#2E3856] px-2 py-2 w-32 rounded-lg dark:text-white dark:border-none dark:outline-none dark:focus:outline-none border border-gray-300 text-gray-900" >
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