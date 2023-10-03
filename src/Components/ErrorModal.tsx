import { FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { openClose } from "../Redux/Error";
import "../styles/errorModal.css"
const ErrorModal = () => {
    let dispatch = useDispatch();
    const errorMessage = useSelector((state:any)=>state.texty_error.value)
    const exitBtn = () => {
      console.log(errorMessage)
dispatch(openClose({message:""}))
  }
    return (
      <>
        {errorMessage.status && (
          <div className="errorModal_div">
            <div className="error_content">
              <div className="error_exit">
                <button onClick={() => exitBtn()}>
                  <FaTimes className="off" />
                </button>
              </div>
              <div className="error_message">
                <p>{errorMessage.message}</p>
              </div>
            </div>
          </div>
        )}
      </>
    );
}

export default ErrorModal