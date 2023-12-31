import  { FC, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";
import Image from "next/image";
import ReactLoading from "react-loading";
import {Header} from "../../components/header";
import {Question} from "../../components/question";
import LoginPopUp from "../popups/stack/login-popup";
import {QuestionAsk} from "../popups/stack/question-ask";

export interface User {
      name: string;
      email: string;
      image: string;
  };

export const ForuMe: FC<User> = (user) => {
  const {name, email, image} = user
  const [queask, setqueask] = useState(false);
  const [appr, setappr] = useState(false);
  const [questions, setAllQuestions] = useState([]);

  const getAllQuestion = () =>{
    axios
    .get(`${process.env.NEXT_PUBLIC_TEST}/api/question/allQuestions`)
    .then((response) => {
      setAllQuestions(response.data.data);
      console.log(response,"Question Fetched");
    })
    .catch((error) => console.log(error));
  };

  useEffect(() => {
   getAllQuestion()
  }, []);

  return (
    <div className="relative h-screen">
      <Header name={name} image={image} />
      <main className="md:flex  lg:px-10 xl:px-32 2xl:px-28 md:px-14">
        <section className="text-gray-500 middle mt-16 gap-8 px-4 text-sm sm:px-16 md:px-8 md:w-[70%] xl:w-[79%]">
          {!questions && (
            <div className="mt-24 ml-24">
              <ReactLoading
                type="spinningBubbles"
                color="#0000FF"
                height={165}
                width={150}
              />
              <h1 className=" text-lg italic font-semibold">
                loading data from server......
              </h1>
            </div>
          )}
          {questions &&
            questions.map((question, index) => (
              <Question email ={email} question={question} key={index} />
            ))}
        </section>
        <section className="right hidden lg:block mt-16 lg:w-[36%] lg:px-8 xl:w-[26%]">
          <div>
            <ul className="bg-blue-600 text-gray-100 flex justify-center items-center lg:w-48 px-4 py-2 rounded-lg mb-12">
              <li className="mr-2 font-semibold">+</li>
              {email && (
                <li onClick={() => setqueask(true)} className="cursor-pointer">
                  Start a New Topic
                </li>
              )}
              {!email && (
                <li onClick={() => setappr(true)} className="cursor-pointer">
                  Start a New Topic
                </li>
              )}
              <QuestionAsk
                user ={user}
                trigger={queask}
                setTrigger={(tri)=>{
                  setqueask(tri)
                  getAllQuestion()
                }}
              />
              <LoginPopUp trigger={appr} setTrigger={(tri)=>{
                setappr(tri)
                }} />
            </ul>
          </div>
          <div className="shadow-lg w-full text-gray-400 shadow-gray-600 rounded-xl mt-5">
            <video
              muted
              controls
              width="950px"
              height="800px"
              className="rounded-xl"
            >
              <source src='/videos/demo.mp4' type="video/mp4" />
              Sorry, your browser doesn't support embedded videos.
            </video>
          </div>
          <div className="shadow-lg w-full text-gray-400 shadow-gray-600 rounded-xl mt-10 px-4 pt-4 pb-3">
            <p className="font-semibold text-gray-700">Top Users</p>
            <div className="">
              <article className="flex text-xs justify-between items-center mt-3">
                <ul className="flex justify-between items-center">
                  <li className="w-[24px] mr-2">
                    <Image
                      className="rounded-full"
                      src="/p3.png"
                      width={50}
                      height={50}
                    ></Image>
                  </li>
                  <li className="text-xs text-blue-700">rishy</li>
                </ul>
                <ul className="flex  justify-between items-center">
                  <li className="mr-1 text-gray-400 font-semibold">15.5k</li>
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 text-blue-500"
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
                </ul>
              </article>
              <article className="flex text-xs justify-between items-center mt-3">
                <ul className="flex justify-between items-center">
                  <li className="w-[24px] mr-2">
                    <Image
                      className="rounded-full"
                      src="/p1.jpg"
                      width={50}
                      height={50}
                    ></Image>
                  </li>
                  <li className="text-xs text-blue-700">krishna</li>
                </ul>
                <ul className="flex  justify-between items-center">
                  <li className="mr-1 text-gray-400 font-semibold">15k</li>
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 text-blue-500"
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
                </ul>
              </article>
              <article className="flex text-xs justify-between items-center mt-3">
                <ul className="flex justify-between items-center">
                  <li className="w-[24px] mr-2">
                    <Image
                      className="rounded-full"
                      src="/p5.jpg"
                      width={50}
                      height={50}
                    ></Image>
                  </li>
                  <li className="text-xs text-blue-700">anmol</li>
                </ul>
                <ul className="flex  justify-between items-center">
                  <li className="mr-1 text-gray-400 font-semibold">12.8k</li>
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 text-blue-500"
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
                </ul>
              </article>
              <article className="flex text-xs justify-between items-center mt-3">
                <ul className="flex justify-between items-center">
                  <li className="w-[24px] mr-2">
                    <Image
                      className="rounded-full"
                      src="/p4.png"
                      width={50}
                      height={50}
                    ></Image>
                  </li>
                  <li className="text-xs text-blue-700">sahil</li>
                </ul>
                <ul className="flex  justify-between items-center">
                  <li className="mr-1 text-gray-400 font-semibold">10.5k</li>
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 text-blue-500"
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
                </ul>
              </article>
              <article className="flex text-xs justify-between items-center mt-3">
                <ul className="flex justify-between items-center">
                  <li className="w-[24px] mr-2">
                    <Image
                      className="rounded-full"
                      src="/prorile2.jpg"
                      width={50}
                      height={50}
                    ></Image>
                  </li>
                  <li className="text-xs text-blue-700">Rajan N</li>
                </ul>
                <ul className="flex  justify-between items-center">
                  <li className="mr-1 text-gray-400 font-semibold">9.5k</li>
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 text-blue-500"
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
                </ul>
              </article>
              <article className="flex text-xs justify-between items-center mt-3 ">
                <ul className="flex justify-between items-center">
                  <li className="w-[24px] mr-2">
                    <Image
                      className="rounded-full"
                      src="/p6.jpg"
                      width={50}
                      height={50}
                    ></Image>
                  </li>
                  <li className="text-xs text-blue-700">abhishek</li>
                </ul>
                <ul className="flex  justify-between items-center">
                  <li className="mr-1 text-gray-400 font-semibold">6.9k</li>
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 text-blue-500"
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
                </ul>
              </article>
            </div>
            {email && (
              <div className="you">
                <article className="flex text-xs justify-between items-center my-6 py-4 border-t-[1px] border-gray-300">
                  <ul className="flex justify-between items-center">
                    <li className="w-[30px] mr-2">
                      <Image
                        className="rounded-full"
                        src={image}
                        width={50}
                        height={50}
                      ></Image>
                    </li>
                    <li className="text-sm text-blue-700 mr-2">{name}</li>
                    <li className="text-sm text-gray-400">(17)</li>
                  </ul>
                  <ul className="flex  justify-between items-center">
                    <li className="mr-1">0</li>
                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-blue-500"
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
                  </ul>
                </article>
              </div>
            )}
          </div>
        </section>
      </main>
      {/* <Contact user={user} /> */}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      props: {
        user: null,
      },
    };
  } else {
    return {
      props: {
        user: session?.user,
      },
    };
  }
}
