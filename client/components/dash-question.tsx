import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";

interface Props {
  email: string;
  question:any;
}

export const DashQuestion: FC<Props> = ({ question, email }) => {
  const [qanswers, setQuesAnswers] = useState([]);
  const [totalImpression, setTotalImpression] = useState(
    question?.likes?.length - question?.dislikes?.length
  );

  const [like, setLike] = useState(question?.likes);
  const [dislike, setDisLike] = useState(question.dislikes);

  useEffect(() => {
    axios
      .post("https://qna-site-server.onrender.com/api/answer/allAnswers", {
        qid: question._id,
      })
      .then((response) => setQuesAnswers(response.data.data))
      .catch((error) => console.log(error));
  }, []);

  const likePost = (questions, email) => {
    axios
      .put("https://qna-site-server.onrender.com/api/question/like", {
        postId: questions._id,
        useremail: email,
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
  };
  const unlikePost = (questions, email) => {
    axios
      .put(
        "https://qna-site-server.onrender.com/api/question/dislike",
        {
          postId: questions._id,
          useremail: email,
          coin: questions.coins - 5,
        }
      )
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

  function deleteQues(sqid) {
    axios
      .delete(
        `https://qna-site-server.onrender.com/api/question/delete/${sqid}`
      )
      // .then((response) => setData())
      .catch((error) => console.log(error));
  }

  return (
    <>
      <article className="flex flex-wrap justify-between bg-white py-3 mb-8 shadow-md rounded-lg">
        <div className="flex items-center">
          <div className="mr-8 mb-2 pl-6">
            <ul className="">
              {like.includes(email) ? (
                <li className="cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </li>
              ) : (
                <li
                  onClick={() => {
                    likePost(question, email);
                  }}
                  className="text-blue-800 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </li>
              )}

              <li className="pl-2 text-base">{totalImpression}</li>
              {!dislike.includes(email) ? (
                <li
                  onClick={() => {
                    unlikePost(question, email);
                  }}
                  className="cursor-pointer text-blue-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </li>
              ) : (
                <li className="cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </li>
              )}
            </ul>
          </div>
          <div className="px-2">
            <ul>
              <li className="text-blue-900 flex text-3xl font-semibold mb-4">
                {question.title}
              </li>
            </ul>

            <ul className=" text-[10px] w-[70%] flex">
              {question.tags[0] &&
                question?.tags.map((tags) => (
                  <li className="bg-gray-100 px-3 py-1.5 mr-2 mb-2 rounded-md cursor-pointer">
                    {tags}
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="px-5 py-1">
        <div className="flex flex-row justify-between mb-1">
        <button
            className="px-4 border-[1px] border-gray-300 rounded-md text-red-400 hover:text-red-700 hover:bg-gray-100 h-8"
            onClick={() => {
              deleteQues(question._id);
            }}
          >
            <AiTwotoneDelete />
          </button>
          <button
            className="px-4 border-[1px] border-gray-300 rounded-md text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            onClick={() => {
              deleteQues(question._id);
            }}
          >
            <AiFillEdit />
          </button>
        </div>
          {/* <ul className="flex flex-col items-center px-4 py-1 border-[1px] border-gray-300 rounded-md text-blue-900 mr-6">
            <Link
              href={{
                pathname: "/stack/que-ans-page",
                query: {
                  id: question._id
                },
              }}
            >
              <li className="text-lg cursor-pointer">
                {`${qanswers.length || 'No'} ${(qanswers.length === 0 || qanswers.length === 1) ? "answer" : "answers"}`}
              </li>
            </Link>
          </ul> */}
          <button
            className="border-[1px] border-gray-300 rounded-md text-blue-900 hover:bg-gray-100 w-32 h-9"
            onClick={() => {
              deleteQues(question._id);
            }}
          >
                {`${qanswers.length || 'No'} ${(qanswers.length === 0 || qanswers.length === 1) ? "answer" : "answers"}`}
          </button>
        </div>
      </article>
      {/* )} */}
    </>
  );
};

export default DashQuestion;
