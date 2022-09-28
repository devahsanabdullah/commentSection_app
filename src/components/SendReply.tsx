import { type } from '@testing-library/user-event/dist/type';
import React, { useState,useEffect } from 'react'
import {replyData} from './SendQuestion'
import {ISend} from './SendQuestion'
import {initial} from '../reducer/Reducer'
import {useDispatch,useSelector} from 'react-redux'
type  prototype= {
    data: string;
    replyId:number;
    setOpenReply:any
  };
  
const SendReply = (props:prototype) => {
  const dispatch =useDispatch();
  const commentView=useSelector((state:initial)=>state.commentView)
  
    function generate() {
        let length = 3;
        const number = "1234567890";
        let result = " ";
        const numberLenght = number.length;
        for (let i = 0; i < length; i++) {
          result += number.charAt(Math.floor(Math.random() * numberLenght));
        }
        return parseInt(result) ;
      }
      const RandomNumber= generate()
    
      const [showdata, setShowData] = useState<ISend[]>([]);
    const [replyComment,setReplyComment]=useState<replyData>({
        id:0,
        userName:"",
        comment:"",
        like:[],
        date: new Date,

    });

    useEffect(() => {
      
        // const data = JSON.parse(`${localStorage.getItem("sendQuestion")}`);
         setShowData(commentView)
      
    }, [])
    

    function handleSend()
    {
       
        const value = showdata.find((data)=>data.id===props.replyId)
        const valfilter:any =value?.reply.map((data)=>data)
        const newvalues = showdata.map((data)=>{
            if(data.id===props.replyId)
            {
                data.reply=[...valfilter,replyComment]

            }
            return data
        })
        // localStorage.setItem("sendQuestion", JSON.stringify(newvalues));
        dispatch({type:"VIEW_COMMENT",payload:{commentView:newvalues}})
        props.setOpenReply(false)
    }
  
  return (
   <>
   <div className='flex justify-center '>
        <div className='shadow-lg w-[800px] bg-white  mt-7 rounded-xl'>

            <div className=' flex flex-col-reverse md:flex-row justify-between'>
                <div>
                  <div className='flex justify-between'>
                    <img src='/images/ahsan.png' className='w-20 ml-5 h-20 rounded-lg p-3'/>
                    <button className='m-6 lg:hidden md:hidden block bg-[#5457b6] text-white p-3 w-24 text-xl font-bold rounded-xl hover:bg-[#b0b2ec]' onClick={()=>handleSend()}>Send</button>
                    </div>
                </div>
                <div>
                  <textarea  placeholder='Add commment' defaultValue={`@ ${props.data}`} onChange={(e)=>setReplyComment({id:RandomNumber,userName:props.data,comment:e.target.value,like:[],date:new Date})}  className=" w-[90%] md:w-[450px] h-[100px] resize-none m-6 p-3 font-bold text-base rounded-md  border-[#dfe3fa] border-solid border-2 focus:outline-none focus:border-[#7C5DFA]"/>
                </div>
                <div>
                    <button className='m-6 md:block hidden bg-[#5457b6] text-white p-3 w-24 text-xl font-bold rounded-xl hover:bg-[#b0b2ec]' onClick={()=>handleSend()}>Send</button>
                </div>
            </div>
        </div>
        </div>
   </>
  )
}

export default SendReply