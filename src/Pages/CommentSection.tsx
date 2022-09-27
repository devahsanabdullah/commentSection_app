import React from 'react'
import SendQuestion from '../components/SendQuestion'
import ShowQuestion from '../components/ShowQuestion'
import {useParams} from "react-router-dom"



const CommentSection = () => {
  const {userName}= useParams();

  return (
<>
<ShowQuestion data={userName as string}/>
<SendQuestion data={userName as string} />
</>
  )
}

export default CommentSection