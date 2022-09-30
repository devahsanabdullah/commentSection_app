
import { ISend } from "../components/SendQuestion";
export interface SingUp{
    firstname:string,
    lastname:string,
    username:string,
    password:string,
    repassword:string
}
 export interface initial {
    commentView:ISend[]
    changeData:boolean
    sinuppage:SingUp[]
}

const initialState:initial= {
   
    commentView:[],
    changeData:false,
    sinuppage:[]
    
        
  }
  
  const DataFilter = (state:any = initialState, action:any) => {
    switch(action.type){
   
        case "VIEW_COMMENT":
            return {
                ...state,

                commentView:action.payload.commentView
            
            }
            case "REPLY_COMMENT":
            return {
                ...state,

                commentView:action.payload.commentView
            
            }
               case "REFRESH_DATA":
            return {
                ...state,

                changeData:action.payload.changeData
            
            }
            case "SINUP_PAGE":
                return {
                    ...state,
    
                    sinuppage:action.payload.sinuppage
                
                }    
        default:
            return state
    }
 }
 export default DataFilter;