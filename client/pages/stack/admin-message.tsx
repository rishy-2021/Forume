import React, { useEffect, useState } from "react";
import axios from "axios";

interface Message {
  name: string;
  email: string;
  message: string;
  _id: string;
}

function Feedback() {
  const [messages, setAllMessages] = useState<Message[]>([]);

  useEffect(function () {
    axios
      .get(`${process.env.NEXT_PUBLIC_TEST}/api/message/getMessages`)
      .then((response) => setAllMessages(response.data.data))
      .catch((error) => console.log(error));
  });

  function dismiss(mid) {
    axios
      .delete(`${process.env.NEXT_PUBLIC_TEST}/api/message/deleteMessages/${mid}`)
      .catch((error) => console.log(error));
  }

  return (
    <>
      <div className="">
        {/* <Admin_Header />
        <Listing_Header /> */}
        <div className="flex flex-col gap-4 px-12 py-4">
          {messages.map((message) => (
            <div className="Contact_page2  border border-gray-500 rounded-lg bg-gray-50 px-4 text-gray-600 sm:px-8 sm:py-4 md:py-14 xl:px-72">
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
                  <ul className="flex flex-col mb-4 sm:w-[46%]">
                    <label className="mb-4" htmlFor="">
                      Name
                    </label>
                    <input
                      className="outline-none px-4 py-2 border-2 border-gray-200 rounded-md"
                      type="text"
                      value={message.name}
                    />
                  </ul>
                  <ul className="flex flex-col mb-4 sm:w-[46%]">
                    <label className="mb-4" htmlFor="">
                      Email
                    </label>
                    <input
                      className="outline-none px-4 py-2 border-2 border-gray-200 rounded-md"
                      type="email"
                      value={message.email}
                      placeholder="Enter your email"
                    />
                  </ul>
                </div>
                <div className="flex flex-col mb-6">
                  <label className="mb-4" htmlFor="">
                    Message
                  </label>
                  <textarea
                    className="border-2 border-gray-300 rounded-md px-4 py-2 mb-4"
                    name=""
                    id=""
                    rows={10}
                    placeholder="Enter message here..."
                    value={message.message}
                  ></textarea>
                </div>
              </div>
              <button
                className="w-fit h-fit p-4 bg-indigo-500 text-white rounded-lg"
                onClick={() => dismiss(message._id)}
              >
                Dismiss
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default Feedback;
