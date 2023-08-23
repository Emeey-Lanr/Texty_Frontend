import { FaTimes } from "react-icons/fa"
import {useState, useContext} from "react"
import Loading from "./Loading";
import { appContext } from "../App";
import Spinner from "./Spinner";
const ReportUser = () => {
  const {openReportModal, setOpenReportModal} = useContext(appContext)
  const [report, setReport] = useState<{ heading: string; context: string, picked:boolean }[]>([
    {
      heading: "Threat",
      context: "This post is a threat against lives and properties",
      picked:false,
    },
    {
      heading: "Racial Discrimination",
      context: "This post is discriminatory towards a particular race and it's trying to cause conflict",
      picked:false
    },
     {
      heading: "Sexual Abuse",
      context: "This post is trying to create a conflict and to cause disputes between individuals",
      picked:false
    },
  ]);
  const [errorMessage, seterrorMessage] =useState("")
  const [clicked, setClicked] = useState(false)
  const pickBtn = (id: number) => {
   const update = [...report]
  
    if (update[id].picked) {
      update[id].picked = false
    } else {
         update[id].picked = true
    }
    setReport(update)
  }
  const submitReport = () => {
    let check =  report.find((details)=>details.picked)
    if(check){
       setClicked(true)
      seterrorMessage("")
      setTimeout(() => {
        const resetReport = report.map((item) => ({
          ...item,
          picked: false,
        }));

        setReport(resetReport);
        setClicked(false)
         setOpenReportModal(false)
      },2_000)
    } else {
      seterrorMessage("No Options picked")
    }
  }
  return (
    <>
      {openReportModal && (
        <div className="report_div">
          <div className="report">
            <div className="exit_report">
              <button  onClick={()=>setOpenReportModal(false)}>
                <FaTimes />
              </button>
            </div>
            {errorMessage !== "" && <div className="error_div"><p className="">{errorMessage}</p> </div>}
            {report.map((details, id) => (
              <div className="report_case_div">
                <div className="report_case">
                  <div className="heading">
                    <button
                      onClick={() => pickBtn(id)}
                      className={`${
                        details.picked === true ? "clicked" : "unclicked"
                      }`}
                    ></button>

                    <h1>{details.heading}</h1>
                  </div>
                  <div className="context">
                    <p>{details.context}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="report_case_btn">
              <button onClick={() => submitReport()}>
                 {clicked  ? <Spinner/> : "Report" }
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ReportUser