import { useState } from "react";
import axios from "axios";
import LoginPopUp from "../pages/popups/stack/login-popup";
import { useDate } from "../utils/use-date";
import { DateTime } from 'luxon';

function Answernewpage({ ans, email }) {

  const [totalImpression, setTotalImpression] = useState(
    ans?.likes?.length - ans?.dislikes?.length
  );

  const [like, setLike] = useState(ans?.likes);
  const [dislike, setDisLike] = useState(ans.dislikes);
  const [appear, setappear] = useState(false);

  const currentDate = DateTime.utc().toISO()!.toString();
  const askedDate = useDate(ans.created_at , currentDate)

  const likePost =  (answer, email) => {
     axios
      .put("https://qna-site-server.onrender.com/api/question/like",{
          postId: answer._id,
          useremail: email,
          coin: answer?.coins + 5,
        })
      .then((response) => {
        setTotalImpression(
          response?.data?.data?.likes.length -
            response?.data?.data?.dislikes.length
        );
        setLike(response?.data?.data?.likes);
        setDisLike(response?.data?.data?.dislikes);
      })

      .catch((err) => {
        console.log(err);
      });
  };
  const unlikePost = (answer, email) => {
    axios
      .put("https://qna-site-server.onrender.com/api/question/dislike",{
          postId: answer._id,
          useremail: email,
        })
      .then((response) => {
        setTotalImpression(
          response?.data?.data?.likes.length -
            response?.data?.data?.dislikes.length
        );
        setLike(response?.data?.data?.likes);
        setDisLike(response?.data?.data?.dislikes);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="answer md:ml-14 lg:ml-16 flex flex-col mt-6 bg-gray-100 rounded-lg py-3 px-2">
      <div className="ml-2 mr-4 flex justify-between items-center">
        <ul className="flex items-center">
          <LoginPopUp trigger={appear} setTrigger={setappear} />
          <li className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] lg:w-[24px] lg:h-[24px] mr-2">
            <img
              className="rounded-full"
              src={ans?.user?.image}
              width={70}
              height={70}
            ></img>
          </li>
          <li className="text-blue-500 text-xs lg:text-sm font-semibold">
            {ans?.user?.name}
          </li>
        </ul>
        <ul className="text-xs">
          <li>{askedDate} ago</li>
        </ul>
      </div>
      <div className="text-md px-2 pb-3 flex justify-between gap-6 mt-5">
        <div>
          <ul>
              {like && like.includes(email) ? (
                <li className=" cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </li>
              ) : (
                <li
                  onClick={() => {
                    email && likePost(ans, email);
                    !email && setappear(true);
                  }}
                  className="text-blue-500 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </li>
              )}
              <li className="font-semibold ml-1.5 text-base">
                {totalImpression}
              </li>
              {dislike && !dislike.includes(email) ? (
                <li
                  onClick={() => email ? unlikePost(ans, email) : setappear(true)}
                  className="cursor-pointer text-blue-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </li>
              ) : (
                <li className="cursor-pointer ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </li>
              )}
          </ul>
        </div>
        <div className="flex flex-1 items-center pr-2">
            <p>{ans?.answer}</p>
          </div>
      </div>
      <div className="flex-1 flex items-start justify-end pr-4">
             <ul className="flex gap-4 text-xs">
               <li className="cursor-pointer">Share</li>
              <li className="cursor-pointer">Report</li>
            </ul>
          </div>
    </div>
  );
}

export default Answernewpage;
