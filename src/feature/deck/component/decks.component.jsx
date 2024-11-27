  import { useMemo, useState, useEffect, useRef } from "react";
import TableComponent from "./table.component";
import { fetchData, showToastError, showToastMessage } from "../../../global";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ModalEditDeck from "../../../component/ModalEditDeck";
import ModalConfirmDeleteDeck from "../../../component/ModalConfirmDeleteDeck" 
import deckService from "../../../service/deck.service";
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

  const columns = useMemo(
    () => [
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div className="flex gap-x-4">
            <button onClick={() => handleLearn(row.original.id)}>
              <i className="fa-solid fa-graduation-cap"></i>
            </button>
            <button
              onClick={() => handleEdit(row.original.id)}
              className="ml-2"
            >
              <i className="fa-regular fa-pen-to-square"></i>
            </button>
            {/* <button
              onClick={() => showModalConfirmDeleteDeck(row.original.id)}
              className="ml-2"
            >
              <i className="fa-solid fa-trash"></i>
            </button> */}
          </div>
        ),
      },
    
      {
        Header: "Name",
        accessor: "name",
        Cell: ({value}) => <span className="uppercase">{value}</span>
      },
      
      {
        Header: "Quantity cards",
        accessor: "quantityCards",
        Cell: ({value}) => value
      },
      
      {
        Header: "Quantity clone",
        accessor: "quantityClones",
        Cell: ({value}) => value
      },
      {
        Header: "public",
        accessor: "isPublic",
        Cell: ({ value }) =>
          value ? (
            <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">Yes</span>
          ) : (
            <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">No</span>
          ),
      },
      {
        Header: "Created At",
        accessor: "createdDate",
        Cell: ({ value }) => value,
      },
      {
        Header: "Description",
        accessor: "description",
      },

     
    ],
    [handleLearn]
  );

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
