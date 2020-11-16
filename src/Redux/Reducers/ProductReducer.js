import {PRODUCTS} from "../Actions/Actions"

const defaultstate=[]
export default function ProductReducer(state=defaultstate,action){
    switch(action.type){
        case PRODUCTS: {
            state = action.payload
            return state
        }        
        default: return state
    }
}