
import { ISend } from "../components/SendQuestion";
 export interface initial {
    commentView:ISend[]
}
const initialState:initial= {
   
    commentView:[]
        
  }
  
  const DataFilter = (state:any = initialState, action:any) => {
    switch(action.type){
   
        case "VIEW_COMMENT":
            return {
                ...state,

                commentView:action.payload.commentView
                
               
            
            }
               
        default:
            return state
    }
 }
 export default DataFilter;