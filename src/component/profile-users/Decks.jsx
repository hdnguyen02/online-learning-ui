import { useEffect, useState } from "react";
import { fetchData, showToastError, showToastMessage } from "../../global";
import { ToastContainer } from "react-toastify";
import Modal from "react-modal";
import Empty from "../Empty";
import { useParams } from "react-router-dom";
import { commonformatDistanceToNow } from "../../helper/common";

export default function Decks() {
  const [isShowDetailDeck, setIsShowDetailDeck] = useState(false);
  const [decks, setDecks] = useState();

  const params = useParams();
  const emailUser = params.emailUser;

  const [detailDeck, setDetailDeck] = useState();

  const appElement = document.getElementById("root");
  Modal.setAppElement(appElement);

  async function getDecksOfUser() {
    const subUrl = `/users/decks?emailUser=${emailUser}`;
    try {
      const { data } = await fetchData(subUrl, "GET");
      setDecks(data);
    } catch ({ message }) {
      showToastError(message);
    }
  }

  async function getDeckDetail(idDeck) {
    const subUrl = `/decks/${idDeck}`;
    try {
      const { data } = await fetchData(subUrl, "GET");
      setDetailDeck(data);
      setIsShowDetailDeck(true);
    } catch (error) {
      showToastError(error.message);
    }
  }

  async function handleCloneDeck() {
    try {
      const subUrl = `/decks/${detailDeck.id}/clone`;
      const { message } = await fetchData(subUrl, "POST");
      showToastMessage(message);
    } catch (error) {
      showToastError(error.message);
    }
  }

  useEffect(() => {
    // getDecks()
    getDecksOfUser();
  }, []);

  const stylesModal = {
    content: {
      width: "800px",
      height: "440px",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      padding: "20px",

      borderRadius: "2px",
      backgroundColor: "while",
      outline: "none",
      // overflow: 'hidden',
    },
  };

  return (
    decks && (
      <>
        {decks.length != 0 ? (
          <div className="mb-12 grid grid-cols-2 gap-12">
            {decks.map((deck, index) => (
              <div key={index}>

                <span className="uppercase text-xs">
                  {commonformatDistanceToNow(deck.createAt)}
                </span>
    
                <div className="bg-[#F0F6F6] p-6 rounded mt-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-4">
                      <div className="flex flex-col gap-y-2">
                        <div className="flex gap-x-2 items-center">
                          <span className="font-bold text-xl">{deck.name}</span>
                          <span>({deck.quantityCards} card)</span>
                        </div>

                        <div className="mt-2 text-gray-700 text-sm text-ellipsis overflow-hidden whitespace-nowrap">
                          {deck.description}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-x-2 flex-col">
                      <button
                        onClick={() => getDeckDetail(deck.id)}
                        className="flex items-center gap-x-2 h-8 text-blue-900 hover:text-white border border-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 text-center"
                      >
                        <span>Detail</span>

                        <i className="fa-regular fa-eye"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Empty />
        )}

        <Modal
          isOpen={isShowDetailDeck}
          onRequestClose={() => setIsShowDetailDeck(false)}
          contentLabel="Custom Modal"
          style={stylesModal}
        >
          {detailDeck?.cards.length != 0 ? (
            <div className="">
              <div className="flex items-center gap-x-4">
                <div className="flex flex-col gap-y-2 flex-1">
                  <div className="flex gap-x-2 items-center">
                    <span className="font-bold text-xl">
                      {detailDeck?.name}
                    </span>
                    <span>({detailDeck?.quantityCards} thẻ)</span>
                  </div>

                  <div className="mt-2 text-gray-700 text-sm text-ellipsis overflow-hidden whitespace-nowrap">
                    {detailDeck?.description}
                  </div>
                </div>

                <div className="flex gap-x-2 items-center">
                  <span className="text-sm">
                    {detailDeck?.quantityClones} clone
                  </span>
                  <button
                    onClick={handleCloneDeck}
                    className="flex items-center gap-x-2 h-8 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 text-center"
                  >
                    <span>Clone</span>

                    <i className="fa-solid fa-download"></i>
                  </button>
                </div>
              </div>

              <hr className="my-4" />

              <table className="w-full text-sm text-left rtl:text-right text-gray-500 h-[100px] overflow-y-scroll">
                <thead className="text-sm text-gray-700 uppercase">
                  <tr>
                    <th scope="col" className="px-6 py-5">
                      Term
                    </th>
                    <th scope="col" className="px-6 py-5">
                      definition
                    </th>
                    <th scope="col" className="px-6 py-5">
                      Example
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {detailDeck?.cards.map((card, index) => (
                    <tr key={index} className="odd:bg-gray-100 even:bg-white">
                      <td className="px-6 py-5 font-medium">{card.term}</td>
                      <td className="px-6 py-5">{card.definition}</td>
                      <td className="px-6 py-5">
                        {card.example ? card.example : "None"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Empty />
          )}
        </Modal>

        <ToastContainer />
      </>
    )
  );
}
