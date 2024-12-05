import Modal from "react-modal";
import { useParams } from "react-router-dom";
import { fetchData, showToastMessage, showToastError } from "../global";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import Empty from "./Empty";
import { customFormatDistanceToNow } from "../global";

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
      height: "70px",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      padding: "10px",
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
        {/* <input
          onChange={handleChangeComment}
          value={contentComment}
          required
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          placeholder="comment..."
        ></input> */}
        
{/* <label for="message" class="block mb-2 text-sm font-medium text-gray-900">Your message</label> */}
<textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>

        <div className="flex justify-end">
          {/* <button
            className="flex items-center gap-x-2 h-9 px-5 text-sm text-center text-white rounded-md bg-green-600 sm:w-fit hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-gray-300"
          >
            <span className="text-sm">Submit</span>
          </button> */}


          <button
                      className="relative px-5 py-1 overflow-hidden font-medium text-indigo-600 bg-indigo-50 border border-gray-100 rounded-lg shadow-inner group">
                      <span
                        className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-indigo-600 group-hover:w-full ease"></span>
                      <span
                        className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-indigo-600 group-hover:w-full ease"></span>
                      <span
                        className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-100 bg-indigo-600 group-hover:h-full ease"></span>
                      <span
                        className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-100 bg-indigo-600 group-hover:h-full ease"></span>
                      <span
                        className="absolute inset-0 w-full h-full duration-300 delay-200 bg-indigo-600 opacity-0 group-hover:opacity-100"></span>
                      <span
                        className="relative text-base font-semibold transition-colors duration-300 delay-100 group-hover:text-white ease">
                        Comment</span>
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
                    <div className="dropdown-btn h-9 w-9 rounded-full overflow-hidden cursor-pointer">
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
                    <div className="flex flex-col gap-y-0.5">
                      {/* fullname email */}
                      <span className="text-sm text-gray-800">
                        {comment.user.email}
                      </span>
                      {/* content */}
                      <div className="text-gray-800 font-medium flex gap-x-4">
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
  
                          {customFormatDistanceToNow(comment.createdDate)}
                        </span> */}
                      </div>
                    </div>
                  </div>
                  {/* Child comment */}
                  <div className="ml-6">
                    {comment.commentsChild.map((commentChild, index) => {
                      return (
                        <div key={index} className="mt-4">
                          <div className="flex items-center gap-x-2">
                            {/* avatar */}
                            <div className="dropdown-btn h-9 w-9 rounded-full overflow-hidden cursor-pointer">
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
                            <div className="flex flex-col gap-y-0.5">
                              {/* fullname email */}
                              <span className="text-sm">
                                {commentChild.user.email}
                              </span>
                              {/* content */}
                              <div className="text-gray-800 font-medium text-sm">
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
        <d  iv className="flex flex-col gap-y-0.5">
          {/* <p className="font-medium text-lg">Reply</p> */}
          <form onSubmit={handleCreateCommentReply} className="mt-2 flex gap-x-4">
            <input
              onChange={handleChangeContentCommentReply}
              required
              type="text"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <div className="flex justify-end">
              {/* <button type="submit"
                className="flex items-center gap-x-2 h-9 px-5 text-sm text-center text-white rounded-md bg-green-600 sm:w-fit hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-gray-300"
              >
                <span className="text-sm">Submit</span>
              </button> */}

              <button type="submit"
                      className="relative px-5 py-1 overflow-hidden font-medium text-indigo-600 bg-indigo-50 border border-gray-100 rounded-lg shadow-inner group">
                      <span
                        className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-indigo-600 group-hover:w-full ease"></span>
                      <span
                        className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-indigo-600 group-hover:w-full ease"></span>
                      <span
                        className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-100 bg-indigo-600 group-hover:h-full ease"></span>
                      <span
                        className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-100 bg-indigo-600 group-hover:h-full ease"></span>
                      <span
                        className="absolute inset-0 w-full h-full duration-300 delay-200 bg-indigo-600 opacity-0 group-hover:opacity-100"></span>
                      <span
                        className="relative text-base font-semibold transition-colors duration-300 delay-100 group-hover:text-white ease">
                        Reply</span>
                    </button>
            </div>
          </form>
        </d>
      </Modal>
      <ToastContainer />
    </div>
  );
}
