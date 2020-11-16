import {VIEWPRODUCTS} from "../Actions/Actions"

const defaultstate=[]
export default function FilterReducer(state=defaultstate,action){
    switch(action.type){
        case VIEWPRODUCTS: {
            state = [...action.payload]            
            return state
        }        
        default: return state
    }
}