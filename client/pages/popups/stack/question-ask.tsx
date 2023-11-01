import { FC, useState } from "react";
import axios from "axios";
import { User } from "../..";

interface AskProps {
  user:User
  trigger: Boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}
export const QuestionAsk : FC<AskProps> = ({ user, trigger, setTrigger }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [quesImage, setQuesImage] = useState("");
  const [tags, setTags] = useState<any[]>([]);

  function handleKeyDown(e) {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    setTags([...tags, value]);
    e.target.value = "";
  }
  function removeTag(index) {
    setTags(tags.filter((el, i) => i !== index));
  }

  const questionSubmit = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_TEST}/api/question`, {
        title: title,
        body: body,
        tags: tags,
        user: user,
        questionImage: quesImage,
      })
      .then(() => {
        setTrigger(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleQImage = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
    if(typeof(reader.result) == 'string')
      setQuesImage(reader.result);
    };
  };
  return trigger ? (
    <main className="z-50 fixed inset-0 w-full flex justify-center items-center">
      <section className="flex bg-black w-full bg-opacity-20 justify-center items-center  text-black">
        <div className="w-11/12">
          <div className="grid place-items-center  px-4 py-10  ">
            <div className="flex flex-col gap-6 bg-gray-50 px-8 py-8 rounded-lg w-[50%] min-w-[]">
              <div className="flex flex-row justify-between ">
                <h2 className="text-2xl font-semibold mb-4 -tracking-tighter">
                  Create Question
                </h2>
                <h2
                  className="text-4xl cursor-pointer pr-7"
                  onClick={() => setTrigger(false)}
                >
                  &#215;
                </h2>
              </div>
              <div>
                <h3 className="text-xl text-gray-700 mb-2">Title</h3>
                <p className="text-gray-400 text-sm mb-4">
                  To be specific and imagine you are asking a question to another
                  person
                </p>
                <input
                  className="outline-none w-full border-[1px] border-gray-500 rounded-md px-3 py-3"
                  type="text"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  name=""
                  id=""
                  placeholder="title"
                />
              </div>
              <div>
                <h3 className="text-xl text-gray-700 mb-2">Body</h3>
                <p className="text-gray-400 text-sm mb-4">
                  include all the information someone need to answer the
                  question
                </p>
                <textarea
                  className="outline-none w-full border-[1px] border-gray-500 rounded-md p-3"
                  name=""
                  onChange={(e) => {
                    setBody(e.target.value);
                  }}
                  id=""
                  rows={10}
                ></textarea>
              </div>
              <input type="file" onChange={handleQImage} />
              <div>
                <h3 className="text-xl text-gray-700 mb-4">Tags</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Add up to 5 tags to describe what your question is about
                </p>
                <p className="border-2 bg-white border-gray-400 p-2 rounded-lg">
                  {tags.map((tag, index) => (
                    <div
                      key={index}
                      className="bg-gray-400 mr-2 bg-opacity-50 inline-block px-2 py-1 rounded-2xl"
                    >
                      <span className="text-black">{tag}</span>
                      <span
                        className=" cursor-pointer bg-white text-lg rounded-full inline-flex text-blue-500 items-center justify-center ml-2 h-5 w-5"
                        onClick={() => removeTag(index)}
                      >
                        &times;
                      </span>
                    </div>
                  ))}
                  <input
                    className=" flex-grow px-2 border-none outline-none "
                    type="text"
                    name=""
                    id=""
                    onKeyDown={(e) => handleKeyDown(e)}
                    placeholder="Search for Topics"
                  />
                  <span className=" inline-block text-white align-center justify-center ml-2pxh-10 w-10">
                    &times;
                  </span>
                </p>
              </div>
              <div className="flex items-center">
                <button
                  className="bg-blue-500 border-2 border-gray-100 text-gray-50 px-4 py-2 mr-6 rounded-lg"
                  onClick={() => {
                    questionSubmit();
                  }}
                >
                  Post your question
                </button>
                {/* <button className="text-red-500">Discard Draft</button> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  ) : null;
}
