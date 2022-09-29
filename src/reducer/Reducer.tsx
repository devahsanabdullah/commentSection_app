
import { ISend } from "../components/SendQuestion";
 export interface initial {
    commentView:ISend[]
    changeData:boolean
}
const initialState:initial= {
   
    commentView:[],
    changeData:false
        
  }
  
  const DataFilter = (state:any = initialState, action:any) => {
    switch(action.type){
   
        // case "VIEW_COMMENT":
        //     return {
        //         ...state,

        //         commentView:action.payload.commentView
            
        //     }
               case "REFRESH_DATA":
            return {
                ...state,

                changeData:action.payload.changeData
            
            }
        default:
            return state
    }
 }
 export default DataFilter;