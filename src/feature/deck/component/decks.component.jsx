import { useMemo, useState, useEffect, useRef } from "react";
import TableComponent from "./table.component";
import { fetchData, showToastError, showToastMessage } from "../../../global";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ModalEditDeck from "../../../component/ModalEditDeck";
import ModalConfirmDeleteDeck from "../../../component/ModalConfirmDeleteDeck"
import deckService from "../../../service/deck.service";
import {customFormatDistanceToNow} from '../../../global'
const Decks = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const refModalEditDeck = useRef();
  const [idDeckDelete, setIdDeckDelete] = useState(null);

  async function getDecks() {
    const rawData = await deckService.getDecks();
    setData(rawData);
    console.log(rawData);
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
          <button onClick={() => handleLearn(row.original.id)}>
            <i className="fa-solid fa-graduation-cap"></i>
          </button>
          <button onClick={() => handleEdit(row.original.id)} className="ml-2">
            <i className="fa-regular fa-pen-to-square"></i>
          </button>
        </div>
      ),
    },
  ], [handleLearn]);
  
  const handleEdit = (idDeck) => {
    refModalEditDeck.current.show(idDeck);
  };

  async function handleDelete(idDeck) {
    alert(`Handle delete decks: ${idDeck}`);
  }

  async function handleLearn(idDeck) {
    const url = `/my-decks/${idDeck}/learn-cards`;
    navigate(url);
  }

  function handleCancelDeleteDeck() {
    document.getElementById("popup-delete-deck").style.display = "none";
    setIdDeckDelete(null);
  }

  function showModalConfirmDeleteDeck(idDeck) {
    document.getElementById("popup-delete-deck").style.display = "flex";
    setIdDeckDelete(idDeck);
  }

  async function handleDeleteDeck() {
    const subUrl = `/decks/${idDeckDelete}`;
    try {
      await fetchData(subUrl, "DELETE");
      await getDecks();
      showToastMessage("Deleted card set successfully");
    } catch (error) {
      showToastError(error.message);
    }
    setIdDeckDelete(null);
  }

  return (
    <div>
      {/* <h1>My Table</h1> */}

      <ModalEditDeck ref={refModalEditDeck} getDecks={getDecks} />
      <ModalConfirmDeleteDeck
        idDeckDelete={idDeckDelete}
        handleCancelDeleteDeck={handleCancelDeleteDeck}
        handleDeleteDeck={handleDeleteDeck}
      />

      <TableComponent
        columns={columns}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleStudy={handleDelete}
        data={data}
        getDecks={getDecks}
      />
      <ToastContainer />
    </div>
  );
};

export default Decks;
