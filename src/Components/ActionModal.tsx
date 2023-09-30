import React, { useEffect } from "react";
import "../styles/action_modal.css";
import { useContext, useState } from "react";
import { appContext } from "../App";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteMessage } from "../Redux/Message";
import axios from "axios";
import Spinner from "./Spinner";
import { useSocket } from "../Socket";
const ActionModal = () => {
  const {
    userEndPoint,
    actionModalId,
    setActionModalId,
    openActionModal,
    setOpenActionModal,
    messageEndPoint,
    hideSideBarBtn
  } = useContext(appContext);
  
  const messageRedux = useSelector(
    (state: any) => state.privatemessagechat.value
  );
 
    const { socket } = useSocket();
  const userProfileDetails = useSelector(
    (state: any) => state.userprofile.value
  );
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const [exitAnimation, setExitAnimation] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [deleteIndication, setDeleteIndication] = useState("Delete");
  const [password, setPassword] = useState("");
  const [proceed, setProceed] = useState<boolean>(false)
  const exitFunction = () => {
    setExitAnimation("exitAnimation");
      setErrorMessage("");
    // setTimeout(() => {
      setActionModalId(-1);
      setOpenActionModal(false);
      setExitAnimation("");
      setDeleteIndication("Delete");
    // }, 500);
  };
  const deletedMessageFunction = () => {
    socket?.on("messageDeleted", (data: any) => {
      setDeleteIndication("Deleted");
      exitFunction();
      dispatch(
        deleteMessage({ data: [], owner: data.owner, notowner: data.notowner })
      );
    });
  };
  useEffect(() => {
    hideSideBarBtn();
  }, []);
  useEffect(() => {
    if (socket) {
      deletedMessageFunction();
    }
  });
  const exitActionModal = () => {
    exitFunction();
   
  };
  const logOut = () => {
    localStorage.removeItem("xxxxxxxxxxxxxxx");
    setOpenActionModal(false)
    navigate("/signin");
  };
  const proceedToDeleteBtn = () => {
    if (password !== "") {
      setProceed(true)
      axios
        .put(`${userEndPoint}/deleteAccount`, {
          password: password,
          username: userProfileDetails.registerdUserIdentification,
        })
        .then((result) => {
          
          setProceed(false)
          setOpenActionModal(false)
          socket?.emit("deleteAccount", {
            username: userProfileDetails.registerdUserIdentification,
          });
            navigate("/signup");
           
        })
        .catch((err) => {
           setProceed(false)
          setErrorMessage(err.response.data.message);
        });
    } else {
      setErrorMessage("empty Input, enter your password");
    }
  };
  const deleteMessageBtn = async () => {
    setDeleteIndication("Deleting...");
    const details = {
      owner: messageRedux.currentDetails.owner,
      notOwner: messageRedux.currentDetails.notowner,
    };
    socket?.emit("deleteUserMessageBox", details);

    const deleteM = await axios.post(
      `${messageEndPoint}/deleteMessage`,
      details
    );
  };

  return (
    <>
      {openActionModal && (
        <div className="actionModal_body">
          {actionModalId === 1 && (
            <div className={`logout_action_modal_div ${exitAnimation}`}>
              <div className="exitBtn">
                <button onClick={() => exitActionModal()}>
                  <FaTimes />
                </button>
              </div>
              <div className="action_modal_text_div">
                <p>Are you sure you want to log out?</p>
              </div>
              <div className="action_modal_proceed_div">
                <button onClick={() => logOut()}>Proceed</button>
              </div>
            </div>
          )}
          {actionModalId === 2 && (
            <div className="delete_account_modal_div">
              <div className="exitBtn">
                <button onClick={() => exitActionModal()}>
                  <FaTimes />
                </button>
              </div>
               {errorMessage !== "" && (
                <div className="delete_account_error_message">
                  <p style={{ color: "white", textAlign: "center", fontWeight:"lighter", fontSize:"0.9rem" }}>
                    {errorMessage}
                  </p>
                </div>
              )}
              <div className="delete_accoun_instruction">
                <p>Enter your password to delete account</p>
              </div>
              <form className="delete_account_input_div">
                <input 
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </form>
             
              <div className="delete_account_btn_div">
                <button disabled={proceed} onClick={() => proceedToDeleteBtn()}>
                  {!proceed ? "proceed" : <Spinner />}
                </button>
              </div>
            </div>
          )}
          {actionModalId === 3 && (
            <div className="deleteChat_modal">
              <div className="deleteChat_div">
                <div className="deleteChat_exit">
                  <button onClick={() => exitActionModal()}>
                    <FaTimes />
                  </button>
                </div>
                <div className="deleteChat_info">
                  <p>
                    Are you sure you want to delete your chat with{" "}
                    {messageRedux.currentDetails.notowner}
                  </p>
                </div>
                <div className="deleteChat_action_btn">
                  <button onClick={() => deleteMessageBtn()}>
                    {deleteIndication}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ActionModal;
