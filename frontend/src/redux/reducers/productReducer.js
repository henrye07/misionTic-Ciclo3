export const types={
    addNewProduct:'add New product',
    deleteProduct:'delete product',
    updateProduct:'edit product',
    showProducts:'show products',
    enableProducts:'Products Enable',
    showErrors:'Error'
}
const initialState={
    products:[],
    productsEnable:[],
    errorMessage:null
}

export const productReducer = (state=initialState,{type,payload}) => {
    switch (type) {
        case types.showProducts:
            return {...state,products:payload}
        case types.enableProducts:
            return {
                ...state,
                productsEnable:payload
            }
        case types.addNewProduct:
            return {...state,products:[...state.products,payload]}
        case types.updateProduct:
            const productID=state.products.find(product=>product.id===payload.id)
            for (const key in payload.product) {
                productID[key]=payload.product[key]
            }
            return {...state,products:state.products.map(product=>
                product.id===productID.id
                ?productID
                :product
            )}
        case types.deleteProduct:
            return {...state,products:state.products.filter(product=>product.id!==payload)}
        case types.showErrors:
            return {...state,errorMessage:payload}
        default:
            return state;
    }
}

