import { useMemo, useState, useEffect, useRef } from "react";
import TableComponent from "./table.component";
import { fetchData, showToastError, showToastMessage, customFormatDistanceToNow } from "../../../global";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ModalEditDeck from "../../../component/ModalEditDeck"; 
import deckService from "service/deck.service";
import DeckDetailForm from "./deck-detail-form.component";
import { useTranslation } from 'react-i18next';
import DeckEditFormComponent from "./deck-edit-form.component";


import Modal from "react-modal";


const Decks = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const refModalEditDeck = useRef();
  const [idDeckDelete, setIdDeckDelete] = useState(null);

  async function getDecks() {
    const rawData = await deckService.getDecks();
    setData(rawData);
  }


  useEffect(() => {
    getDecks();
  }, []);

  const columns = useMemo(() => [
    {
      Header: "Name",
      accessor: "name",
      width: "w-40", // Đặt chiều rộng cho cột "Name"
      Cell: ({ value }) => <span className="uppercase">{value}</span>
    },
    {
      Header: "Quantity cards",
      accessor: "quantityCards",
      width: "w-12", // Đặt chiều rộng cho cột "Quantity cards"
      Cell: ({ value }) => <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-4 py-0.5 rounded">{value}</span>

    },
    {
      Header: "Quantity clone",
      accessor: "quantityClones",
      width: "w-12", // Đặt chiều rộng cho cột "Quantity clone"
      Cell: ({ value }) => <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-4 py-0.5 rounded">{value}</span>
    },
    {
      Header: "public",
      accessor: "isPublic",
      width: "w-4",
      Cell: ({ value }) =>
        value ? (
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" checked disabled className="sr-only peer" />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        ) : (
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" disabled className="sr-only peer" />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        ),
    },
    {
      Header: "Created At",
      accessor: "createdDate",
      width: "w-32", // Đặt chiều rộng cho cột "Created At"
      Cell: ({ value }) => customFormatDistanceToNow(value),
    },
    {
      Header: "Action",
      width: "w-8", // Đặt chiều rộng cho cột "Action"
      Cell: ({ row }) => (
        <div className="flex gap-x-4">
          {/* <button onClick={() => handleLearn(row.original.id)}>
            <img src="/src/assets/image/case-study.png" className="w-5 h-5" alt="" />
          </button> */}



          <button
            onClick={() => handleLearn(row.original.id)}
            disabled={row.original.quantityCards === 0}
            className={`relative px-4 py-0.5 overflow-hidden font-medium text-indigo-600 bg-indigo-100 border border-gray-100 rounded shadow-inner group 
            ${row.original.quantityCards === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span
              className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-indigo-600 group-hover:w-full ease"
            ></span>
            <span
              className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-indigo-600 group-hover:w-full ease"
            ></span>
            <span
              className="absolute top-0 left-0 w-full h-0 transition-all duration-200 delay-100 bg-indigo-600 group-hover:h-full ease"
            ></span>
            <span
              className="absolute bottom-0 left-0 w-full h-0 transition-all duration-200 delay-100 bg-indigo-600 group-hover:h-full ease"
            ></span>
            <span
              className="absolute inset-0 w-full h-full duration-300 delay-200 bg-indigo-600 opacity-0 group-hover:opacity-100"
            ></span>
            <span
              className="text-xs relative font-semibold transition-colors duration-200 delay-100 group-hover:text-white ease"
            >
              Ôn tập
            </span>
          </button>

          {/* <button
            onClick={() => handleLearn(row.original.id)}
            disabled={row.original.quantityCards === 0}
            className="rounded-md bg-slate-800 py-0.5 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
              Ôn tập
          </button> */}



          <button onClick={() => onOpenEditDeck(row.original.id)} className="ml-2">
            <i className="fa-regular fa-pen-to-square"></i>
          </button>

          <button onClick={() =>
            onOpenDetailDeck(row.original.id)} className="">
            <img src="/src/assets/image/info.png" className="w-4 h-4" alt="" />
          </button>

          <button onClick={() => onDeleteDeck(row.original.id)}>
            <img src="/src/assets/image/delete.png" className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ], [handleLearn, onOpenDetailDeck, onDeleteDeck, onOpenEditDeck

  ]);


  // lưu trữ deck. 
  const [deck, setDeck] = useState();

  const [isOpenDetailDeck, setIsOpenDetailDeck] = useState(false);



  Modal.setAppElement("#root");

  const [isOpenDeleteDeck, setIsOpenDeleteDeck] = useState(false);


  const [idDeckSelected, setIdDeckSelected] = useState();



  const handleEdit = (idDeck) => {
    refModalEditDeck.current.show(idDeck);
  };

  const getDeck = async (id) => {
    const rawData = await deckService.getDeck(id);
    setDeck(rawData);
  }

  async function onDeleteDeck(id) {
    setIdDeckSelected(id);
    setIsOpenDeleteDeck(true);
  }

  async function handleLearn(idDeck) {
    const url = `/my-decks/${idDeck}/learn-cards`;
    navigate(url);
  }

  async function onOpenDetailDeck(id) {
    setIsOpenDetailDeck(true);
    getDeck(id);
  }

  async function onCloseDetailDeck() {
    setIsOpenDetailDeck(false);
  }

  const onCloseDeleteDeck = () => {
    setIsOpenDeleteDeck(false);
  }


  const [isOpenEditDeck, setIsOpenEditDeck] = useState(); 


    async function onCloseEditDeck() {
      setIsOpenEditDeck(false);  
    }

    const [idDeckUpdateSelected, setIdDeckUpdateSelected] = useState(); 
  
    async function onOpenEditDeck(id) {
      setIsOpenEditDeck(true);
      setIdDeckUpdateSelected(id); 
    }

  

  const { t } = useTranslation();

  async function onConfirmDeleteDeck() {
    const isSuccess = await deckService.deleteDeck(idDeckSelected);
    if (isSuccess) showToastMessage('Delete success!'); 
    else showToastError('Delete fail!'); 
    setIsOpenDeleteDeck(false);
    getDecks();
  }

  return (
    <div>
      {/* Modal delete deck */}
      <Modal
        isOpen={isOpenDeleteDeck}
        onRequestClose={onCloseDeleteDeck}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 1000
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
        {/* Overlay to create dim background */}
        {/* <div className="w-full h-full absolute z-10 inset-0"></div> */}

        {/* Modal Content */}
        <div className="bg-white rounded-lg max-w-md mx-auto p-4 relative">
          {/* Header with icon */}
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

          {/* Footer with action buttons */}
          <div className="text-center md:text-right mt-4 flex flex-col md:flex-row justify-end gap-2">
            <button onClick={() => onCloseDeleteDeck()}

              className="px-4 py-2 bg-gray-200 rounded-lg font-semibold text-sm"
            >
              Cancel
            </button>
            <button onClick={() => onConfirmDeleteDeck()}

              className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold text-sm"
            >
              Delete Account
            </button>
          </div>
        </div>
      </Modal>  




     {/* Modal edit deck */}


      <DeckEditFormComponent
        getDecks={getDecks}
        isOpenEditDeck={isOpenEditDeck} 
        onCloseEditDeck={onCloseEditDeck}
        idDeckUpdateSelected={idDeckUpdateSelected}
      />





      {/* Modal detail deck */}
      <DeckDetailForm
        isOpenDetailDeck={isOpenDetailDeck}
        onCloseDetailDeck={onCloseDetailDeck}
        deck={deck}
      >
      </DeckDetailForm>
      <ModalEditDeck ref={refModalEditDeck} getDecks={getDecks} />


      <TableComponent
        columns={columns}
        handleEdit={handleEdit}

        data={data}
        getDecks={getDecks}
      />
      <ToastContainer />
    </div>
  );
};

export default Decks;
