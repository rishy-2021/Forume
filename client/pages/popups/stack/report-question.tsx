import axios from "axios";
import React, { FC } from "react";

interface ApprProps {
  trigger: Boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  question:any;
  email:string
  type:any
}

export const ReportPopUp: FC<ApprProps> =({ trigger, setTrigger, question, email, type }) => {

  function report(question) {
    axios
      .post("https://qna-site-server.onrender.com/api/question/report", {
        qid: question._id,
        quesTitle: question.title,
        email: email, //FIXME: also change user to email in respected server file
        type: type,
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }

  return trigger ? (
    <>
      <main className="noscroll z-50 fixed inset-0 w-full flex justify-center items-center">
        <section className="flex bg-black w-full bg-opacity-20 justify-center items-center h-screen text-black">
          <div className="z-40 relative bg-white h-48 w-80 rounded-lg amenities-width">
            {/* top */}
            <div className="flex p-3 justify-between">
              <h1 className="text-lg ml-4 ">Verify Again</h1>
            </div>
            {/* center */}
            <div className="p-5   ml-2 h-96 w-full  flex  flex-col">
              <h1>Are You Sure You want to Report this Question?</h1>
              <div className="flex mt-6 ml-36">
                <button
                  className="  text-md hover:text-slate-800 hover:bg-slate-400 hover:bg-opacity-20"
                  onClick={() => setTrigger(false)}
                >
                  Cancel
                </button>
                <button
                  className="ml-8 text-md text-blue-500 hover:bg-blue-300 hover:bg-opacity-20 hover:text-blue-800 "
                  onClick={() => {
                    setTrigger(false);
                    report(question);
                  }}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  ) : null;
}

export default ReportPopUp;
