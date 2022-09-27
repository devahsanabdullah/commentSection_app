import React, { useState, useEffect } from "react";
import { FaReply } from "react-icons/fa";
import { AiFillCaretDown } from "react-icons/ai";
import { AiFillCaretUp } from "react-icons/ai";
import { ISend } from "./SendQuestion";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import moment from "moment/moment";
import SendReply from "./SendReply";
import { Dispatch, SetStateAction } from "react";

type propstype = {
  data: string;
};
const ShowQuestion = (props: propstype) => {
  const [showdata, setShowData] = useState<ISend[]>([]);
  const [userData, setUserData] = useState<string>("");
  const [editOPen, setEditOpen] = useState<boolean>(false);
  const [editid, setEditId] = useState<number>();
  const [editData, setEditData] = useState<string>("");
  const [replyOpen,setOpenReply]=useState(false);
  const [change,setChange]=useState<boolean>(false);
  const [replyID,setReplyId]=useState<number>()

  useEffect(() => {
    const data = JSON.parse(`${localStorage.getItem("sendQuestion")}`);
    const user = JSON.parse(`${localStorage.getItem("userName")}`);
    setUserData(user);
    setShowData(data);
  }, [change]);

  function likeHandle(id: number) {
    const newfilter: any = showdata.find((obj) => obj.id === id);
    const newnewFilter: any = newfilter?.like.filter(
      (obj: any) => obj === props.data
    );
   
    if (newnewFilter?.length !== 0) {
      console.log(newfilter.like); // User Liked
    } else {
      console.log("Not Liked");
      const valuess = showdata.map((value) => {
        if (value.id == id) {
          value.like = [...newfilter.like, props.data];
          setChange(!change)
        }
        return value;
      });
      localStorage.setItem("sendQuestion", JSON.stringify(valuess));
    }
  }
  function dislikeHandle(id: number) {
    const newfilter: any = showdata.find((obj) => obj.id === id);

    const newnewFilter: any = newfilter?.like.filter(
      (obj: any) => obj !== props.data
    );

    const valuess = showdata.map((value) => {
      if (value.id == id) {
        value.like = newnewFilter;
        setChange(!change)

      }
      return value;
    });

    localStorage.setItem("sendQuestion", JSON.stringify(valuess));
  }
  function handleRemove(id: number) {
    const values = showdata.filter((data) => data.id !== id);
    localStorage.setItem("sendQuestion", JSON.stringify(values));
    setChange(!change)

  }

  function handleEdit(id: number) {
    setEditOpen(true);
    setEditId(id);
    setChange(!change)

  }
  function handleUpdate(id: number) {
    const val = showdata.map((data) => {
      if (data.id === id) {
        data.comment = editData;
        setChange(!change)

      }
      return data;
    });
    localStorage.setItem("sendQuestion", JSON.stringify(val));
    setEditOpen(false);
  }
function handleReply(id:number)
{
    setReplyId(id);
    setOpenReply(true)
    
}
  return (
    <>
      {showdata &&
        showdata.map((data, index) => {
          return (
            <>
            <div className="flex justify-center ">
              <div className="shadow-lg w-[800px] bg-white  p-5 mt-7 rounded-xl">
                <div className="flex flex-col-reverse md:flex-row ">
                  <div>
                    <div className="flex justify-between  ">
                      <div className="shadow-lg bg-gray-100  p-2 flex  w-20 items-center  md:flex-col md:w-9 md:m-3 md:p-3 rounded-xl">
                        <h1
                          className="font-bold text-2xl text-gray-500 hover:text-[#5457b6] cursor-pointer"
                          onClick={() => likeHandle(data.id)}
                        >
                          <AiFillCaretUp />
                        </h1>

                        <h1 className=" font-bold text-[#5457b6]">
                          {data.like.length}
                        </h1>
                        <h1
                          className="font-bold text-2xl  text-gray-500 hover:text-[#5457b6] cursor-pointer"
                          onClick={() => dislikeHandle(data.id)}
                        >
                          <AiFillCaretDown />
                        </h1>
                      </div>
                      {data.userName === props.data ? (
                        <div className="lg:hidden md:hidden block">
                          <div className="flex justify-center items-center">
                            <MdDelete className="text-xl font-bold ml-1 text-red-500  " />
                            <h1
                              className="text-xl font-bold ml-1 text-red-500  cursor-pointer"
                              onClick={() => handleRemove(data.id)}
                            >
                              Delete
                            </h1>

                            <div className="flex cursor-pointer justify-center ">
                              <MdEdit className="text-xl font-bold ml-2 text-[#5457b6]  " />
                              <h1 className="text-xl font-bold ml-1 text-[#5457b6] cursor-pointer hover:text-[#b7b9eb]">
                                Edit
                              </h1>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="lg:hidden md:hidden block">
                          <div className="flex justify-center items-center cursor-pointer" onClick={()=>handleReply(data.id)}>
                            <FaReply className="text-[#5457b6] " />
                            <h1 className="text-xl font-bold ml-1 text-[#5457b6]  ">
                              Reply
                            </h1>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-col">
                      <div className="flex justify-between">
                        <div className="flex">
                          <img
                            src="/images/ahsan.png"
                            className="w-8 h-8  rounded-lg"
                          />
                          <h1 className="text-lg font-bold pl-3 ">
                            {data.userName}
                          </h1>

                          {data.userName === props.data ? (
                            <h1 className="text-lg font-bold ml-2 p-1 bg-[#5457b6] text-white ">
                              You
                            </h1>
                          ) : null}

                          <p className="text-lg text-gray-500 pl-3 ">
                            {moment(data.date).fromNow()}
                          </p>
                        </div>
                        {data.userName === props.data ? (
                          <div className=" md:block hidden text-end">
                            <div className="flex justify-center items-center">
                              <MdDelete className="text-xl font-bold ml-1 text-red-500  " />
                              <h1
                                className="text-xl font-bold ml-1 text-red-500  cursor-pointer"
                                onClick={() => handleRemove(data.id)}
                              >
                                Delete
                              </h1>

                              <div className="flex cursor-pointer justify-center ">
                                <MdEdit className="text-xl font-bold ml-2 text-[#5457b6]  " />
                                <h1
                                  className="text-xl font-bold ml-1 text-[#5457b6] cursor-pointer hover:text-[#b7b9eb]"
                                  onClick={() => handleEdit(data.id)}
                                >
                                  Edit
                                </h1>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className=" md:block hidden text-end">
                            <div className="flex justify-center items-center cursor-pointer" onClick={()=>handleReply(data.id)}>
                              <FaReply className="text-[#5457b6] " />
                              <h1 className="text-xl font-bold ml-1 text-[#5457b6] cursor-pointer">
                                Reply
                              </h1>
                            </div>
                          </div>
                        )}
                      </div>
                      <div>
                        {data.id === editid && editOPen ? (
                          <div>
                            <textarea
                              placeholder="Add commment"
                              defaultValue={data.comment}
                              onChange={(e) => setEditData(e.target.value)}
                              className=" w-[90%] md:w-[450px] h-[100px] resize-none m-6 p-3 font-bold text-base rounded-md  border-[#dfe3fa] border-solid border-2 focus:outline-none focus:border-[#7C5DFA]"
                            />
                            <button
                              className="  bg-[#5457b6] text-white p-3 w-24 text-xl font-bold rounded-xl hover:bg-[#b0b2ec] cursor-pointer"
                              onClick={() => handleUpdate(data.id)}
                            >
                              Update
                            </button>
                          </div>
                        ) : (
                          <p className="p-3 text-lg text-gray-500 font-medium">
                            {data.comment}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {data.id===replyID&&replyOpen?<SendReply  data={props.data} replyId={data.id} setOpenReply={setOpenReply}/>:null}
            </>
          );
        })}
    </>
  );
};

export default ShowQuestion;