import { useEffect, useState } from "react";
import axios from "axios";
import { IoShareSocialOutline } from "react-icons/io5";
import Answernewpage from "./answer-new-page";
import LoginPopUp from "../pages/popups/stack/login-popup";
import { BsHeart } from "react-icons/bs";
import { DateTime } from 'luxon';
import { useDate } from "../utils/use-date";

function Questionnewpage({email, questionId}) {
  const currentDate = DateTime.utc().toISO()!.toString();
  const [answers, setAllAnswers] = useState([]);
  const [appear, setappear] = useState(false);
  const [question, setQuestion] = useState<any>();
  const [like, setLike] = useState(question?.likes);
  const [dislike, setDisLike] = useState(question?.dislikes);
  const [totalImpression, setTotalImpression] = useState(0);

  const askedDate = useDate(question?.createdAt, currentDate)

  const likePost = (question, email) => {
    axios
      .put("https://qna-site-server.onrender.com/api/question/like", {
        postId: question._id,
        useremail: email,
        coin: question.coins + 5,
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
  const unlikePost = (question, email) => {
    axios
      .put("https://qna-site-server.onrender.com/api/question/dislike", {
        postId: question._id,
        useremail: email,
        coin: question?.coins - 5,
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
   useEffect(function () {
    axios
      .post("https://qna-site-server.onrender.com/api/question/sq", {
        qid: questionId,
      })
      .then((response) => {
        setQuestion(response.data.data)
        setTotalImpression(question.likes.length - question.dislikes.length)
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(function () {
    axios
      .post("https://qna-site-server.onrender.com/api/answer/allAnswers", {
        qid: questionId,
      })
      .then((response) => setAllAnswers(response.data.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <article className="mb-8 shadow-md rounded-md px-4 md:px-4 py-3 leading-relaxed">
      {question &&
            <div className="question flex gap-2">
            <div className="left mt-2 mr-3 md:mr-6">
              <LoginPopUp trigger={appear} setTrigger={setappear} />
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
                      email ? likePost(question, email) : setappear(true);
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
                    onClick={() => email ? unlikePost(question, email): setappear(true)}
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
            <div className="right text-sm px-2 w-full">
              <div>
                <div className="flex flex-row relative">
                  {/* <h2 className="text-2xl mb-4 text-gray-800">{question.title}</h2> */}
                  <h2 className="text-2xl mb-4 text-gray-800">{question.title}</h2>
                  <BsHeart
                    className="absolute right-0 mt-3 mr-8 hover:fill-red-400"
                    size={18}
                  />
                </div>
                <p className="leading-7 pb-3">{question.body}</p>
                <div className="flex gap-2">
                  {question.tags.map((tags) => (
                    <p className=" rounded-2xl w-fit px-2 bg-gray-400 bg-opacity-20 text-blue-500 border-gray-400 border-[1px] drop-shadow-lg">
                      {tags}
                    </p>
                  ))}
                </div>
                <div>
                  {/* <img src={question?.image} width={50} height={50} /> */}
                </div>
                {/* <p className="leading-7 pb-3">question.body</p> */}
              </div>
              <div className=" relative flex justify-between items-center mt-4 border-t-[1px] border-gray-400  py-4">
                <ul className="flex justify-between items-center text-xs ">
                  <li className="w-[26px] mr-2 cursor-pointer">
                    <img
                      className="rounded-full"
                      src={question?.user?.image}
                      width={70}
                      height={70}
                    ></img>
                  </li>
                  <li className="text-[10px] mr-6">
                    Posted by{" "}
                    <span className="text-xs text-blue-500 font-semibold">
                      {question?.user?.name}
                    </span>
                  </li>

                  <li> {askedDate} ago</li>
                </ul>
                <ul className="flex absolute right-4 gap-8">
                  <ul className="flex justify-between items-center text-xs ">
                    <li className="text-md">Report</li>
                  </ul>
                  <ul className="flex justify-between items-center text-xs ">
                    <li className="text-base">
                      <IoShareSocialOutline
                        className="focus:outline-none"
                      />
                    </li>
                  </ul>
                </ul>
              </div>
              {answers &&
                answers.map((ans) => <Answernewpage ans={ans} email={email} />)
              }
            </div>
          </div>
      }
    </article>
  );
}

export default Questionnewpage;
