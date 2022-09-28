
import { ISend } from "../components/SendQuestion";
interface initial {
    commentView:ISend[]
}
const initialState:initial= {
   
    commentView:[]
        
  }
  
  const DataFilter = (state = initialState, action:any) => {
    switch(action.type){
   
        case "VIEW_COMMENT":
            return {
                ...state,

                commentView:[...state.commentView,action.payload.commentView]
                
               
            
            }
               
        default:
            return state
    }
 }
 export default DataFilter;