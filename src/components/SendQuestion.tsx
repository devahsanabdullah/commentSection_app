import { type } from 'os'
import React,{useEffect, useState}from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { textSpanContainsTextSpan } from 'typescript'
import {initial} from '../reducer/Reducer'
  export interface replyData{
  id:number,
  userName:string,
  comment:string,
  like:string[],
  date: Date,

 }
 export interface ISend{
    id:number,
    userName:string,
    comment:string,
    like:string[],
    date:Date
    reply:replyData[]

}

type propstype={
    data:string
}

const SendQuestion = (props:propstype) => {
  const [change, setChange] = useState<boolean>(false);

  const changeable = useSelector((state:initial) => state.changeData)
const dispatch =useDispatch();
 const commentView=useSelector((state:initial)=>state.commentView)
  const [showdata, setShowData] = useState<ISend[]>([]);
  
  const [sendComment,setSendComment]=useState<ISend>({
    id:0,
    userName:"",
    comment:"",
   like:[],
    date:new Date(),
    reply:[]
  });
 
  useEffect(() => {
    
    setShowData(commentView);
  }, [changeable]);

  function handleSend (){

    // const data = JSON.parse(`${localStorage.getItem('sendQuestion')}`);
   
   
    // if (data == null) {
    //   localStorage.setItem("sendQuestion", JSON.stringify([sendComment]));

    // } else {
    //   localStorage.setItem("sendQuestion", JSON.stringify([...data, sendComment]));
   
    // }   
   
    dispatch({type:"REFRESH_DATA",payload:{changeData:!changeable}})
  
       dispatch({type:"VIEW_COMMENT",payload:{commentView:[...showdata,sendComment]}})
    //  setChange(!change);
  
  }
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


  function setState(e:React.ChangeEvent<HTMLTextAreaElement>)
  {
    setSendComment({comment:e.target.value,id:RandomNumber,userName:props.data,like:[],date:new Date(),reply:[]})
  }
function cleardata()
{
  setSendComment({
    id:0,
    userName:"",
    comment:"",
   like:[],
    date:new Date(),
    reply:[]
  })
}
  return (
<>
<div className='flex justify-center '>
        <div className='shadow-lg w-[800px] bg-white  mt-7 rounded-xl'>

            <div className=' flex flex-col-reverse md:flex-row justify-between'>
                <div>
                  <div className='flex justify-between'>
                    <img src='/images/img1 (1).png' className='w-20 ml-5 h-20 rounded-lg p-3'/>
                  
                    <button className='m-6 lg:hidden md:hidden block bg-[#5457b6] text-white p-3 w-24 text-xl font-bold rounded-xl hover:bg-[#b0b2ec]'>Send</button>
                    </div>
                </div>
                <div>
                 
                  <textarea  placeholder='Add commment'  onChange={setState} value={sendComment.comment} id='comment' className=" w-[90%] md:w-[450px] h-[100px] resize-none m-6 p-3 font-bold text-base rounded-md  border-[#dfe3fa] border-solid border-2 focus:outline-none focus:border-[#7C5DFA]"/>
                </div>
                <div>
                    <button className='m-6 md:block hidden bg-[#5457b6] text-white p-3 w-24 text-xl font-bold rounded-xl hover:bg-[#b0b2ec] cursor-pointer' onClick={() => {handleSend();cleardata()}}>Send</button>
                </div>
            </div>
        </div>
        </div>
</>
  )
}

export default SendQuestion