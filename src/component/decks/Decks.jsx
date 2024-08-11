import React, { useMemo, useState, useEffect, useRef } from "react";
import TableComponent from "./TableComponent";
import { fetchData, showToastError, showToastMessage } from "../../global";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ModalEditDeck from "../ModalEditDeck";
import ModalConfirmDeleteDeck from "../../component/ModalConfirmDeleteDeck" 
import { commonformatDistanceToNow } from "../../helper/common";

const Decks = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const refModalEditDeck = useRef();
  const [idDeckDelete, setIdDeckDelete] = useState(null);

  async function getDecks() {
    try {
      const subUrl = "/decks";
      const response = await fetchData(subUrl, "GET");
      setData(response.data);
    } catch (error) {
      showToastError(error.message);
    }
  }

  useEffect(() => {
    getDecks();
  }, []);

  const columns = useMemo(
    () => [
    
      {
        Header: "Name",
        accessor: "name",
        Cell: ({value}) => <span className="uppercase font-bold">{value}</span>
      },
      
      {
        Header: "Quantity cards",
        accessor: "quantityCards",
        Cell: ({value}) => <span className="text-xs font-semibold inline-block py-1 px-2 rounded text-orange-600 bg-orange-200 uppercase last:mr-0 mr-1">
        {value}
      </span>
      },
      
      {
        Header: "Quantity clone",
        accessor: "quantityClones",
        Cell: ({value}) => <span className="text-xs font-semibold inline-block py-1 px-2 rounded text-emerald-600 bg-emerald-200 uppercase last:mr-0 mr-1">
        {value}
      </span>
      },
      {
        Header: "public",
        accessor: "isPublic",
        Cell: ({ value }) =>
          value ? (
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 last:mr-0 mr-1">
              Yes
            </span>
          ) : (
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-red-600 bg-red-200 last:mr-0 mr-1">
              No
            </span>
          ),
      },
      {
        Header: "Created At",
        accessor: "createAt",
        Cell: ({ value }) => commonformatDistanceToNow(value),
      },
      {
        Header: "Description",
        accessor: "description",
      },

      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div>
            <button onClick={() => handleLearn(row.original.id)}>
              <i className="fa-solid fa-graduation-cap"></i>
            </button>
            <button
              onClick={() => handleEdit(row.original.id)}
              className="ml-2"
            >
              <i className="fa-regular fa-pen-to-square"></i>
            </button>
            <button
              onClick={() => showModalConfirmDeleteDeck(row.original.id)}
              className="ml-2"
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        ),
      },
    ],
    []
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
    handleCancel();
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
