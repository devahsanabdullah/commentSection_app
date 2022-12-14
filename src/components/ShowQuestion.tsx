import React, { useState, useEffect } from "react";
import { FaReply } from "react-icons/fa";
import { AiFillCaretDown } from "react-icons/ai";
import { AiFillCaretUp } from "react-icons/ai";
import { ISend } from "./SendQuestion";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import moment from "moment/moment";
import SendReply from "./SendReply";
import {initial} from '../reducer/Reducer'
import {useDispatch,useSelector} from 'react-redux'
// import { replyData } from "./SendQuestion";

type propstype = {
  data: string;
};
const ShowQuestion = (props: propstype) => {
   const commentView=useSelector((state:initial)=>state.commentView)
  const changeable = useSelector((state:initial) => state.changeData)
  const [showdata, setShowData] = useState<ISend[]>([]);
  const [userData, setUserData] = useState<string>("");
  const [editOPen, setEditOpen] = useState<boolean>(changeable);
  const [editid, setEditId] = useState<number>();
  const [editData, setEditData] = useState<string>("");
  const [replyOpen, setOpenReply] = useState(false);
  const [change, setChange] = useState<boolean>(false);
  const [replyID, setReplyId] = useState<number>();
  const [editReplyOPen, setEditReplyOpen] = useState<boolean>(false);
  const [editReplyid, setEditReplyId] = useState<number>();
  const [editReplyData, setEditReplyData] = useState<string>("");
  const dispatch =useDispatch();


  useEffect(() => {
    // const data = JSON.parse(`${localStorage.getItem("sendQuestion")}`);
    // const user = JSON.parse(`${localStorage.getItem("userName")}`);
    let data=JSON.parse(JSON.stringify(commentView))
    // setUserData(user);
    setShowData(data);
  }, [changeable]);

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
          dispatch({type:"REFRESH_DATA",payload:{changeData:!changeable}})
          // setChange(!change);
        }
        return value;
      });
      // localStorage.setItem("sendQuestion", JSON.stringify(valuess));
       dispatch({type:"VIEW_COMMENT",payload:{commentView:valuess}})
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
        dispatch({type:"REFRESH_DATA",payload:{changeData:!changeable}})
        // setChange(!change);
      }
      return value;
    });

    // localStorage.setItem("sendQuestion", JSON.stringify(valuess));
     dispatch({type:"VIEW_COMMENT",payload:{commentView:valuess}})
  }
  function handleRemove(id: number) {
    const values = showdata.filter((data) => data.id !== id);
    dispatch({type:"REFRESH_DATA",payload:{changeData:!changeable}})

    // localStorage.setItem("sendQuestion", JSON.stringify(values));
    dispatch({type:"VIEW_COMMENT",payload:{commentView:values}})
    // setChange(!change);
  }

  function handleEdit(id: number) {
    setEditOpen(true);
    setEditId(id);
    dispatch({type:"REFRESH_DATA",payload:{changeData:!changeable}})
    // setChange(!change);
  }
  function handleUpdate(id: number) {
    const val = showdata.map((data) => {
      if (data.id === id) {
        data.comment = editData;
        dispatch({type:"REFRESH_DATA",payload:{changeData:!changeable}})
        // setChange(!change);
      }
      return data;
    });
    // localStorage.setItem("sendQuestion", JSON.stringify(val));
     dispatch({type:"VIEW_COMMENT",payload:{commentView:val}})
    setEditOpen(false);
  }
  function handleReply(id: number) {
    setReplyId(id);
    setOpenReply(true);
  }
  function handleRemoveReply(replyid: number, dataId: number) {

    
   
  
    // const val:any = showdata.filter((data) => {
      
    //   return data.id === dataId
    // })
  
    // const filterReply = val.map((data: ISend) => {
    //   return data.reply.filter((data) => data.id !== replyid);
    // });
    // console.log("???? ~ file: ShowQuestion.tsx ~ line 128 ~ filterReply ~ filterReply", filterReply)
   
    // const value = showdata.map((data) => {
    //   if (data.id === dataId) {
    //     // console.log("asa",data.reply)
    //     // data.reply = filterReply!==0?[]:filterReply;
    //     const val=data.reply.filter((data)=>data.id!==replyid)
    //     return val;
       
    //   }
    //   return data
    // });
    // console.log("???? ~ file: ShowQuestion.tsx ~ line 136 ~ value ~ value", value)
   
    //  dispatch({type:"REFRESH_DATA",payload:{changeData:!changeable}})

    // localStorage.setItem("sendQuestion", JSON.stringify(value));
    // dispatch({type:"VIEW_COMMENT",payload:{commentView:value}})
    // setChange(!change);


    console.log(replyid)

    const val=showdata.map((obj)=>{
      if(obj.id===dataId)
      {
        obj.reply=obj.reply.filter((f)=>(f.id!==replyid))
        console.log(obj.reply)
      }
      return obj;
    })
    let data=JSON.parse(JSON.stringify(val))
    dispatch({type:"VIEW_COMMENT",payload:{commentView:data}})
     dispatch({type:"REFRESH_DATA",payload:{changeData:!changeable}})

  }
  function handleEditReply(replyid: number, dataId: number) {
    setEditReplyId(replyid);
    setEditReplyOpen(true);
  }
  function handleEditReplyUpdate(replyid: number, dataId: number) {
    console.log("???? ~ file: ShowQuestion.tsx ~ line 145 ~ value ~ howdata", showdata)
    const value = showdata.map((data) => {

      if (data.id === dataId) {
        data.reply.map((data) => {
          if (data.id === replyid) {
            data.comment = editReplyData;
            dispatch({type:"REFRESH_DATA",payload:{changeData:!changeable}})
            // setChange(!change);
          }
          return data;
        });
      }
      return data;
    });

    // localStorage.setItem("sendQuestion", JSON.stringify(value));
    dispatch({type:"VIEW_COMMENT",payload:{commentView:value}})
    // setChange(!change);
    setEditReplyOpen(false);
  }
  function handleLikeReply(replyid: number, dataId: number)
  {
    const newfilter = showdata.find((obj) => obj.id === dataId);
        const AccessReply:any= newfilter?.reply.find((data)=>data.id===replyid)
       
        
    const newnewFilter: any = AccessReply?.like.filter(
      (obj: any) => obj === props.data
    );

    if (newnewFilter?.length !== 0) {
      console.log(newfilter?.like); 
    } else {
      console.log("Not Liked");
      const valuess:any = showdata.map((value) => {
        if (value.id == dataId) {

            value.reply.map((data)=>{
                if(data.id===replyid)
                {
                    data.like = [...AccessReply?.like, props.data];
                    dispatch({type:"REFRESH_DATA",payload:{changeData:!changeable}})
                    // setChange(!change);
                }
                return data;
            })
            
           

            }
            return value;
        });

            // localStorage.setItem("sendQuestion", JSON.stringify(valuess));
             dispatch({type:"VIEW_COMMENT",payload:{commentView:valuess}})

        }
        
  }
      
    

  
  function handleDislikeReply(replyid: number, dataId: number)
  {
    
    const newfilter = showdata.find((obj) => obj.id === dataId);
        const AccessReply:any= newfilter?.reply.find((data)=>data.id===replyid)
       
        
    const newnewFilter: any = AccessReply?.like.filter(
      (obj: any) => obj !== props.data
    );
    

    
    const valuess:any = showdata.map((value) => {
        if (value.id == dataId) {

            value.reply.map((data)=>{
                if(data.id===replyid)
                {
                    data.like = newnewFilter;
                }
                return data;
            })
            // setChange(!change);
            dispatch({type:"REFRESH_DATA",payload:{changeData:!changeable}})

            }
            return value;
        });
        //  localStorage.setItem("sendQuestion", JSON.stringify(valuess));
         dispatch({type:"VIEW_COMMENT",payload:{commentView:valuess}})

  }
  return (
    <>
      {showdata &&
        showdata.map((data, index) => {
          return (
            <>
              <div className="flex justify-center ">
                <div className="shadow-lg w-[800px] bg-white  p-5 mt-7 rounded-xl">
                  <div className="flex flex-col-reverse w-full md:flex-row ">
                  <div>
                      <div className=" flex justify-between ">
                        <div className="shadow-lg bg-gray-100  p-2 flex  w-20 items-center  md:flex-col md:w-9 md:m-3 md:p-3 rounded-xl">
                          <h1
                            className="font-bold text-2xl text-gray-500 hover:text-[#5457b6] cursor-pointer"
                            onClick={() => likeHandle(data.id)}
                          >
                            <AiFillCaretUp />
                          </h1>

                          <h1 className=" font-bold text-[#5457b6]">
                          {data.like?.length===undefined||null? 0:data.like.length}
                         
                          </h1>
                          <h1
                            className="font-bold text-2xl  text-gray-500 hover:text-[#5457b6] cursor-pointer"
                            onClick={() => dislikeHandle(data.id)}
                          >
                            <AiFillCaretDown />
                          </h1>
                        </div>
                        {data.userName === props.data ? (
                          <div className=" md:hidden block">
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
                            <div
                              className="flex justify-center items-center cursor-pointer"
                              onClick={() => handleReply(data.id)}
                            >
                              <FaReply className="text-[#5457b6] " />
                              <h1 className="text-xl font-bold ml-1 text-[#5457b6]  ">
                                Reply
                              </h1>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grow">
                      <div className="flex flex-col">
                        <div className="flex justify-between">
                          <div className="flex">
                            <img
                              src="/images/img1 (1).png"
                              className="w-10 h-10  rounded-lg"
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
                              <div
                                className="flex justify-center items-center cursor-pointer"
                                onClick={() => handleReply(data.id)}
                              >
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
              {/* comment reply open */}
              {data.id === replyID && replyOpen?(
                <SendReply
                  data={props.data}
                  replyId={data.id}
                  setOpenReply={setOpenReply}
                />
              ) : null}

<div className='flex justify-center'>
    <div className="flex md:ml-20 divide-gray-300 divide-x-4">
      <div></div>
      <div className='col-span-3 ml-10'>
          {/* Reply data shoe that body  start */}
              {data.reply &&
                data.reply.map((replyData) => {
                  return (
                    <div className="flex justify-center ml-10">
                      <div className="shadow-lg w-[300px] lg:w-[700px] md:w-[650px] bg-white  p-5 mt-7 rounded-xl">
                        <div className="flex flex-col-reverse md:flex-row ">
                          <div>
                            <div className="flex justify-between  ">
                              <div className="shadow-lg bg-gray-100  p-2 flex  w-20 items-center  md:flex-col md:w-9 md:m-3 md:p-3 rounded-xl">
                                <h1 className="font-bold text-2xl text-gray-500 hover:text-[#5457b6] cursor-pointer" onClick={()=>handleLikeReply(replyData.id, data.id)}>
                                  <AiFillCaretUp />
                                </h1>
                                <h1 className=" font-bold text-[#5457b6]">
                                    {replyData.like?.length===undefined||null? 0:replyData.like.length}
                                  
                                </h1>
                                <h1 className="font-bold text-2xl  text-gray-500 hover:text-[#5457b6] cursor-pointer" onClick={()=>handleDislikeReply(replyData.id, data.id)}>
                                  <AiFillCaretDown />
                                </h1>
                              </div>
                              <div className="lg:hidden md:hidden block">
                                <div className="flex justify-center items-center">
                                  <MdDelete className="text-xl font-bold ml-1 text-red-500  " />
                                  <h1
                                    className="text-xl font-bold ml-1 text-red-500 cursor-pointer "
                                    onClick={() =>
                                      handleRemoveReply(replyData.id, data.id)
                                    }
                                  >
                                    Delete
                                  </h1>

                                  <div className="flex cursor-pointer justify-center ">
                                    <MdEdit className="text-xl font-bold ml-2 text-[#5457b6]  " />
                                    <h1
                                      className="text-xl font-bold ml-1 text-[#5457b6] cursor-pointer hover:text-[#b7b9eb]"
                                      onClick={() =>
                                        handleEditReply(replyData.id, data.id)
                                      }
                                    >
                                      Edit
                                    </h1>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="w-full">
                          <div className="grow">
                            <div className="flex flex-col">
                              <div className="flex justify-between">
                                <div className="flex">
                                  <img
                                    src="/images/img1 (2).png"
                                    className="w-10 h-9  rounded-lg"
                                  />
                                  <h1 className="text-lg font-bold pl-3 ">
                                    {replyData.userName}
                                  </h1>
                                  <p className="text-lg text-gray-500 pl-3 ">
                                    {moment(replyData.date).fromNow()}
                                  </p>
                                </div>
                                {replyData.userName===props.data?
                                <div className=" md:block hidden text-end">
                                  <div className="flex justify-center items-center">
                                    <MdDelete className="text-xl font-bold ml-1 text-red-500  " />
                                    <h1
                                      className="text-xl font-bold ml-1 text-red-500  cursor-pointer"
                                      onClick={() =>
                                        handleRemoveReply(replyData.id, data.id)
                                      }
                                    >
                                      Delete
                                    </h1>

                                    <div className="flex cursor-pointer justify-center ">
                                      <MdEdit className="text-xl font-bold ml-2 text-[#5457b6]  " />
                                      <h1
                                        className="text-xl font-bold ml-1 text-[#5457b6] cursor-pointer hover:text-[#b7b9eb]"
                                        onClick={() =>
                                          handleEditReply(replyData.id, data.id)
                                        }
                                      >
                                        Edit
                                      </h1>
                                    </div>
                                  </div>
                                </div>
                                :null}
                              </div>
                              <div>
                                {replyData.id === editReplyid &&
                                editReplyOPen ? (
                                  <div>
                                    <textarea
                                      placeholder="Add commment"
                                      defaultValue={replyData.comment}
                                      onChange={(e) =>
                                        setEditReplyData(e.target.value)
                                      }
                                      className=" w-[90%] md:w-[450px] h-[100px] resize-none m-6 p-3 font-bold text-base rounded-md  border-[#dfe3fa] border-solid border-2 focus:outline-none focus:border-[#7C5DFA]"
                                    />
                                    <button
                                      className="  bg-[#5457b6] text-white p-3 w-24 text-xl font-bold rounded-xl hover:bg-[#b0b2ec] cursor-pointer"
                                      onClick={() =>
                                        handleEditReplyUpdate(
                                          replyData.id,
                                          data.id
                                        )
                                      }
                                    >
                                      Update
                                    </button>
                                  </div>
                                ) : (
                                  <p className="p-3 text-lg text-gray-500 font-medium">
                                    {replyData.comment}
                                  </p>
                                )}
                              </div>
                            </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
               </div>
    </div>
    </div>
          
            </>
          );
        })}
    </>
  );
};

export default ShowQuestion;
