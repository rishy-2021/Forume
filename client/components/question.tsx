import React, { useState, useEffect, FC } from "react";
import {
  IoShareSocialOutline,
} from "react-icons/io5";
import { BsHeart } from "react-icons/bs";
import axios from "axios";
import {AnswerPopUp} from "../pages/popups/stack/answer-submit";
import Link from "next/link";
import Sharexpop from "../pages/popups/stack/sharexpop";
import {ReportPopUp} from "../pages/popups/stack/report-question";
import LoginPopUp from "../pages/popups/stack/login-popup";
import {DateTime} from "luxon"
import { useDate } from "../utils/use-date";
interface Props {
  email: string;
  questions:any;
}

export const Question: FC<Props> = ({email, questions}) => {
  const [sharepop, setsharepop] = useState(false);
  const [queask, setqueask] = useState(false);
  const [answers, setAllAnswers] = useState([]);
  const [totalImpression, setTotalImpression] = useState(
    questions?.likes?.length - questions?.dislikes?.length
  );

  const [appr, setappr] = useState(false);
  const [appear, setappear] = useState(false);
  const [like, setLike] = useState(questions?.likes);
  const [dislike, setDisLike] = useState(questions.dislikes);

  const currentDate = DateTime.utc().toISO()!.toString();

  useEffect(function () {
    axios
      .post("https://qna-site-server.onrender.com/api/answer/allAnswers", {
        qid: questions._id,
      })
      .then((response) => setAllAnswers(response.data.data))
      .catch((error) => console.log(error));
  }, []);

  async function likePost(questions, user) {
    await axios
      .put("https://qna-site-server.onrender.com/api/question/like", {
        postId: questions._id,
        useremail: user?.email,
        coin: questions.coins + 5,
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
  }

  function unlikePost(questions, user) {
    axios
      .put("https://qna-site-server.onrender.com/api/question/dislike", {
        postId: questions._id,
        useremail: user?.email,
        coin: questions.coins - 5,
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
  }

  return (
    <article className="mb-8  shadow-md rounded-md px-4 md:px-4 py-3 leading-relaxed">
      <div className="question flex gap-2">
        <div className="left mt-2 mr-3 md:mr-6">
          <LoginPopUp trigger={appear} setTrigger={setappear} />
          <ul className="flex flex-col items-center">
            {like.includes(email) ? (
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
                  email && likePost(questions, email);
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
              {
                totalImpression
                // || questions?.likes?.length - questions?.dislikes?.length
              }
            </li>

            {dislike.includes(email) ? (
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
            ) : (
              //
              <li
                onClick={() => {
                  {
                    email && unlikePost(questions, email);
                  }
                  {
                    !email && setappear(true);
                  }
                }}
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
            )}
          </ul>
        </div>
        <div className="right text-sm px-2 w-full">
          <div>
            <div className="flex flex-row relative">
              {/* <h2 className="text-2xl mb-4 text-gray-800">{question.title}</h2> */}
              <h2 className="text-2xl mb-4 text-gray-800">{questions.title}</h2>
              <BsHeart
                className="absolute right-0 mt-3 mr-8 hover:fill-red-400"
                size={18}
              />
            </div>
            <p className="leading-7 pb-3">{questions.body}</p>
            <div className="flex gap-2">
              {questions.tags.map((tags) => (
                <p className=" rounded-2xl w-fit px-2 bg-gray-400 bg-opacity-20 text-blue-500 border-gray-400 border-[1px] drop-shadow-lg">
                  {tags}
                </p>
              ))}
            </div>
          </div>
          <div>
            {/* <img src={questions?.image} width={50} height={50} /> */}
          </div>
          <div className="flex relative justify-between items-center mt-4 border-t-[1px] border-gray-400  py-4">
            <ul className="flex justify-between items-center text-xs ">
              <li className="w-[26px] mr-2 cursor-pointer">
                <img
                  className="rounded-full"
                  src={questions?.user?.image}
                  //   src={
                  //     "https://lh3.googleusercontent.com/a/AATXAJwCF0QRAVVAHML_ZjJxtiJ4NiIxeLI_yajuduLMzQ=s96-c"
                  //   }
                  width={70}
                  height={70}
                ></img>
              </li>
              <li className="text-[10px] mr-6">
                Posted by{" "}
                <span className="text-xs text-blue-500 font-semibold">
                  {questions?.user?.name}
                </span>
              </li>
              <li>
             { useDate(questions.created_at , currentDate)} ago
              </li>
            </ul>

            <ul className="flex absolute right-4 gap-8">
              <ul className="flex justify-between items-center text-xs ">
                {/* <li className="text-md">Report</li> */}
                <li
                  className="cursor-pointer text-md"
                  onClick={() => {
                    {
                      email && setappr(true);
                    }
                    {
                      !email && setappear(true);
                    }
                  }}
                >
                  Report
                </li>
                <ReportPopUp
                  email={email}
                  type={"Question"}
                  trigger={appr}
                  question={questions}
                  setTrigger={setappr}
                />
              </ul>
              <ul className="flex justify-between items-center text-xs ">
                <li className="text-base">
                  <IoShareSocialOutline
                    onClick={() => setsharepop(true)}
                    className="focus:outline-none cursor-pointer"
                  />
                </li>
              </ul>
              <Sharexpop trigger={sharepop} setTrigger={setsharepop} />
              <ul className="flex justify-between items-center">
                <li className="mr-1 cursor-pointer">
                  <Link
                    href={{
                      pathname: "/stack/que-ans-page",
                      query: {
                        id: questions._id
                      },
                    }}
                    className=" font-semibold  rounded-lg p-1   hover:text-green-400"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </li>
                <li className="text-xs">{answers?.length}</li>
              </ul>
            </ul>
          </div>

          <div className="relative flex mb-4">
            <Link
              href={{
                pathname: "/stack/que-ans-page",
                query: {
                  id: questions._id
                },
              }}
              className=" font-semibold  rounded-lg p-1   hover:text-green-400"
            >
              <a className="bg-white shadow-lg p-1 border border-gray-400 ml-8 rounded-lg">
                Show Answer
              </a>
            </Link>
            <button
              onClick={() => email ? setqueask(true) : setappear(true)}
              className="   absolute right-12 bg-blue-400 shadow-lg border-white border text-white p-1 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Post Answer
            </button>
            <AnswerPopUp
              email={email}
              question={questions}
              trigger={queask}
              setTrigger={setqueask}
            ></AnswerPopUp>
          </div>
          {/* <AnswerPopUp
            user={user}
            question={questions}
            trigger={queask}
            setTrigger={setqueask}
          ></AnswerPopUp> */}
        </div>
      </div>
      {/* <Answer qid={questions._id} visi={visi}></Answer> */}
    </article>
  );
}

export default Question;
