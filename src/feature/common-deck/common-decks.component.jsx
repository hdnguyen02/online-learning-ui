import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Modal from "react-modal";
import {
  fetchData,
  showToastError,
  showToastMessage,
  customFormatDistanceToNow
} from "../../global";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Empty from "component/Empty";
import deckService from "service/deck.service"; 
import { useTranslation } from "react-i18next";
import CommonDeckUpdateFormComponent from "feature/common-deck/component/common-deck-update-form.component";
import CommonDeckDetailFormComponent from "./component/common-deck-detail-form.component";
import commonDeckService from "../../service/common-deck.service";



export default function CommonDecksComponent() {
  const { t } = useTranslation(); 
  const appElement = document.getElementById("root");
  Modal.setAppElement(appElement);

  const location = useLocation();

  const params = useParams();
  const [isOpenCreateCommonDeck, setIsOpenCreateCommonDeck] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [commonDecks, setCommonDecks] = useState();
  const [configLanguage, setConfigLanguage] = useState("");

  async function handleCreateCommonDeck(event) {
    event.preventDefault();
    const subUrl = "/common-decks";
    const body = {
      name,
      description,
      configLanguage: configLanguage,
      idGroup: params.id

    };

    try {
      const { message } = await fetchData(subUrl, "POST", body);
      await getCommonDecks();
      showToastMessage(message);
      setName("");
      setDescription("");
      setIsOpenCreateCommonDeck(false);
    } catch (error) {
      showToastError(error.message);
    }
  }

  async function getCommonDecks() {
    const subUrl = "/common-decks?idGroup=" + params.id;
    try {
      console.log("chạy vào")
      const { data } = await fetchData(subUrl, "GET");
      console.log(data);
      setCommonDecks(data);
    } catch (error) {
      showToastError(error.message);
    }
  }

  useEffect(() => {
    getCommonDecks();
  }, []);

  const [languages, setLanguages] = useState([]);


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

  async function handleDeleteCommonDeck(idCommonDeck) {
    const subUrl = `/common-decks/${idCommonDeck}`;
    try {
      const { message } = await fetchData(subUrl, "DELETE");
      await getCommonDecks();
      showToastMessage(message);
    } catch (error) {
      showToastError(error.message);
    }
  }

  const stylesModalCreateCommonDeck = {
    content: {
      width: '620px',
      height: '400px',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      padding: '20px 40px',
      borderRadius: '8px',
      backgroundColor: 'while',
      border: '0px',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
    },
  };

  const [idCommonDeckUpdateSelected, setIdCommonDeckUpdateSelected] = useState();
  const [idCommonDeckDetailSelected, setIdCommonDeckDetailSelected] = useState();
  const [idCommonDeckDeleteSelected, setIdCommonDeckDeleteSelected] = useState(); 


  const [isOpenDeleteCommonDeck, setIsOpenDeleteCommonDeck] = useState(); 

  const onDeleteCommonDeck = (id) => { 
    setIdCommonDeckDeleteSelected(id); 
    setIsOpenDeleteCommonDeck(true); 
  }

  const onCloseDeleteCommonDeck = (id) => { 
    setIsOpenDeleteCommonDeck(false);
  }

  const onConfirmDeleteCommonDeck = async () => {
    const isSuccess = await commonDeckService.deleteCommonDeck(idCommonDeckDeleteSelected);
    if (isSuccess) showToastMessage('Delete success!'); 
    else showToastError('Delete fail!'); 
    setIsOpenDeleteCommonDeck(false);
    getCommonDecks();
  }

  // code thêm vào chỗ này. 
  const [isOPenUpdateCommonDeck, setIsOpenUpdateCommonDeck] = useState();
  const onOpenUpdateCommonDeck = (id) => {
    setIdCommonDeckUpdateSelected(id);
    setIsOpenUpdateCommonDeck(true);
  }

  const onCloseUpdateCommonDeck = () => {
    setIsOpenUpdateCommonDeck(false);
  }

  const [isOpenDetailCommonDeck, setIsOpenDetailCommonDeck] = useState();
  const onOPenDetailCommonDeck = (id) => {
    setIdCommonDeckDetailSelected(id);
    setIsOpenDetailCommonDeck(true);
  }

  const onCloseDetailCommonDeck = () => {
    setIsOpenDetailCommonDeck(false);
  }

  return (
    <div>


<Modal
        isOpen={isOpenDeleteCommonDeck}
        onRequestClose={onCloseDeleteCommonDeck}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
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
   
          <div className="flex items-center">
            <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto md:mx-0">
              <img src="/src/assets/image/alert.png" alt="" />
            </div>
            <div className="mt-4 text-center md:text-left md:ml-6">
              <p className="font-bold text-lg">Delete your account</p>
              <p className="text-sm text-gray-700 mt-1">
                You will lose all of your data by deleting your account. This action cannot be undone.
              </p>
            </div>
          </div>


          <div className="text-center md:text-right mt-4 flex flex-col md:flex-row justify-end gap-2">
            <button onClick={() => onCloseDeleteCommonDeck()}

              className="px-4 py-2 bg-gray-200 rounded-lg font-semibold text-sm"
            >
              Cancel
            </button>
            <button onClick={() => onConfirmDeleteCommonDeck()}

              className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold text-sm"
            >
              Delete Account
            </button>
          </div>
        </div>
      </Modal> 


      <CommonDeckDetailFormComponent
        idCommonDeckDetailSelected={idCommonDeckDetailSelected}
        onCloseDetailCommonDeck={onCloseDetailCommonDeck}
        isOpenDetailCommonDeck={isOpenDetailCommonDeck}
      />


      <CommonDeckUpdateFormComponent
        idCommonDeckUpdateSelected={idCommonDeckUpdateSelected}
        getCommonDecks={getCommonDecks}
        onCloseUpdateCommonDeck={onCloseUpdateCommonDeck}
        isOPenUpdateCommonDeck={isOPenUpdateCommonDeck}
      />

      {location.pathname.includes("owner") && (
        <div className="flex justify-end">
          {/* <button className="mb-4">
            <img
              onClick={() => setIsOpenCreateCommonDeck(true)}
              src="/plus.png"
              className="w-9"
              alt=""
            />
          </button> */}

          <button onClick={() => setIsOpenCreateCommonDeck(true)} type="button" className="flex gap-x-2 items-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2 text-center">
            <i className="fa-solid fa-plus"></i>
            <span>{t('ACTION.CREATE')}</span>
          </button> 
        </div>
      )}


      {commonDecks ? (
        <div className="mb-8 grid grid-cols-2 gap-8">
          {commonDecks.map((commonDeck, index) => (
            <div key={index} className="flex justify-between gap-x-6 p-5 border rounded-lg">
              <div className="flex min-w-0 gap-x-4">
                <img
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {commonDeck.name}
                  </p>
                  {/* <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                {ownerClass.owner.email}
                            </p> */}
                  <span className="text-gray-800 text-sm">
                    {customFormatDistanceToNow(commonDeck.createdDate)}
                  </span>
                </div>
              </div>
              <div className="flex gap-x-4 items-center">

                <span class="text-xs font-semibold inline-block py-1 px-2 rounded text-white bg-green-600">
                  {commonDeck.quantityCards} card
                </span>
                <button onClick={() => onDeleteCommonDeck(commonDeck.id)}>
                  <img
                    src="/src/assets/image/delete.png"
                    className="w-4 h-4"
                    alt=""
                  />
                </button>
                <button onClick={() => onOpenUpdateCommonDeck(commonDeck.id)} className="text-sm leading-6 text-gray-900">
                  <span className="underline">Edit</span>
                </button>
                <button onClick={() => onOPenDetailCommonDeck(commonDeck.id)}

                  className="text-sm leading-6 text-gray-900"
                >
                  <span className="underline">Detail</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Empty />
      )}



      {/* modal create common deck */}
      <Modal
        isOpen={isOpenCreateCommonDeck}
        onRequestClose={() => setIsOpenCreateCommonDeck(false)}
        contentLabel="Custom Modal"
        style={stylesModalCreateCommonDeck}
      >
        <form onSubmit={handleCreateCommonDeck} className="">
          <div className="flex justify-between">
            <h3 className="text-gray-800 text-lg font-medium">
              Create common card set
            </h3>
            <button
              onClick={() => setIsOpenCreateCommonDeck(false)} 
              type="button"
            >
              <img src="/close.png" className="w-5 h-5" alt="" />
            </button>

            {/* <button type="button" className="flex gap-x-2 items-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2 text-center">
            <i className="fa-solid fa-plus"></i>
            <span>{t('ACTION.CREATE')}</span>
          </button> */}
          </div>

          {/* <hr className="my-4" /> */}

          <div className="mt-6">
            <div className="flex flex-col gap-y-2 w-full">
              <label className="text-sm text-gray-600 font-bold" htmlFor="">
                Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                required
              />
            </div>

            <div className="flex flex-col gap-y-2 w-full mt-4">
              <label className="text-sm text-gray-600 font-bold" htmlFor="">
                description
              </label>
              <input
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                type="text"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                required
              />
            </div>
            <div className="mt-8">
              <div className="relative">
                <select
                  onChange={(e) => setConfigLanguage(e.target.value)}
                  value={configLanguage}
                  required
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer">
                  <option value="" disabled>Choose a language</option>
                  {languages.map((language, index) => (<option key={index} value={language.hl}>{language.value}</option>))}
                </select>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                </svg>
              </div>
            </div>


          </div>

          <hr className="my-5" />
          <div className="mt-4 flex justify-end items-center">
            {/* checkbox public => công khai lớp hay không */}

            <button
              type="submit"
              className="h-10 w-full items-center gap-x-2 px-8 text-sm text-center text-white font-bold rounded-md bg-primary sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>


      <ToastContainer />
    </div>
  );
}
