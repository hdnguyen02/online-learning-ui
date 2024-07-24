import Modal from "react-modal";
import { useParams } from "react-router-dom";
import { fetchData, showToastMessage, showToastError } from "../global";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import Empty from "./Empty";
import { commonformatDistanceToNow } from "../helper/common";

export default function CommentClass() {
  const [isOpenReply, setIsOpenReply] = useState(false);
  const appElement = document.getElementById("root");
  Modal.setAppElement(appElement);
  const params = useParams();

  const [contentComment, setContentComment] = useState("");
  const [contentCommentReply, setContentCommentReply] = useState("");
  const [comments, setComments] = useState([]);

  const [idCommentReply, setIdCommentReply] = useState();

  function handleChangeComment(event) {
    setContentComment(event.target.value);
  }

  function handleChangeContentCommentReply(event) {
    setContentCommentReply(event.target.value);
  }

  async function handleCreateComment(event) {
    event.preventDefault()
    const subUrl = "/comments";
    const body = {
      groupId: params.id,
      parentId: null,
      content: contentComment,
    };

    try {
      await fetchData(subUrl, "POST", body)
      setContentComment('')

      getComments();
    } catch ({ message }) {
      showToastError(message);
    }
  }

  async function handleCreateCommentReply(event) {
    event.preventDefault()
    const subUrl = "/comments";
    const body = {
      groupId: params.id,
      parentId: idCommentReply,
      content: contentCommentReply,
    };

    try {
      const response = await fetchData(subUrl, "POST", body);
      getComments();
    } catch ({ message }) {
      showToastError(message);
    }
    setIsOpenReply(false);
  }

  async function getComments() {
    const subUrl = `/comments/groups/${params.id}`;
    try {
      const response = await fetchData(subUrl, "GET");
      setComments(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  function showReplyComment(id) {
    setIdCommentReply(id);
    setIsOpenReply(true);
  }

  useEffect(() => {
    getComments();
  }, []);

  const customStyles = {
    content: {
      width: "400px",
      height: "130px",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      backgroundColor: "#fff",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      outline: "none",
      overflow: "auto",
    },
  };

  return (
    <div className="mb-16">
      <form onSubmit={handleCreateComment} className="flex items-center gap-x-8 mb-8">
        <input
          onChange={handleChangeComment}
          value={contentComment}
          required
          className="w-full p-4 h-9"
          placeholder="comment..."
        ></input>
        <div className="flex justify-end">
          <button
            className="flex items-center gap-x-2 h-9 px-5 text-sm text-center text-white rounded-md bg-green-600 sm:w-fit hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-gray-300"
          >
            <span className="text-sm">Submit</span>
          </button>
        </div>
      </form>

      {/* show comments */}
      {comments && (
        <div>
          {comments.length != 0 ? (
            comments.map((comment, index) => {
              return (
                <div key={index} className="mt-6">
                  <div className="flex items-center gap-x-2">
                    {/* avatar */}
                    <div className="dropdown-btn h-10 w-10 rounded-full overflow-hidden cursor-pointer">
                      <img
                        src={
                          comment.user.avatar
                            ? comment.user.avatar
                            : "/user.png"
                        }
                        className="w-full h-full"
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col gap-y-1">
                      {/* fullname email */}
                      <span className="text-sm">
                        {comment.user.firstName + " " + comment.user.lastName} -{" "}
                        {commonformatDistanceToNow(comment.created)}
                      </span>
                      {/* content */}
                      <div className="text-gray-800 font-bold flex gap-x-4">
                        <span>{comment.content}</span>{" "}
                        <button
                          onClick={() => showReplyComment(comment.id)}
                          className="flex gap-x-2 items-center"
                        >
                          <span className="text-sm font-medium">Reply</span>
                          <i className="fa-regular fa-message text-xs mt-1"></i>
                        </button>
                      </div>
                      {/* repply */}
                      <div className="flex gap-x-5 items-center">
                        {/* <span className="text-sm">
  
                          {commonformatDistanceToNow(comment.created)}
                        </span> */}
                      </div>
                    </div>
                  </div>
                  {/* Child comment */}
                  <div className="ml-12">
                    {comment.commentsChild.map((commentChild, index) => {
                      return (
                        <div key={index} className="mt-4">
                          <div className="flex items-center gap-x-2">
                            {/* avatar */}
                            <div className="dropdown-btn h-10 w-10 rounded-full overflow-hidden cursor-pointer">
                              <img
                                src={
                                  commentChild.user.avatar
                                    ? commentChild.user.avatar
                                    : "/user.png"
                                }
                                className="w-full h-full"
                                alt=""
                              />
                            </div>
                            <div className="flex flex-col gap-y-1">
                              {/* fullname email */}
                              <span className="text-sm">
                                {commentChild.user.firstName +
                                  " " +
                                  commentChild.user.lastName}{" "}
                                -{" "}
                                {commonformatDistanceToNow(
                                  commentChild.created
                                )}
                              </span>
                              {/* content */}
                              <div className="text-gray-800 font-bold">
                                {commentChild.content}
                              </div>
                              {/* repply */}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            <Empty />
          )}
        </div>
      )}

      <Modal
        isOpen={isOpenReply}
        onRequestClose={() => setIsOpenReply(false)}
        contentLabel="Custom Modal"
        style={customStyles}
      >
        <d  iv className="flex flex-col gap-y-2">
          <p>Repply</p>
          <form onSubmit={handleCreateCommentReply} className="flex gap-x-4">
            <input
              onChange={handleChangeContentCommentReply}
              required
              type="text"
              className="w-full h-9 px-4"
            />
            <div className="flex justify-end">
              <button type="submit"
                className="flex items-center gap-x-2 h-9 px-5 text-sm text-center text-white rounded-md bg-green-600 sm:w-fit hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-gray-300"
              >
                <span className="text-sm">Submit</span>
              </button>
            </div>
          </form>
        </d>
      </Modal>
      <ToastContainer />
    </div>
  );
}
