export const PRODUCTS = "PRODUCTS"
export const VIEWPRODUCTS = "VIEWPRODUCTS"

export const getProducts = data => {
    return{
        type: PRODUCTS,
        payload: data
    }
}
export const filterProducts = data => {
    return{
        type: VIEWPRODUCTS,
        payload: data
    }
}