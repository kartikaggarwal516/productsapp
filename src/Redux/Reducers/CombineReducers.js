import { combineReducers } from "redux"
import products from "./ProductReducer"
import fproducts from "./FiterReducer"

export default combineReducers({
    products: products,
    fproducts: fproducts
})